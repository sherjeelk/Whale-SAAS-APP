import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {DragService} from "../../services/drag.service";
import {UiService} from "../../services/ui.service";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-theme-header',
  templateUrl: './theme-header.component.html',
  styleUrls: ['./theme-header.component.scss']
})
export class ThemeHeaderComponent implements OnInit {

  constructor(public data: DataService, public drag: DragService, public ui: UiService, public session: SessionService) { }

  ngOnInit(): void {
    console.log('data', this.session.getSite().name)
  }

}
