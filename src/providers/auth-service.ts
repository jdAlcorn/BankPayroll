import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {User} from '../models/user'
import {Events} from "ionic-angular";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppSettings} from "../app/app.config";



@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public events: Events, private http: HttpClient){};

  public login(credentials) {
    // Make the Http request and map the response so we can initialize our user object and extract the token
    return this.http.post(AppSettings.API_ENDPOINT + "/authentication/login", { email: credentials.email, password: credentials.password } )
      .map( (response: Response) =>  {
        console.log("response");
        if( response.status == 200 ) {
          // Initialize our user and call the login event with their auth token TODO: Actually parse the response and set the users data accordingly
          this.currentUser = new User( 'test@asd.com', 'first', 'last' );
          this.events.publish("user:login", "SOME TOKEN HERE");
          return true;
        } else return false;
      })
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;

      this.events.publish("user:logout");
      observer.next(true);
      observer.complete();
    });
  }
}
