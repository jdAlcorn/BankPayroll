import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import 'rxjs/add/operator/catch';
import {HttpErrorResponse} from "@angular/common/http";
import {HomePage} from "../home/home";
import {TestPage} from "../test/test";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private navParams: NavParams) { 
   
  }

  public goTo(pageName) {
    console.log(pageName);
    //this.nav.push(pageName);
   }

  public login() {
    this.showLoading();

    this.auth.login(this.registerCredentials).subscribe(
  ( result ) => {
          // Credentials accepted, user has been authenticated
          this.nav.setRoot(HomePage);
       },
      ( err: HttpErrorResponse ) => {
          if( err.status == 401 ) // Login credentials rejected
            this.showError("Access Denied");
          else // Some other error
            this.showError("An error has occurred: " + err.statusText);
       }
     )
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
