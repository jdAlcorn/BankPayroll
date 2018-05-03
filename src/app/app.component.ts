import {Component, ViewChild} from '@angular/core';
import {Events, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as moment from 'moment';

import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {EmployeePage} from "../pages/employee/employee";
import {AboutPage} from "../pages/about/about";
import {CompaniesPage} from "../pages/companies/companies";
import {ContactPage} from "../pages/contact/contact";
import {PayrollPage} from "../pages/payroll/payroll";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage; // Always start at the login page
  @ViewChild(Nav) nav;

  // Functions for page navigation
  public goHome() { this.nav.setRoot(HomePage); }
  public goEmployeePage(){ this.nav.setRoot(EmployeePage); }
  public goContact(){ this.nav.setRoot(ContactPage)}
  public goPayroll(){ this.nav.setRoot(PayrollPage); }
  public goLogout(){ this.events.publish('user:logout'); }

  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.events = events;
      this.loginEvents( events )

    });
  }

  loginEvents( events: Events ) {

    events.subscribe('user:logout', () => {
      localStorage.removeItem("token");
      this.nav.setRoot(LoginPage);
    });

    events.subscribe('user:login', (token) => {
      localStorage.setItem('token', token);
    });
  }

}

