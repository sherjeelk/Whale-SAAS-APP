import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UiService} from "../services/ui.service";
import {MatDialog} from "@angular/material/dialog";
import {DomainVerificationComponent} from "./domain-verification/domain-verification.component";
import {ManageApiComponent} from "./manage-api/manage-api.component";
import {AppearanceSettingComponent} from "./appearance-setting/appearance-setting.component";
import {Router} from "@angular/router";
import {SessionService} from "../services/session.service";
import {UtilService} from "../services/util.service";
import {DataService} from "../services/data.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiService} from "../services/api.service";
import {ignoreElements} from "rxjs/operators";
import {LogoutAlertComponent} from "../Shared/logout-alert/logout-alert.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: any;
  color: any;

  constructor(private api: ApiService, private snackbar: MatSnackBar, private clipboard: Clipboard, private util: UtilService, private change: ChangeDetectorRef, public ui: UiService, private dialog: MatDialog, public route: Router, public session: SessionService, public data: DataService) {
  }

  ngOnInit(): void {

    this.data.singleSite = this.session.getUser()
  }

  /**
   * this function to be used for open the Domain verification component as pop-up
   */
  openDomainSetting() {
    this.dialog.open(DomainVerificationComponent, {
      width: '850px',
      maxHeight: '500px'
    });
  }
  /**
   * back function for going one step back
   */
  back() {
    // this.route.navigateByUrl('theme-root')
    window.open('theme-root', '_self')
  }

  /**
   * this function is used to copy the text
   * @param verificationCode
   */
  copyToClipboard(verificationCode: any) {
    // this.clipboard.copy(verificationCode)
    this.clipboard.copy(verificationCode);
    this.util.presentSnackBar('Copy to Clipboard');
  }

  /**
   * this function is to be used to check whether the domain is added or not
   */
  checkDomain() {
    this.api.checkDomain(this.session.getSite().id).subscribe((data:any) => {
      console.log('data', data);
      if (!data.verified){
        this.dialog.open(LogoutAlertComponent, {
          width: '350px',
          disableClose: true,
          data: {type: 'not-verify'},
          panelClass: 'panel_class'
        })
      }
      else {
        this.dialog.open(LogoutAlertComponent, {
          width:'350px',
          disableClose: true,
          data:{type: 'verify'},
          panelClass: 'panel_class'
        })
      }

    }, error => {
      console.log('Error in verification', error)
    })
    // this.stepperArr[1].isStepper=true;
  }


}
