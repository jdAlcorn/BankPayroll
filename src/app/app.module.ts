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

import {AppSettings} from "./app.config";

import {Bridge} from '../providers/bridge';

@NgModule({
  declarations: [
    MyApp,
    AppSettings.login,
    AppSettings.test,
    AppSettings.employee,
    AppSettings.contact,
    AppSettings.profile,
    AppSettings.home
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(AppSettings.login),
    IonicPageModule.forChild(AppSettings.test),
    IonicPageModule.forChild(AppSettings.home),
    IonicPageModule.forChild(AppSettings.about),
    IonicPageModule.forChild(AppSettings.about),
    IonicPageModule.forChild(AppSettings.employee),
    IonicPageModule.forChild(AppSettings.contact)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AppSettings.login,
    AppSettings.test,
    AppSettings.employee,
    AppSettings.contact,
    AppSettings.profile,
    AppSettings.home,
    AppSettings.profile,
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
