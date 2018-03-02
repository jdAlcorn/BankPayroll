/**
 * Constants that need to be globally available
 *
 */


export class AppSettings {

  // The url to the api
  public static API_ENDPOINT = "http://localhost:9000";

  // The index in the header we put the auth token into in our http interceptor
  public static AUTH_TOKEN_HEADER = "X-AUTH-TOKEN";

}
