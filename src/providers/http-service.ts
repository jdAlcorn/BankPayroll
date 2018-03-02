import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Events} from "ionic-angular";
import {AppSettings} from "../app/app.config";


/**
 * Our token injector that adds our auth token to all outgoing http requets
 */

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only inject the auth token if we have one. Before the user logs in we won't necessarily have one
    const token = this.getToken();

    if( token != null  ) {
      request = request.clone({
        setHeaders: {
          [AppSettings.AUTH_TOKEN_HEADER] : token
        }
      });
    }

    return next.handle(request);
  }
}


/**
 * Our interceptor that looks for 401 Unauthorized responses to detect when the user becomes unauthenticated so
 * we can direct them back to the login page
 */
export class LogoutInterceptor implements HttpInterceptor {
  constructor( public events: Events) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          localStorage.removeItem("token");
          this.events.publish('user:logout');
        }
      }
    });
  }
}
