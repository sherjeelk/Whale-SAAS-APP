import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {SessionService} from "../../../../services/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public data: DataService, public session: SessionService) { }

  ngOnInit(): void {
  }

}
