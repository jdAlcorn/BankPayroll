import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";
import {HttpErrorResponse} from "@angular/common/http";

/**
 * Generated class for the EmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {

  employees = null;
  bridge = null;
  companies = null;
  numComps  = null;
  currentCompany = null;

  selectedCompany = null;

  private updateCompany(): void {
    // Reset the previous company data variables
    this.currentCompany = null;
    this.employees = null;

    // Fetch data for the new company
    this.getCompany(this.selectedCompany);
    this.getEmployees(this.selectedCompany);
   }

  constructor(public navCtrl: NavController, public navParams: NavParams, bridge: Bridge) {
    this.bridge = bridge;
      bridge.getCompanies().subscribe (
        (comps) => {
          this.numComps = comps.length;
          this.companies = comps;
        }
      )
}
    
private getCompany(companyId){
      this.bridge.getCompanies().subscribe(
        result => {
          for( let company of result ){
            if( company.uID == companyId ){
              this.currentCompany = company;
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
  ionViewDidLoad() {

  }

}
