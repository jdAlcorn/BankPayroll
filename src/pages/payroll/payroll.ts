import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";
import {Events} from "ionic-angular";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, bridge: Bridge) {

 	 console.log("Getting company data....");
    bridge.getEmployees("867b3c73-a762-4587-a5c4-84007b6b481e").subscribe(
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
