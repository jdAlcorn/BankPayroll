import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";
import {LoginPage} from "../login/login";

import {TestPage} from "../test/test";

import {AppSettings} from "../../app/app.config";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	//All links for every pages nav bars
	employee = AppSettings.employee;

getInfo(){
  console.log(this.bridge.get("/companies"));
}
  constructor(public navCtrl: NavController, public bridge: Bridge) {

  }
}
