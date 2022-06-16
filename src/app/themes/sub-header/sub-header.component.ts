import {Component, OnInit} from '@angular/core';
import {DragService} from "../../services/drag.service";
import {SessionService} from "../../services/session.service";
import {DataService} from "../../services/data.service";
import {LogoutAlertComponent} from "../../Shared/logout-alert/logout-alert.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {fakeAsync} from "@angular/core/testing";

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  public siteCompletedata: any = {}
  private domainValue: any;


  constructor(private drag: DragService, public session: SessionService, public data: DataService, public dialog: MatDialog,
              public api: ApiService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  /**
   * Function for exit
   */
  exit(){
    if(!this.drag.loading){
      window.open('/', '_self');
      console.log('after exit', this.session.getSite())
    }
    else {
      this.dialog.open(LogoutAlertComponent, {
        width:'350px',
        disableClose: true,
        data: {type: 'exit'},
        panelClass:'panel_class'
      })

    }
  }

  /**
   * function for saving data in database
   */
  saveSite() {
      // const body =  this.session.getSite()
    // body.custom.grid = this.data.
     const body = { config : {step1 : this.drag.step1, step3: this.drag.step3} };
        // body.custom = this.session.getUser().site?.custom;
        // body.custom.global = this.session.getUser().site.custom?.global;
        //   body.apps = this.session.getUser().site?.apps;
        //   body.theme = this.session.getUser().site?.theme;

      this.api.patchSiteData(body, this.session.getSite().id).subscribe( data => {
        this.drag.loading = false
        console.log('this is post data', data)
        //   const site = this.session.getSite()
        // site.config = {step1 : this.drag.step1, step3: this.drag.step3};
        this.session.setSite(data);
        // console.log('this is set data', this.session.setSite(data));
        this.data.siteDataConfig = data;
      }, error => {
        this.drag.loading = false;
        console.log('error occurred while saving', error)
      })
    this.snackbar.open('Data save Successfully', '', {duration: 1000})
  }

  // allSitesData(){
  //   this.data.allSites.forEach((site:any)=> {
  //     if (site.domain){
  //       console.log('single sites domain', site.domain)
  //       this.domainValue = site.domain
  //       console.log('domain Value', this.domainValue)
  //     }
  //     else {
  //       console.log('single site', site)
  //     }
  //
  //   })
  // }

  publishSite() {
    if (this.session.getSite().domain){
      this.dialog.open(LogoutAlertComponent, {
        width:'350px',
        disableClose: true,
        data: {type: 'publish'},
        panelClass:'panel_class'
      })
    }
    else {
      this.dialog.open(LogoutAlertComponent, {
        width:'350px',
        disableClose: true,
        data: {type: 'domain-confirmation'},
        panelClass:'panel_class'
      })

    }
  }
}
