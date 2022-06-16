import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutAlertComponent} from "../../Shared/logout-alert/logout-alert.component";
import * as _ from 'lodash'
import {UtilService} from "../../services/util.service";
import {DataService} from "../../services/data.service";
import {fakeAsync} from "@angular/core/testing";
import {config} from "rxjs";

@Component({
  selector: 'app-manage-api',
  templateUrl: './manage-api.component.html',
  styleUrls: ['./manage-api.component.scss']
})
export class ManageApiComponent implements OnInit {
  apiStr: string = '';
  selectService = " ";
  subDomain: string = '';
  userName: string = '';
  password: string = '';
  publish_key: string = '';
  merchId: string = '';
  enteredApiArr: any = [];
  showEnteredApi = false;
  public loadApi: boolean = false;
  public loading: boolean = false

  constructor(public snack: MatSnackBar, public api: ApiService, public session: SessionService, public dialog: MatDialog, public util: UtilService) {
  }

  ngOnInit(): void {
    this.displayApi();
  }


  /**
   * Save button function, Saving service type and apikey values
   * @param apikey
   * @param service
   */
  saveApi(apikey: string, service: string) {
    this.loading = true;
    const found = _.find(this.enteredApiArr, {name: service})

    if (!found) {
      this.loadApi = true;
      if (apikey.length > 0 && service.length > 0) {
        // this.my_api = {apiStr: this.apiStr, service: this.selectService}
        // this.enteredApiArr.push(this.my_api) ;
        console.log('array', this.enteredApiArr);
        this.showEnteredApi = true;
        let type = '';
        if (this.selectService === 'mail') {
          type = 'email'
        } else if (this.selectService === 'scheduler') {
          type = 'calendar'
        }
        else {
          type = this.selectService
        }
        const body = {
          name: this.selectService,
          type: type,
          identifier: this.apiStr,
          apiKey1: this.publish_key,
          apiKey2: type === 'paytrail' ? this.merchId : ( type ==='stripe'? this.apiStr : '')  ,
          site: this.session.getSite().id,
          username: type === 'calendar'||'email' ? this.userName : '',
          password: type === 'calendar'||'email' ? this.password : '',
        }
        /**
         * // creating APP here...
         */
        this.api.createApp(body).subscribe(ele => {
          console.log('this is create App ', ele)
          this.loading = false;
          if (ele.type === 'calendar' || ele.type === 'paytrail' || ele.type === 'stripe') {
            let body = this.session.getSite().apps === '' ? {} : this.session.getSite().apps;
            console.log('this is api key body', body)
            if (ele.type === 'calendar') {
              body.calendar = ele.apiKey1
              console.log('api key if type is calendar', body)
            } else if (ele.type === 'paytrail') {
              body.paytrailAuth = ele.apiKey1;
              body.paytrailMerId = ele.apiKey2;
              console.log('api key if type is paytrail', body)
            }
            else if (ele.type === 'stripe'){
              body.secret_key = ele.apiKey2;
              body.publish_key = ele.apiKey1;
            }
            this.api.patchSiteData({apps: body}, this.session.getSite().id).subscribe(data => {
              console.log('this is patch data', data)
              this.loading = false;
              this.session.setSite(data);
              console.log('this is site data', this.session.getSite())
              // storing el value(apps value)
            }, error => {
              this.loading = false
              console.log('Error occurred update API site', error);
            })
          }
          apikey = ''
          this.displayApi();
          this.loadApi = false;
        }, error => {
          this.loading = false;
          console.log('error occurred', error)
        })
      } else {
        this.loading = false
        this.openSnackBar('Please select service and enter API key', '');
        // apikey = '';
      }
      this.apiStr = '';
      this.selectService = '';
      this.subDomain = '';
      this.userName = '';
      this.password = '';
      this.merchId = '';
      this.publish_key = ''
    } else {
      this.loading = false;
      this.util.presentSnackBar('This plugin is already added');
      this.apiStr = '';
      this.selectService = '';
      this.subDomain = '';
      this.userName = '';
      this.password = '';
      this.merchId = '';
      this.publish_key = '';
    }
  }

  /**
   * open the toaster to show some message
   * @param message
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this.snack.open(message, action, {
      duration: 3000
    });
  }

  /**
   * displaying data here from api...
   */

  displayApi() {
    this.api.getApp().subscribe(el => {
      this.enteredApiArr = el;
      console.log('entered', el)
    }, error => {
      console.log('error on get App Api', error)
    })
  }

  /**
   *Delete Api key and service
   * @param data
   */
  deletePopUp(data: any) {
    const dialogRef = this.dialog.open(LogoutAlertComponent, {
      width: '350px',
      data: {type: 'delete-api', value: data},
      panelClass: 'panel_class'
    })
    dialogRef.afterClosed().subscribe(data => {
      if (data.data === 'delete-api') {
        this.displayApi();
      }
    })
  }

  /**
   * close the dialog box
   */
  close() {
    this.dialog.closeAll();
  }


  instructionInfo(){

    if (this.selectService === 'mail'){
      this.dialog.open(LogoutAlertComponent, {
        width:'350px',
        disableClose: true,
        data: {type: 'mail'},
        panelClass:'panel_class'
      })
    }
    else if (this.selectService === 'scheduler'){
      this.dialog.open(LogoutAlertComponent, {
        width:'350px',
        disableClose: true,
        data: {type: 'scheduler'},
        panelClass:'panel_class'
      })
    }
    else if (this.selectService === 'stripe'){
    this.dialog.open(LogoutAlertComponent, {
      width:'360px',
      disableClose: true,
      data: {type: 'stripe'},
      panelClass:'panel_class'
    })
    }
    else if (this.selectService === 'paytrail'){
    this.dialog.open(LogoutAlertComponent, {
      width:'350px',
      disableClose: true,
      data: {type: 'paytrail'},
      panelClass:'panel_class'
    })
    }
    else  {
      this.util.presentSnackBar('Please select any service first');
    }
  }
}


