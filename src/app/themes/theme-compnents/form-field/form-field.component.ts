import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
    @Input() data: any;
  constructor(public drag: DragService) { }

  ngOnInit(): void {
  }

}
