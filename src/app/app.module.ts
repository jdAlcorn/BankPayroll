import { AuthService } from '../providers/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Http, HttpModule} from "@angular/http";
import {NavController} from "ionic-angular";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../providers/http-service';

import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {TestPage} from "../pages/test/test";
import {Bridge} from '../providers/bridge';
//import {Tabs} from "../providers/tabs";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TestPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(LoginPage),
    IonicPageModule.forChild(TestPage),
    IonicPageModule.forChild(HomePage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    LoginPage
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
    //Tabs
  ]
})
export class AppModule {}
