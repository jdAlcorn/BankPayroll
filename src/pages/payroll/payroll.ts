import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";
import {Events} from "ionic-angular";
import {HttpErrorResponse} from "@angular/common/http";
import { AlertController } from 'ionic-angular';

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

 employees = null;
 companies = null;
 numComps  = null;
 selected  = false;
 companyID = null;
 clicked = false;

 bridge = null;

private stuff(): void {
  //let company = this.coms;
  this.getEmployees(this.coms);
 }


  constructor(public navCtrl: NavController, public navParams: NavParams, bridge: Bridge) {
   this.bridge = bridge;

 	 console.log("Getting company data....");
    bridge.getCompanies().subscribe(
      (comps) => {
        this.numComps = comps.length;
        this.companies = comps;
          }
        )
    }

    private getEmployees(id){
     this.bridge.getEmployees(id).subscribe(
          ( result ) => {
            // Credentials accepted, user has been authenticated
            this.employees = result;
            console.log(this.employees);
          },
          ( err: HttpErrorResponse ) => {
            if( err.status == 401 ) // Login credentials rejected
              console.log("Access denied");
            else // Some other error
              console.log("An error has occurred: " + err.statusText);
          }
        )
}

}
