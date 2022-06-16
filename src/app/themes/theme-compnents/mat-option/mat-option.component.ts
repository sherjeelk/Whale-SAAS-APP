import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {UiService} from "../../../services/ui.service";
import {ApiService} from "../../../services/api.service";
import {Services} from "../../../Models/Services";
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";
import {animate} from "@angular/animations";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-mat-option',
  templateUrl: './mat-option.component.html',
  styleUrls: ['./mat-option.component.scss']
})
export class MatOptionComponent implements OnInit {
  getServices: Services[] = []
  @Input() data: any;

  constructor(public drag: DragService, public ui: UiService, private  api: ApiService, public router: Router, public tabData: DataService, public session: SessionService) {
  }

  ngOnInit(): void {
    this.getServiceData();
    console.log('data', this.data)
  }
getServiceData(){
    this.api.serviceDataGet().subscribe(data=>{
      console.log('data of services', data);
      this.getServices = data.reverse();
    }, error => {
      console.log('error occurred', error)
    })
}

  /**
   * Setting function to go the settings
   */
settings(){
    this.router.navigateByUrl('settings').then(()=> {
        this.tabData.tabIndex = 1
    }
    );
}

}
