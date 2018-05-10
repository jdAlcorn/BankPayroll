import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {Bridge} from "../../providers/bridge";

import {AuthService} from "../../providers/auth-service";

import  {MyApp} from "../../app/app.component";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	//All links for every pages nav bars
  currentUser = null;
  companies = null;
  payrollDue = [];
  app = null;

  constructor(public navCtrl: NavController, public bridge: Bridge, authService: AuthService, app: MyApp) {
    this.currentUser = authService.currentUser;
    this.app = app;
  }

  ionViewDidLoad(){
	  this.getInfo();
  }

  public goEmployeePage(){ this.app.goEmployeePage() }
  public goContact(){ this.app.goContact()}
  public goPayroll(){ this.app.goPayroll() }

getInfo(){
  this.bridge.getCompanies().subscribe (
    (comps) => {
      this.companies = comps;

    }
  );
}
}
