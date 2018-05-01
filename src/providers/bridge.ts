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
  payRate: number
}

export interface PayrollEntry {
  employeeId: string,
  hours: number
}

export interface PayrollHistory {
  companyId: string,
  payPeriodStart: string,
  dateSubmitted: string,
  submittedBy: string,
  payroll: Array<PayrollEntry>
}

interface PayrollSubmission {
  payPeriodStart: string,
  payroll: Array<PayrollEntry>
}


@Injectable()
export class Bridge {

  companies = {}; // The array of companies we fetched from the api will be cached here until it expires
  employees = {};
  payrollHistory = {};

  companyDataLastFetched = 0; // The unix timestamp of when we last fetched data
  employeeDataLastFetched = 0;
  payrollHistoryLastFetched = 0;



  constructor( public events: Events, public http: HttpClient ){};

  private getEmployeesFromCompany(id) {
    return this.http.get<Array<Employee>>(AppSettings.API_ENDPOINT + "/companies/" + id + "/employees")
    .map(employeeResponse => {
      this.employees[id] = employeeResponse;
      this.employeeDataLastFetched = Date.now();
      return employeeResponse
    });
  }

  public getEmployees(id){
    if( this.employees[id] &&  this.employeeDataLastFetched + (AppSettings.CACHE_TTL * 1000) > Date.now())
        return Observable.create(observer => {
          observer.next(this.employees[id]);
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


  private getPayrollHistoryFromAPI(companyId: string) {
    // Make the Http request and map the response so we can initialize our user object and extract the token
    return this.http.get<Array<PayrollHistory>>(AppSettings.API_ENDPOINT + `/companies/${companyId}/payrollHistory` )
      .map( payrollHistory =>  {
        this.payrollHistory[companyId] = payrollHistory;
        this.payrollHistoryLastFetched = Date.now(); // Set the timestamp for when this data was fetched
        return payrollHistory;
      })
  }

  public getCompanyPayrollHistory(companyId: string) {
    // Check if we have unexpired data in the cache or if we need to fetch new data from the api instead
    if( this.payrollHistory[companyId] && this.companyDataLastFetched + (AppSettings.CACHE_TTL * 1000) > Date.now() )
      return Observable.create(observer => {
        observer.next( this.payrollHistory[companyId] );
        observer.complete()
      });
    else
      return this.getPayrollHistoryFromAPI(companyId);
  }


  public submitCompanyPayroll( periodStart: string, companyId: string, payrollSubmission: Array<PayrollEntry> ){
    this.payrollHistoryLastFetched = 0; // Expire the cache

    const submission: PayrollSubmission = {
      payPeriodStart: periodStart,
      payroll: payrollSubmission
    };

    return this.http.post(AppSettings.API_ENDPOINT + `companies/${companyId}/submitPayroll`, submission)
  }




}

