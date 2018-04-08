import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";

import {EmployeePage} from "../employee/employee";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	//All links for every pages nav bars
	employee = EmployeePage;

  constructor(public navCtrl: NavController, public bridge: Bridge) {

  }
  ionViewDidLoad(){
	this.getInfo();
}

getInfo(){
	this.bridge.getCompanies();
 	console.log(this.bridge.companies);
 	//console.log(this.bridge);
 // alert("Why no work");
}
}
