import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";

@Component({
  selector: 'app-edit-textbox',
  templateUrl: './edit-textbox.component.html',
  styleUrls: ['./edit-textbox.component.scss']
})
export class EditTextboxComponent implements OnInit {
  @Input() data: any;
  constructor(public drag: DragService) { }

  ngOnInit(): void {
  }

}
