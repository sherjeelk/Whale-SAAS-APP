import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  colorChange = true;
  brand = 'Brand'
  theme = false;
  themeType: string = '1';
  active: boolean= true;
  value: boolean = false;
  tabIndex: number = 0;
  profileData: any = {};
  globalData: any = {};
  configData: any ={};
  siteDataConfig: any ={};
  allSites: any = [];
  singleSite: any = {};
  domainValue:string = '';
  templateArray: any=[];
  titleValue: any;
  subService: any;
  type:string = ''

  // storing apps data
  appsValue: string = '';
  //Storing Plan value
  plan: any;
  constructor() {
    // this.saveSiteData();
  };
  // siteData: any;
  slotsSelected: any;
  contactForm : any = {
    phone: '',
    email: '',
    date: '',
    time: ''
  }

// saveSiteData(){
//   localStorage.setItem('global', this.singleSite)
// }
// getSiteData(){
//  return localStorage.getItem('global');
// }
  getTime(date: any) {
    return moment.utc(date).format('HH:mm')
  }
}
