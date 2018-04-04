import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Bridge} from "../../providers/bridge";
import {Events} from "ionic-angular";

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})

export class TestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public bridge: Bridge) {
  	
  }



  ionViewDidLoad() {

   }
}
