import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";
import {UiService} from "../../services/ui.service";
// import * as console from "console";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {DragService} from "../../services/drag.service";

@Component({
  selector: 'app-theme-root',
  templateUrl: './theme-root.component.html',
  styleUrls: ['./theme-root.component.scss']
})
export class ThemeRootComponent implements OnInit {
  public sites: any;
  loading: boolean = false

  constructor(public data: DataService, private router: Router, private localStorage: LocalStorageService, private ui: UiService, private api: ApiService, public session: SessionService, public drag: DragService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.getSites();
    const color = this.localStorage.getObject('themeColor')
    const currency = this.localStorage.getObject('currency')
    if (color) {
      this.ui.themeColor = color.color;
    }
    if (currency) {
      this.ui.currency = currency.currency;
    }
    if (this.data.themeType === '0') {
      // this.router.navigateByUrl('/');
      window.open('/', '_self')

    }
  }

  /**
   *
   */
  getSites() {
    console.log('site id*******', this.session.getSite().id)
    console.log('user data*******', this.session.getUser())
    this.api.dataSite(this.session.getSite().id).subscribe(data => {
      this.loading = false
      console.log('data while creating', data)

        if (data.theme === '1'){
          this.data.themeType = '1'
        }
        else if (data.theme === 'dark'){
          this.data.themeType = '2'
        }
        else if (data.theme === '3') {
          this.data.themeType = '3'
        }
      this.sites = data.config
      this.data.siteDataConfig = data
      if (data.config){
        if (this.sites.step1 && this.sites.step3) {
          this.drag.step1 = this.sites.step1;
          this.drag.step3 = this.sites.step3;
        } else {
          console.log('data is not available')
        }
      }
      else {
        console.log('no data')
      }


    }, error => {
      console.log('error block', error)
    })
  }


}
