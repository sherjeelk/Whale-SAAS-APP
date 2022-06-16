import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UiService} from "../../services/ui.service";
import {SessionService} from "../../services/session.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiService} from "../../services/api.service";
import {DataService} from "../../services/data.service";
import {global} from "@angular/compiler/src/util";

@Component({
  selector: 'app-appearance-setting',
  templateUrl: './appearance-setting.component.html',
  styleUrls: ['./appearance-setting.component.scss']
})
export class AppearanceSettingComponent implements OnInit {

  selectCurrency: any = '&euro;'
  settingsForm: any;
  @Input() data: any;
  color: any = '';
  public selectFontFamily: any = '\'EB Garamond\', serif';
  public loading : boolean = false


  constructor(private change: ChangeDetectorRef, public snackbar: MatSnackBar, public ui: UiService, private localStorage: LocalStorageService, public dialog: MatDialog, private api: ApiService, public session: SessionService, public dataShare: DataService) {
  }

  ngOnInit(): void {
    console.log('this is color', this.color)
    this.selectCurrency = this.session.getSite()?.custom?.global?.currency
    this.session.getSite().custom?.global?.color
    this.color = this.session.getSite()?.custom?.global?.color
    this.selectFontFamily = this.session.getSite()?.custom?.global?.font
  }

  /**
   * function is used for change the color
   * @param color
   */
  changeColor(color: any): void {
    this.ui.themeColor = color;
    this.localStorage.setObject('themeColor', {color: color})
  }

  /**
   * save the global settings
   * @param event
   */
  save(event: any) {
   if (this.color){
     console.log('this is before saving', this.session.getSite());
     this.loading = true;
     event.preventDefault();
     this.changeColor(this.color);
     let body = {custom: this.session.getSite().custom};
     if (this.session.getSite().custom) {
       body.custom.global = {color: this.color, currency: this.selectCurrency, font: this.selectFontFamily}
     } else {
       body = {custom: {global: {color: this.color, currency: this.selectCurrency, font: this.selectFontFamily}}}
     }
     this.dataShare.globalData = body.custom.global
     this.api.patchSiteData(body, this.session.getSite().id).subscribe(data => {
       this.loading = false
       console.log('this is patch data', data)
       this.session.setSite(data);
       this.dataShare.singleSite = data;
       console.log('this is site after setting global', this.session.getSite());
     }, error => {
       this.loading = false;
       console.log('error while save', error)
     })
     this.dialog.closeAll();
     this.snackbar.open('Settings Applied', '', {duration: 1000})
   }
   else {
     this.snackbar.open('Please choose color', '', {duration: 1000})
   }
  }
}
