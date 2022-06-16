import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {UiService} from "../../../services/ui.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
   @Input() data: any;
  constructor(public drag: DragService, public  ui: UiService) { }

  ngOnInit(): void {
  }

}
