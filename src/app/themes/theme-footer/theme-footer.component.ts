import { Component, OnInit } from '@angular/core';
import {DragService} from "../../services/drag.service";
import {DataService} from "../../services/data.service";
import {SessionService} from "../../services/session.service";
import {ApiService} from "../../services/api.service";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-theme-footer',
  templateUrl: './theme-footer.component.html',
  styleUrls: ['./theme-footer.component.scss']
})
// export class ThemeFooterComponent implements OnInit {
//
//   constructor( public drag: DragService, public data: DataService, public session : SessionService) { }
//
//   ngOnInit(): void {
//     this.companyDetails()
//   }
//
//   companyDetails(){
//     // console.log('profile details', this.session.setUser()
//   }
// }


export class ThemeFooterComponent implements OnInit {
public sites:any

  constructor(public api: ApiService,public session: SessionService,public drag: DragService,public data: DataService, public ui: UiService ) { }

  ngOnInit(): void {
    this.profileDetails();
  }
  profileDetails(){
    // this.loading = true;
    this.api.dataSite(this.session.getSite().id).subscribe( data=> {
        console.log('sites api data...', data)
        this.sites = data.custom;
        // this.patchData(data.custom);
        // this.loading= false;
    }, error => {
      console.log('error occurred', error)
    })
  }

}
