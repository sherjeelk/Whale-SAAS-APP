import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetailPopupComponent} from "../Shared/detail-popup/detail-popup.component";
import {fromEvent, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ApiService} from "../services/api.service";
import {SessionService} from "../services/session.service";
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {UiService} from "../services/ui.service";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {
  destroy = new Subject();

  /**
   * this template array is of theme types
   */
  template = [
    {
      image: '/assets/img/choose-theme/theme-4.png',
      title: 'Color Theme',
      data: {
        theme: true,
        type: '1',
        color: '#ff380a'
      }
    },
    {
      image: '/assets/img/choose-theme/theme-1.png',
      title: 'Dark Theme',
      data: {
        theme: true,
        type: '2',
        color: '#ffa700'
      }
    },
    {
      image: '/assets/img/choose-theme/theme-10.png',
      title: 'Light Theme',
      data: {
        theme: true,
        type: '3',
        color: '#1e90ff'
      }
    },
    {
      image: '/assets/img/choose-theme/upcoming-theme.png',
      title: 'Sample Template - 3',
      data: {
        theme: false,
        type: '4',
        color: '#1e90ff'
      }
    },
    {
      image: '/assets/img/choose-theme/upcoming-theme.png',
      title: 'Sample Template - 3',
      data: {
        theme: false,
        type: '5',
        color: '#1e90ff'
      }
    },

    {
      image: '/assets/img/choose-theme/upcoming-theme.png',
      title: 'Sample Template - 3',
      data: {
        theme: false,
        type: '6',
        color: '#1e90ff'
      }
    },

    {
      image: '/assets/img/choose-theme/upcoming-theme.png',
      title: 'Sample Template - 3',
      data: {
        theme: false,
        type: '7',
        color: '#1e90ff'
      }
    },
    {
      image: '/assets/img/choose-theme/upcoming-theme.png',
      title: 'Sample Template - 3',
      data: {
        theme: false,
        type: '8',
        color: '#1e90ff'
      }
    },
    {
      image: '/assets/img/choose-theme/upcoming-theme.png',
      title: 'Sample Template - 3',
      data: {
        theme: false,
        type: '9',
        color: '#1e90ff'
      }
    },
    {
      image: '/assets/img/choose-theme/upcoming-theme.png',
      title: 'Sample Template - 10',
      data: {
        theme: false,
        type: '10',
        color: '#1e90ff'
      }
    },
  ]


  destroy$ = this.destroy.asObservable()
  private siteData: any = {};

  constructor(private localStorage: LocalStorageService, public dialog: MatDialog, private api: ApiService, private session: SessionService, private router: Router, private data: DataService, private ui: UiService) {
    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => console.log(this.getYPosition(e)));
  };


  ngOnInit(): void {
    // this.data.templateArray = this.template
    // this.api.getSites().subscribe(sites => {
    //     console.log('this is  site data', sites)
    //     this.data.allSites = sites.rows
    //   }, error => {
    //     console.log('An error occurred while creating site', error);
    //   }
    // )
  }

  /**
   * Set the theme type and also set the name of brand
   * @param theme
   */
  openPopUp(theme: any) {
    console.log('theme data', theme)
    console.log('site data', this.session.getSite())
    if (!this.session.getSite()) {
      this.data.themeType = theme.type;
      const dialogRef = this.dialog.open(DetailPopupComponent, {
        width: '600px',
        data: {
          theme: theme, type: 'theme'
        }
      });
      console.log('site data', this.session.getSite())
    }
    else {
      console.log('theme', theme)
      this.data.themeType = theme.type;
      const body = {theme : theme.type === '2' ? 'dark' : theme.type}
      // body.theme = theme.type === '2' ? 'dark' : theme.type;
      // if (this.session.getUser().site.custom){
      //   body.custom = this.session.getUser().site?.custom;
      //   body.apps = this.session.getUser().site?.apps;
      //   body.config= this.session.getUser().site?.config;
      //   // body.custom.global = this.session.getUser().site.custom.global
      //   // this.session.setUser(body);
      // }
      console.log('theme type', body)
      this.api.patchSiteData(body, this.session.getSite().id).subscribe(siteData => {
        console.log('site Data', siteData)
        this.session.setSite(siteData);
        // const site =  this.session.getSite();
        // console.log('user ***********************', data);
        // user.theme = data.theme;
        // this.data.theme = data.theme
        // user.site.custom = data?.custom
        // this.session.setUser(user);
        this.router.navigateByUrl('theme-root');

      }, error => {
        console.log('error', error)
      })
    }
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
