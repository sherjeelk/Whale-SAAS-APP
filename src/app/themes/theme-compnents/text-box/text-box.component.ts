import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DragService} from "../../../services/drag.service";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextBoxComponent implements OnInit {
    @Input() data: any;
  constructor(public drag: DragService) { }

  ngOnInit(): void {
  }

}
