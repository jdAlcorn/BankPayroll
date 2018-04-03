import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from "../app/app.config";
 
@Injectable()
export class Bridge {
 films: Observable<any>;
  constructor(public http: HttpClient) { }
 
  get(query) {
    this.films = this.http.get(AppSettings.API_ENDPOINT + query);
    this.films
    .subscribe(data => {
      console.log('my data: ', data);
    })
  }
}

