import {Component, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {DataService} from "../../../services/data.service";
import {UiService} from "../../../services/ui.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(public drag: DragService, private ui: UiService) {
  }

  ngOnInit(): void {
  }

  delete() {
    if (this.ui.selected?.type === 1) {
      // const i = this.drag.step1.findIndex((el: { uId: any; }) => el.uId === this.ui.selected.components.uId)
      this.drag.step1.splice(this.drag.step1.findIndex((a: { uid: any; }) => a.uid === this.ui.selected.components.uid), 1)
      this.ui.selected = undefined;
    } else if (this.ui.selected?.type === 3) {
      this.drag.step3.splice(this.drag.step3.findIndex((a: { uid: any; }) => a.uid === this.ui.selected.components.uid), 1)
      this.ui.selected = undefined;
    }
  };
}
