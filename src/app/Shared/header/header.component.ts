import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {LogoutAlertComponent} from "../logout-alert/logout-alert.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DetailPopupComponent} from "../detail-popup/detail-popup.component";
import {DataService} from "../../services/data.service";
import {DragService} from "../../services/drag.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public theme: any;

  constructor(public session: SessionService, public dialog: MatDialog, private  router: Router, public data: DataService, private drag: DragService) {
  }

  ngOnInit(): void {
  }

  /**
   * this function to be used for log out from the site
   */
  logout() {
    this.dialog.open(LogoutAlertComponent, {
      width: '300px',
      maxHeight: '600px',
      data: {type: 'logout'},
      panelClass:'panel_class'
    })
  }

  /**
   * navigate to settings component or open details pop-up component if there is no site
   */
  goToSettings() {
    if (this.session.getSite()){
      console.log('yes')
      if (this.drag.loading){
        console.log('this.drag', this.drag.loading)
        this.dialog.open(LogoutAlertComponent, {
          width:'350px',
          disableClose: true,
          data: {type: 'settings'},
          panelClass:'panel_class'
        })
      }
      else {
        window.open('/settings', '_self')
      }
    }
    else {
      this.dialog.open( DetailPopupComponent, {
        width: '600px',
        panelClass: 'panel_class',
        data: {theme: {
          color: '', theme: 1
          },
          type : 'setting',
        }
      })
    }

  }
  whaleHome(){
    window.open('/', '_self')
  }
}
