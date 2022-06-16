import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {
  @Input() data: any;
  constructor( public drag: DragService) { }

  ngOnInit(): void {
  }

}
