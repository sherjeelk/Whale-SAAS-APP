import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public sites:any

  constructor(public api: ApiService,public session: SessionService) { }

  ngOnInit(): void {
    this.profileDetails();
  }
  profileDetails(){
    // this.loading = true;
    this.api.dataSite(this.session.getSite().id).subscribe( data=> {
      console.log('sites api data...', data.custom)

      this.sites =data.custom;
      // this.patchData(data.custom);
      // this.loading= false;
    }, error => {
      console.log('error occurred', error)
    })
  }

}
