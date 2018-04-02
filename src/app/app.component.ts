import { Component } from '@angular/core';
import {Events, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {LoginPage} from "../pages/login/login";
import {TestPage} from "../pages/test/test";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage; // Always start at the login page

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      this.loginEvents( events )

    });
  }

  loginEvents( events: Events ) {

    events.subscribe('user:logout', () => {
      this.rootPage = LoginPage;
    });

    events.subscribe('user:login', (token) => {
      localStorage.setItem('token', token);
    });
  }

}

