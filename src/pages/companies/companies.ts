import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";
import {HttpErrorResponse} from "@angular/common/http";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {

  companies = null;

  constructor( bridge: Bridge ) {
    console.log("Getting company data....");
    bridge.getCompanies().subscribe(
      ( result ) => {
        // Credentials accepted, user has been authenticated
        this.companies = result;
        console.log(this.companies[0]);
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
