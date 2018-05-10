import { AuthService } from '../providers/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {PayrollPage} from "../pages/payroll/payroll";
import {EmployeePage} from "../pages/employee/employee";
import {ContactPage} from "../pages/contact/contact";
import {CompaniesPage} from "../pages/companies/companies";

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Http, HttpModule} from "@angular/http";
import {NavController} from "ionic-angular";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../providers/http-service';

import { MyApp } from './app.component';

import {AppSettings} from "./app.config";

import {Bridge} from '../providers/bridge';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    PayrollPage,
    EmployeePage,
    ContactPage,
    CompaniesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(LoginPage),
    IonicPageModule.forChild(HomePage),
    IonicPageModule.forChild(PayrollPage),
    IonicPageModule.forChild(EmployeePage),
    IonicPageModule.forChild(ContactPage),
    IonicPageModule.forChild(CompaniesPage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    PayrollPage,
    EmployeePage,
    ContactPage,
    CompaniesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    AuthService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Bridge
  ]
})
export class AppModule {}
