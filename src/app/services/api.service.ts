import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../AppConstants";
import {SessionService} from "./session.service";
import {DataService} from "./data.service";
import {Login} from "../Models/Login";
import {Domain} from "../Models/Domain";
import {Services} from "../Models/Services";
import {Product} from "../Models/Product";
import {Site} from "../Models/Site";
import {UploadImages} from "../Models/UploadImages";
import {Apps} from "../Models/Apps";
import {Slots} from "../Models/Slots";
import {Deploy} from "../Models/Deploy";
import {Signup} from "../Models/Signup";
import {AllSites} from "../Models/AllSites";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: any;
  private userId = '';

  constructor(private http: HttpClient, private session: SessionService, private data: DataService) {
    // if user is logged in it will set headers automatically to headers variable
    // it also observe the changes so it will automatically handle everything
    this.session.auth.subscribe(data => {
      if (data) {
        // if (session.getToken())
        this.headers = {Authorization: `Bearer ${session.getToken()}`};
        this.userId = session.getUser().id;
        // console.log('UserId Assigned', this.userId, session.getUser());
      } else {
        this.headers = {};
      }
    });
  }

  public setToken(): void {
    this.headers = {Authorization: `Bearer ${this.session.getToken()}`};
  }

  doLogin(email: string, password: string): Observable<Login> {
    const auth = {
      Authorization: 'Basic ' + btoa(`${email}:${password}`)
    };
    return this.http.post<any>(AppConstants.API.LOGIN, {}, {headers: auth});

  }

  verifyDomain(body: any): Observable<Domain> {
    return this.http.post<any>(AppConstants.API.VERIFY_DOMAIN, body, {headers: this.headers});
  }

  checkDomain(id: any) {
    return this.http.get(AppConstants.API.CHECK_DOMAIN + id, {headers: this.headers});
  }

  serviceDataGet(): Observable<Services[]> {
    return this.http.get<Services[]>(AppConstants.API.SITE_SERVICES + '?site=' + this.session.getSite().id, {headers: this.headers})
  }

  serviceDataPost(body: any): Observable<Services> {
    return this.http.post<Services>(AppConstants.API.SERVICES, body, {headers: this.headers})
  }

  deleteService(userID: string): Observable<Services> {
    return this.http.delete<Services>(AppConstants.API.SERVICES + '/' + userID, {headers: this.headers})
  }

  updateService(body: any, userId: string): Observable<Services> {
    return this.http.put<Services>(AppConstants.API.SERVICES + '/' + userId, body, {headers: this.headers})
  }

  getProductData(): Observable<any> {
    return this.http.get(AppConstants.API.PRODUCT)
  }

  getSiteProductData(): Observable<Product[]> {
    return this.http.get<Product[]>(AppConstants.API.SITE_PRODUCT + '?site=' + this.session.getSite().id, {headers: this.headers})
  }



  dataSite(userId: string): Observable<Site> {
    return this.http.get<Site>(AppConstants.API.CREATE_SITE + '/' + userId, {headers: this.headers})
  }

  postProductData(body: any): Observable<Product[]> {
    return this.http.post<Product[]>(AppConstants.API.PRODUCT, body, {headers: this.headers})
  }

  deleteProductData(userId: string): Observable<Product> {
    return this.http.delete<Product>(AppConstants.API.PRODUCT + '/' + userId, {headers: this.headers})
  }

  updateProductData(body: any, userId: string): Observable<Product> {
    return this.http.put<Product>(AppConstants.API.PRODUCT + '/' + userId, body, {headers: this.headers})
  }

  createSite(body: any): Observable<Site> {
    return this.http.post<Site>(AppConstants.API.CREATE_SITE, body, {headers: this.headers})
  }

  getSites(): Observable<AllSites> {
    return this.http.get<AllSites>(AppConstants.API.MY_SITE + '?id=' + this.session.getUser().id, {headers: this.headers})
  }

  uploadFile(id: string, body: FormData): Observable<UploadImages> {
    return this.http.post<UploadImages>(AppConstants.API.UPLOAD + '?identifier=' + id, body, {headers: this.headers})
  }

  createApp(body: any): Observable<Apps> {
    return this.http.post<Apps>(AppConstants.API.CREATE_APP, body, {headers: this.headers})
  }

  getApp(): Observable<Apps> {
    return this.http.get<Apps>(AppConstants.API.CREATE_APP + '/site?site=' + this.session.getSite().id, {headers: this.headers})
  }


  doSignUp(body: any) {
    return this.http.post<Signup>(AppConstants.API.SIGNUP, body, {headers: this.headers})

  }

  deleteApp(userId: string): Observable<Apps> {
    return this.http.delete<Apps>(AppConstants.API.CREATE_APP + '/' + userId, {headers: this.headers})
  }

  deploySite(body: any) {
    return this.http.post<Deploy>(AppConstants.API.DEPLOY_SITE, body, {headers: this.headers})
  }

  public getSlots(): Observable<Slots> {
    return this.http.get<Slots>(AppConstants.API.SLOTS + 'whale');
  }

  public patchSiteData(body: any, userId: string): Observable<any> {
    return this.http.patch<any>(AppConstants.API.PATCH_SITE + '/' + userId, body, {headers: this.headers})
  }
}
