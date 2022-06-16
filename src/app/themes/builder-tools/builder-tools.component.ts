import {Component, OnInit} from '@angular/core';
import {DragService} from "../../services/drag.service";
import {UiService} from "../../services/ui.service";
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../../services/data.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-builder-tools',
  templateUrl: './builder-tools.component.html',
  styleUrls: ['./builder-tools.component.scss']
})
export class BuilderToolsComponent implements OnInit {
  count = 2
  color: any;
  title: any;
  public email: boolean = false;
  public required: boolean = false;
  links: any = '';
  loading: boolean = false
  fontArr = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42];
  public selectFont: any = ' ';


  constructor(public drag: DragService, public ui: UiService, public dialog: MatDialog, public data: DataService, public session: SessionService) {
  }

  ngOnInit(): void {
  }


  /**
   * For adding radio button
   */
  addRadio() {
    console.log('cont', this.count);

    console.log('drag', this.drag.builder);
    if (this.ui.selected.type === 1) {
      let arr = [...this.drag.step1]

      arr.forEach((el: any) => {
        if (el.uiData.selected === true) {
          this.count = el.dynamicData.radioBtn.length;
          this.count = el.dynamicData.radioBtn.length + 1;
          el.dynamicData.radioBtn.push({text: '', value: '', id: Math.random(), count: this.count});
        }
      })
      this.drag.step1 = arr;
    } else {
      this.drag.step3.forEach((el: any) => {
        if (el.uiData.selected === true) {
          el.dynamicData.radioBtn.push({text: '', value: '', id: Math.random(), count: this.count});
        }
      })
    }
  }

  /**
   *Check event for mat-checkbox
   */
  check(event: any) {
    // event.checked ? (this.ui.selected.components.dynamicData.required = true) : (this.ui.selected.components.dynamicData.req = false);
    console.log('this is event checked value', event.checked)
    this.required = event.checked
    this.ui.selected.components.dynamicData.required = event.checked
    console.log('this is event', this.required, event.checked, this.ui.selected.components.dynamicData.required)
  }

  /**
   *delete function for delete radio button
   */
  delete(item: any) {
    this.ui.selected.components.dynamicData.radioBtn = this.ui.selected.components.dynamicData.radioBtn.filter((data: any) => data.id !== item.id);
  }

  /**
   *Function for Undo redo
   */
  change(change: number) {

    // Undo
    if (this.drag.stepIndex === 0)
    {
      if (change === 1) {
        if (this.drag.unDo.length > 0) {
          const lastIndex = this.drag.unDo.length - 1;
          // let moved = JSON.parse(JSON.stringify(event.container.data[event.currentIndex]));
          let undoEvent = this.drag.unDo[lastIndex].event;
          this.drag.reDo.push(this.drag.unDo[lastIndex].event);
          console.log('step1', this.drag.stepIndex)
          this.drag.unDo.splice(lastIndex, 1);
          if (this.drag.stepIndex === 0) {
            this.drag.step1.splice(undoEvent.currentIndex, 1);
          } else if (this.drag.stepIndex === 2) {
            this.drag.step3.splice(undoEvent.currentIndex, 1);
          }
        }
      }
      // redo
      else {
        if (this.drag.reDo.length > 0) {
          // console.log('this is redo array', this.drag.reDo)
          // const lastIndex = this.drag.reDo.length - 1;
          // console.log('last index', this.drag.reDo[lastIndex]);
          // if (this.drag.reDo[lastIndex].previousContainer.connectedTo === 'step1'){
          //   console.log('undo', this.drag.unDo);
          //   console.log('redo', this.drag.reDo);
          //   this.drag.step1.splice(this.drag.reDo[lastIndex].currentIndex, 0, Object.assign(this.drag.reDo[lastIndex].currentIndex))
          //   this.drag.reDo.splice(this.drag.reDo[lastIndex], 1);
          // }
          console.log('I am here doing redo step 1')

          const lastIndex = this.drag.reDo.length - 1;
          let undoEvent = this.drag.reDo[lastIndex];
          this.drag.reDo.splice(lastIndex, 1);
          this.drag.drop(undoEvent);
        }
      }
    } else {
      if (change === 1) {
        if (this.drag.unDoThree.length > 0) {
          const lastIndex = this.drag.unDoThree.length - 1;
          // let moved = JSON.parse(JSON.stringify(event.container.data[event.currentIndex]));
          let undoEvent = this.drag.unDoThree[lastIndex].event;
          this.drag.reDoThree.push(this.drag.unDoThree[lastIndex].event);
          console.log('step1', this.drag.stepIndex)
          this.drag.unDoThree.splice(lastIndex, 1);
          if (this.drag.stepIndex === 0) {
            this.drag.step1.splice(undoEvent.currentIndex, 1);
          } else if (this.drag.stepIndex === 2) {
            this.drag.step3.splice(undoEvent.currentIndex, 1);
          }
        }
      }
      // redo
      else {
        if (this.drag.reDoThree.length > 0) {
          const lastIndex = this.drag.reDoThree.length - 1;
          let undoEvent = this.drag.reDoThree[lastIndex];
          this.drag.reDoThree.splice(lastIndex, 1);
          this.drag.drop(undoEvent);
          console.log('I am here at step 3 doing redo ')
        }
      }
    }

  }

  /**
   * to change device
   * select mobile or desktop size in edit section
   */
  changeDevice(type: number) {
    if (type === 1) {
      this.data.active = true;
      this.data.value = false;
    } else if (type === 2) {
      this.data.value = true;
      this.data.active = false;

    }
    this.ui.changeStepUi();
  }

  /**
   *Show Sub-service in grid or stack
   */
  changView(type: number) {
    if (type === 1) {
      console.log('this is selected', this.ui.selected.components)
      this.ui.selected.components.dynamicData.sub_type = 'grid';
      this.data.subService.dynamicData.active = true;
      this.data.subService.dynamicData.value = false;
    } else if (type === 2) {
      console.log('this is selected', this.ui.selected.components.dynamicData)
      this.ui.selected.components.dynamicData.sub_type = 'stack';
      this.data.subService.dynamicData.active = false;
      this.data.subService.dynamicData.value = true;
    }
  }

  /**
   * Create link for check box if checked and enable mat option
   * @param $event
   */

  createLink($event: MatCheckboxChange) {
    $event.checked ? (this.ui.selected.components.dynamicData.links.checked = true) : (this.ui.selected.components.dynamicData.links.checked = false);
  }
}
