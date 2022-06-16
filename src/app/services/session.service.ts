import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {AppConstants} from "../AppConstants";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LocalStorageService} from "./local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutAlertComponent} from "../Shared/logout-alert/logout-alert.component";

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  public isLoggedIn = false;
  // public auth = new BehaviorSubject<boolean>(null);
  public auth = new ReplaySubject(1);
  public restaurant: any;
  public restaurantNotFound = false;
  public analytics: any;
  private token = '';
  private user: any;
  private site: any;


  constructor(private router: Router, private storage: LocalStorageService, private http: HttpClient, public dialog: MatDialog) {
    // Get all info from localstorage
    this.init();
  }

  /** This function can be used to get token */
  getToken(): string {
    return this.token;
  }

  /** This function can be used to get user */
  getUser(): any {
    return this.user;
  }

  /**
   * To be used to set user.
   * @param user - The user object.
   */
  async setUser(user: any): Promise<void> {
    console.log('user', user);
    this.user = user;
    this.isLoggedIn = true;
    console.warn('Got this for saving', user);
    await this.storage.setObject('user', user);
    this.auth.next(true);
  }


  /** This function can be used to get site */
  getSite(): any {
    return this.site;
  }

  /**
   * To be used to set site.
   * @param site - The user object.
   */
  async setSite(site: any): Promise<void> {
    console.log('user', site);
    this.site = site;
    console.warn('Got this for saving', site);
    // const sites = this.storage.getObject('site');
    // console.log('this is site', sites);
    await this.storage.setObject('site', site);
  }

  // /**
  //  * This function will check on every reload if saved token is still valid and active
  //  * @private
  //  */
  // private verifyToken() {
  //   const headers = {Authorization: `Bearer ${this.token}`};
  //   this.http.get<any>(AppConstants.API.ME, {headers}).subscribe(data => {
  //     console.log('user data', data);
  //     if (data) {
  //       this.setUser(data);
  //     } else {
  //       this.logout();
  //       this.restaurantNotFound = true;
  //     }
  //     console.log('Token verified :: Session is still active!');
  //   }, error => {
  //     this.logout();
  //     this.restaurantNotFound = true;
  //     console.log('Session is expired!', error.status);
  //   });
  // }
  //
  //
  // public reloadSession(){
  //   this.verifyToken();
  // }

  /**
   * To be used to set token.
   * @param token - The token post received post login.
   */
  async setToken(token: string): Promise<void> {
    this.token = token;
    await this.storage.setItem('token', token);
    await this.storage.setBoolean('loggedIn', true);
    const headers = {Authorization: `Bearer ${this.token}`};
  }

  /** Logout current user */
  logout(): void {
    this.isLoggedIn = false;
    this.storage.removeItem('user');
    this.storage.removeItem('site');
    this.storage.removeItem('token');
    this.storage.setBoolean('loggedIn', false);
    this.storage.removeItem('themeColor')
    this.token = '';
    this.auth.next(false);
    this.router.navigateByUrl('/login');
  }

  /**
   * Function remove site on sign up */
  removeSite() {
    this.storage.removeItem('site');
    this.site = null;
  }

  /** This function is private and should not be used for anything else than init of session service */
  private init(): void {
    this.isLoggedIn = this.storage.getBoolean('loggedIn');
    this.user = this.storage.getObject('user');
    this.site = this.storage.getObject('site');
    this.token = this.storage.getItem('token') || '';
    console.log('Auth is ', this.user);
    // this.verifyToken();
    console.warn('Site data in Init', this.site)
    this.auth.next(this.isLoggedIn);
    // We can also optionally call refresh token API is available to refresh the token
  }

  /** this function is used to get the color **/
  getColor(): any {
    return this.site?.custom?.global?.color;
  }

  /** this function is used to get the Font **/
  getFont(): any {
    return this.site?.custom?.global?.font;
  }

  /** this function is used to get the currency  **/
  getCurrency(): any {
    return this.site?.custom?.global?.currency;
  }
}
