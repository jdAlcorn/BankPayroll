import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Bridge, PayrollEntry, PayrollHistory} from "../../providers/bridge";
import {Events} from "ionic-angular";
import {HttpErrorResponse} from "@angular/common/http";
import { AlertController } from 'ionic-angular';

import * as moment from "moment";
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payroll',
  templateUrl: 'payroll.html',
})


export class PayrollPage {

  // Instance of the currently selected companies data

  companies = null;
  numComps  = null;

  selectedCompany = null;

  currentCompany = null;
  employees = null;
  payrollHistory: Array<PayrollHistory>;
  lastPayStart = null;

  submitted = false;

  // Model for current payroll data entered into the form
  payrollData = {};

  bridge = null;
  alertCtrl = null;

  private updateCompany(): void {
    // Reset the previous company data variables
    this.currentCompany = null;
    this.employees = null;
    this.lastPayStart = null;
    this.submitted=false;
    this.payrollHistory = null;
    this.submitted = false;
    this.payrollData = {};

    // Fetch data for the new company
    this.getCompany( this.selectedCompany );
    this.getEmployees(this.selectedCompany);
   }

private confirmSubmit() {
  let alert = this.alertCtrl.create({
    title: 'Payroll Submitted!',
    subTitle: 'You have successfully submitted payroll for ' + this.currentCompany.companyName,
    buttons: ['Okay']
  });
  alert.present();
}

   private getLastPayrollSubmission(){
     let ccID = this.currentCompany.uID;
     let lastpaystart = this.lastPayStart.format("MM/DD/YYYY");

     if( this.payrollHistory != null ) {
       for (let history of this.payrollHistory) {
         if (ccID == history.companyId && lastpaystart == history.payPeriodStart) {
           this.flattenPayroll(history.payroll);
           this.submitted = true;
           break;
         }
       }
     }
   }

   private flattenPayroll(payrollData){
     let payroll = {};
     for(let entry of payrollData){
       let id = entry.employeeId;
       let hours = entry.hours;
       payroll[id] = hours;
     }
     this.payrollData = payroll;
   }


   private getLastPayPeriod(){

     let currentStart = moment(this.currentCompany.payPeriodStart, "MM/DD/YYYY");

     let lastStart  = null;
     let payType = this.currentCompany.payInterval;


     if(payType == "WEEKLY"){
         lastStart = currentStart.subtract(7, 'days');
     } else if(payType == "BIWEEKLY"){
         lastStart = currentStart.subtract(14, 'days');
     } else if(payType == "BIMONTHLY"){
         let dayStart = currentStart.format('D');
         //16 - 15
         if(dayStart == '16') lastStart = currentStart.subtract(15, 'days');
         //1 -> 16

         if(dayStart == '1') lastStart = currentStart.subtract(1, 'month').add(15, 'days');
     }

     return lastStart;
   }


  constructor(public navCtrl: NavController, public navParams: NavParams, bridge: Bridge, alertCtrl: AlertController) {
    this.bridge = bridge;
    this.alertCtrl = alertCtrl;
      bridge.getCompanies().subscribe (
        (comps) => {
          this.numComps = comps.length;
          this.companies = comps;
        }
      )
    }

    private getPayrollHistory(companyId){
      this.bridge.getCompanyPayrollHistory(companyId).subscribe (
         result => {
           this.payrollHistory = result;
           this.lastPayStart = this.getLastPayPeriod();
           this.getLastPayrollSubmission();

         },
        ( err: HttpErrorResponse ) => {
          if( err.status == 401 ) // Login credentials rejected
            console.log("Access denied");
          else // Some other error
            console.log("An error has occurred: " + err.statusText);
        }
      )
    }

    private getCompany(companyId){
      this.bridge.getCompanies().subscribe(
        result => {
          for( let company of result ){
            if( company.uID == companyId ){
              this.currentCompany = company;
              this.getPayrollHistory(companyId);
              break;
            }
          }
        },
        ( err: HttpErrorResponse ) => {
          if( err.status == 401 ) // Login credentials rejected
            console.log("Access denied");
          else // Some other error
            console.log("An error has occurred: " + err.statusText);
        }
      )
    }

    private getEmployees(companyId) {
      this.bridge.getEmployees(companyId).subscribe(
        (result) => {
          // Credentials accepted, user has been authenticated
          this.employees = result;
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) // Login credentials rejected
            console.log("Access denied");
          else // Some other error
            console.log("An error has occurred: " + err.statusText);
        }
      )
    }


    public submitPayroll(){
      let payroll = [];
      for( let employeeId in this.payrollData ){
        let hours = this.payrollData[employeeId];
        if( hours > 300 || hours == null || hours < 0){
          alert("Invalid submission. Please enter 0 if an employee worked no hours and verify the number of hours entered for each employee.")
          return;
        }

        payroll.push( {
          employeeId: employeeId,
          hours: hours
        })
      }

      this.submitPayrollToAPI( this.selectedCompany, this.lastPayStart.format("MM/DD/YYYY"), payroll);
    }



    private submitPayrollToAPI( companyId: string , payrollStart: string, payroll: Array<PayrollEntry> ){
      this.bridge.submitCompanyPayroll(payrollStart, companyId, payroll).subscribe(
        result => {
          this.confirmSubmit();
          this.navCtrl.setRoot(HomePage);
        },
        ( err: HttpErrorResponse ) => {
          if( err.status == 401 ) // Login credentials rejected
            console.log("Access denied");
          else if( err.status == 200 ){
            this.confirmSubmit();
            this.navCtrl.setRoot(HomePage);
          }
          else if( err.status == 410 ){
            alert("The deadline for updating this payroll period has passed. If you need to make changes please contact us.")
          }
          else // Some other error
            console.log("An error has occurred: " + err.message);
        }
      )
    }


}
