import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";

import {EmployeePage} from "../employee/employee";
import {AuthService} from "../../providers/auth-service";
import * as moment from "moment";
import {PayrollPage} from "../payroll/payroll";
import {ContactPage} from "../contact/contact";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	//All links for every pages nav bars
	employee = EmployeePage;
  currentUser = null;
  companies = null;
  payrollDue = [];

  constructor(public navCtrl: NavController, public bridge: Bridge, authService: AuthService) {
    this.currentUser = authService.currentUser;
  }
  ionViewDidLoad(){
	this.getInfo();
}

  public goEmployeePage(){ this.navCtrl.setRoot(EmployeePage); }
  public goContact(){ this.navCtrl.setRoot(ContactPage)}
  public goPayroll(){ this.navCtrl.setRoot(PayrollPage); }

getInfo(){
  this.bridge.getCompanies().subscribe (
    (comps) => {
      this.companies = comps;

    }
  );
}
}
