import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-form-field-half',
  templateUrl: './form-field-half.component.html',
  styleUrls: ['./form-field-half.component.scss']
})
export class FormFieldHalfComponent implements OnInit {
  @Input() data: any;

  constructor(public drag: DragService, public dataShare: DataService) { }

  ngOnInit(): void {
  }

}
