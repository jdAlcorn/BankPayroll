/**
 * Constants that need to be globally available
 *
 */
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {TestPage} from "../pages/test/test";
import {Bridge} from '../providers/bridge';
import {EmployeePage} from "../pages/employee/employee";
import {ContactPage} from "../pages/contact/contact";
import {AboutPage} from "../pages/about/about";
import {ProfilePage} from "../pages/profile/profile";


export class AppSettings {

  public static employee = EmployeePage;
  public static contact = ContactPage;
  public static home = HomePage;
  public static login = LoginPage;
  public static test = TestPage;
  public static profile = ProfilePage;
  public static about = AboutPage;


  // The url to the api
  public static API_ENDPOINT = "https://cos420.kylegoodale.com:2087";

  // The index in the header we put the auth token into in our http interceptor
  public static AUTH_TOKEN_HEADER = "X-AUTH-TOKEN";



}
