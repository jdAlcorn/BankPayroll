import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from "../app/app.config";
import {Events} from "ionic-angular";
import {User} from "../models/user";

interface Company {
  uID: string,
  companyName: string,
  address: string,
  payInterval: string,
  payPeriodStart: string
}

interface Employee {
  uID: string,
  firstName: string,
  lastName: string,
  payType: string,

}


@Injectable()
export class Bridge {

 companies = {}; // The array of companies we fetched from the api will be cached here until it expires
 companyDataLastFetched = 0; // The unix timestamp of when we last fetched data

 employees = {};
 fetchedEmployees = 0;

  constructor( public events: Events, public http: HttpClient ){};

  private getEmployeesFromCompany(id) {
    return this.http.get<Array<Employee>>(AppSettings.API_ENDPOINT + `/companies/${id}/employees`)
           .map(employeeResponse => {
             this.employees = employeeResponse;
             this.fetchedEmployees - Date.now();
             return this.employees
            });
  }

  public getEmployees(id){
    if(this.fetchedEmployees + (AppSettings.CACHE_TTL * 1000) > Date.now())
        return Observable.create(observer => {
          observer.next(this.employees);
          observer.complete();
        });
    else
        return this.getEmployeesFromCompany(id);
  }

  private getCompaniesFromAPI() {
    // Make the Http request and map the response so we can initialize our user object and extract the token
    return this.http.get<Array<Company>>(AppSettings.API_ENDPOINT + "/companies" )
      .map( companyResponse =>  {
        this.companies = companyResponse;
        this.companyDataLastFetched = Date.now(); // Set the timestamp for when this data was fetched
        return this.companies;
      })
  }

  public getCompanies() {
    // Check if we have unexpired data in the cache or if we need to fetch new data from the api instead
    if( this.companyDataLastFetched + (AppSettings.CACHE_TTL * 1000) > Date.now() )
      return Observable.create(observer => {
        observer.next( this.companies );
        observer.complete()
      });
    else
      return this.getCompaniesFromAPI();
  }

}

