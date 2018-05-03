import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";

import {EmployeePage} from "../employee/employee";
import {AuthService} from "../../providers/auth-service";
import * as moment from "moment";

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

getInfo(){
  this.bridge.getCompanies().subscribe (
    (comps) => {
      this.companies = comps;

    }
  );
}
}
