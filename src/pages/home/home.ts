import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

getInfo(){
  this.bridge.get("/companies");
}
  constructor(public navCtrl: NavController, public bridge: Bridge) {

  }

}
