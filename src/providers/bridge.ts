import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from "../app/app.config";

@Injectable()
export class Bridge {
 data: Observable<any>;
 vari = null;
  constructor(public http: HttpClient) {}


get(query){
	let data;
        return new Promise(resolve => {
            this.http.get(AppSettings.API_ENDPOINT + query)
            .subscribe(
                data => {
                    resolve(JSON.parse(data["_body"]));
                },
                error => {
                }
            );
        });
}

/*	new Promise(resolve => {
  this.http.get(AppSettings.API_ENDPOINT + query)
    .subscribe(data => {
      this.vari = JSON.stringify(data);
      resolve(this.vari);
    });
});
    this.http.get(AppSettings.API_ENDPOINT + query).then((res)=> {this.data = res});
	this.data.subscribe(res=> {this.vari = JSON.stringify(res)});
	return this.vari;
    	//subscribe(data => JSON.stringify(data)));
   // alert(this.res);*/
  }


