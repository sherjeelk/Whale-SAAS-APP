import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DragService} from "../../services/drag.service";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {UiService} from "../../services/ui.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.scss']
})
export class DetailPopupComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private ui: UiService, private api: ApiService, public dialogRef: MatDialogRef<DetailPopupComponent>, public router: Router, private data: DataService,
              public snack: MatSnackBar, @Inject(MAT_DIALOG_DATA) public dialogData: any, private drag: DragService, private session: SessionService) {
  }

  ngOnInit(): void {
    console.log(this.dialogData);
  }

  /**
   * saving brand name and Project Name
   * @param brand
   */
  submit(brand: string) {
    if (brand.length > 0) {
      console.log('this is submit button')
      const body = {
        name: brand,
        config: '',
        url: 'test-url',
        active: true,
        theme: this.dialogData.theme.type === '2' ? 'dark' : this.dialogData.theme.type,
        color: this.dialogData.theme.color,
        logo: '',
        apps: '',
        custom: '',
        blocked: false
      }
      console.log('this is body', body)
      this.api.createSite(body).subscribe(data => {
        console.log('this is body', body)
        console.log('this is site data', data);
        this.data.brand = brand;
        this.data.theme = this.dialogData.theme;
        this.data.themeType = this.dialogData.theme.type;
        this.ui.themeColor = this.dialogData.theme.color
        this.localStorage.setObject('themeColor', this.dialogData.theme.color)
        const themeColor = this.localStorage.getObject('themeColor')
        if (themeColor) {
          this.ui.themeColor = themeColor.color;
        }

        // let user = this.session.getUser();
        // user.site = data
        // this.session.setUser(user);
        this.session.setSite(data);


        this.ui.themeColor = this.dialogData.color;
        if (this.dialogData.type === 'setting') {
          // this.router.navigateByUrl('settings');
          window.open('settings', '_self');

        } else {
          this.router.navigateByUrl('theme-root');
          // window.open('theme-root', '_self')
        }
        this.dialogRef.close();
      }, error => {
        console.log('An error occurred while creating site', error);
      })
    } else {
      this.openSnackBar('Please enter brand name', '');
    }

  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action, {
      duration: 3000
    });
  }
}
