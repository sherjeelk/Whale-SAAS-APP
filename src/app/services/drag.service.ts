import {Injectable} from '@angular/core';
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import * as _ from 'lodash';
import {fakeAsync} from "@angular/core/testing";
import {__read} from "tslib";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DragService {

  color = '';
  stepIndex: any = 0;

  // Array for builder tools

  builder = [
    {
      id: 1,
      type: 'mat-option',
      title: 'Services',
      icon: 'grading',
      class: 'col-12',
      uiData: {
        color: '#1d1d1d',
        text: {text: 'Select a Service', color: '', font: '18px'},
        font: '18px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',
        title: {
          text: 'Your title here',
          color: '',
          font: '18px',
        },
        label: {
          text: 'Your label',
          color: '',
          font: '18px'
        },
      },
      uId: 'mat-option-1'
    },
    {
      id: 2,
      type: 'sub-service',
      title: 'Products',
      icon: 'post_add',
      class: 'col-12',
      uiData: {
        color: '',
        text: 'Select a sub-service',
        font: '12px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',
      },
      dynamicData: {
        active: true,
        value: false,
        sub_type: 'grid',
      },
      uid: 't-box-2'
    },
    {
      id: 4,
      type: 'divider',
      title: 'Divider',
      icon: 'horizontal_rule',
      class: 'col-12',
      uiData: {
        color: '',
        font: '12px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',

      },
      divider: 'divider-4'
    },
    {
      id: 5,
      type: 'text-box',
      title: 'Form Half',
      icon: 'short_text',
      class: 'col-lg-6 col-sm-12',
      uiData: {
        color: '#1d1d1d',
        text: 'Label',
        font: '12px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',
      },
      dynamicData: {
        uiId: '',
        title: 'title',
        email: false,
        value: '',
        type: '',
        required: false
      },
      uid: 'text-box-5'
    },
    {
      id: 6,
      type: 'text-area',
      title: 'Text Area',
      icon: 'reorder',
      class: 'col-12',
      uiData: {
        color: '#1d1d1d',
        text: 'Placeholder....',
        font: '12px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',
      },
      dynamicData: {
        uiId: '',
        title: 'title',
        value: '',
        type: '',
        required: false
      },
      uid: 'text-area-6'
    },
    {
      id: 7,
      type: 'text-box-full',
      title: 'Form full',
      icon: 'format_size',
      class: 'col-12',
      uiData: {
        color: '#1d1d1d',
        text: 'Placeholder',
        font: '12px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',
      },
      dynamicData: {
        uiId: '',
        title: '',
        value: '',
        type: '',
        required: false
      },
      uid: 'text-box-7'
    },
    {
      id: 8,
      type: 'check-box',
      title: 'Check Box',
      icon: 'check_box',
      class: 'col-12',
      dynamicData: {
        links: {
          checked: false,
          title: '',
        },
        required: false
      },
      uiData: {
        color: ' ',
        text: ' Your text here ',
        font: '20px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',
      },
      uid: 'check-box-8'
    },
    {
      id: 10,
      type: 'heading-text',
      title: 'Heading Text',
      icon: 'article',
      class: 'col-12',
      uiData: {
        color: ' ',
        text: 'Heading text here',
        font: '16px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',

      },
      uid: 't-box-9'
    },
    {
      id: 11,
      type: 'radio_button',
      title: 'Radio Button',
      icon: 'radio_button_checked',
      class: 'col-12',
      uiData: {
        color: '#1d1d1d',
        text: 'Your text here',
        font: '12px',
        italic: false,
        underline: false,
        bold: false,
        font_family: '\'Poppins\', serif',
      },
      dynamicData: {
        radioBtn: [
          {text: 'radio-1', value: 'radio-1', id: 1, active: false, count: 1},
          {text: 'radio-2', value: 'radio-2', id: 2, active: false, count: 2,}
        ],
        required: false,
        selectedValue: 'radio-1'
      },
      uid: 't-box-9'
    }
  ];
  step1: any = [

    {
      id: 1,
      type: 'mat-option',
      class: 'col-12',
      uiData: {
        color: '#1d1d1d',
        font: '18px',
        italic: false,
        underline: false,
        selected: false,
        bold: false,
        title: {
          text: 'Your title here',
          color: '',
          font: '18px',
        },
        font_family: '\'Poppins\', serif',
        text: {text: 'Select a Service', color: '', font: '18px'},
        label: {
          text: 'Your label here',
          color: '',
          font: '11px',
        },

      },
      uid: 'step-1-1',
    }
  ];
  step3 = [
    {
      id: 6,
      class: 'col-12',
      type: 'text-area',
      uiData: {
        color: '#1d1d1d',
        font: '12px',
        italic: false,
        underline: false,
        selected: false,
        bold: false,
        font_family: '\'Poppins\', serif',
        text: 'Placeholder'
      },
      dynamicData: {
        uiId: '',
        title: 'title',
        value: '',
        type: '',
        required: false
      },
      uid: 'step-3-6'
    },
    {
      id: 5,
      type: 'text-box',
      class: 'col-lg-6 col-sm-12',
      uiData: {
        color: '#1d1d1d',
        font: '12px',
        italic: false,
        underline: false,
        selected: false,
        bold: false,
        font_family: '\'Poppins\', serif',
        text: 'Label'
      },
      dynamicData: {
        uiId: '',
        title: 'title',
        email: false,
        value: '',
        type: '',
        required: false
      },
      uid: 'step-3-5'
    },
    {
      id: 5,
      type: 'text-box',
      class: 'col-lg-6 col-sm-12',
      uiData: {
        color: '#1d1d1d',
        font: '12px',
        italic: false,
        underline: false,
        selected: false,
        bold: false,
        font_family: '\'Poppins\', serif',
        text: 'Label'
      },
      dynamicData: {
        uiId: '',
        title: 'title',
        email: false,
        value: '',
        type: '',
        required: false
      },
      uid: 'step-3-5.1'
    },
    {
      id: 5,
      type: 'text-box',
      class: 'col-lg-6 col-sm-12',
      uiData: {
        color: '#1d1d1d',
        font: '12px',
        italic: false,
        underline: false,
        selected: false,
        bold: false,
        font_family: '\'Poppins\', serif',
        text: 'Label'
      },
      dynamicData: {
        uiId: '',
        title: 'title',
        email: false,
        value: '',
        type: '',
        required: false
      },
      uid: 'step-3-55'
    },
    {
      id: 8,
      title: 'Check Box',
      type: 'check-box',
      icon: 'check_box',
      class: 'col-12',
      dynamicData: {
        links: {
          checked: false,
          title: '',
        },
        required: false
      },
      uiData: {
        color: '',
        font: '20px',
        italic: false,
        underline: false,
        selected: false,
        bold: false,
        font_family: '\'Poppins\', serif',
        text: 'Your text here'
      },
      uid: 'step-3-88'
    },
    {
      id: 8,
      title: 'Check Box',
      type: 'check-box',
      icon: 'check_box',
      class: 'col-12',
      dynamicData: {
        links: {
          checked: false,
          title: ''
        },
        required: false
      },
      uiData: {
        color: '',
        font: '20px',
        italic: false,
        underline: false,
        selected: false,
        bold: false,
        font_family: '\'Poppins\', serif',
        text: 'Your text here'
      },
      uid: 'step-3-88.1'
    }
  ];
  unDo: any = [];
  reDo: any = [];
  unDoThree: any = [];
  reDoThree: any = []
  public loading: boolean = false;
  countOne = -1;
  countTwo = -1;
  constructor(private snack: MatSnackBar) {
  }

  /**
   * Function for modify array for drag and drop
   **/

  drop(event: CdkDragDrop<any[]>) {
    this.loading = true
    console.log('this is drag event', event);
    if (event.previousContainer === event.container) {
    } else {
      if (event.container.connectedTo === 'builder') {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        let test: any = {};
        this.builder.splice(event.previousIndex, 0, Object.assign(test, event.container.data[event.currentIndex]))
        const type = this.getContainer(event.container.data);
        // console.log('container data', event.container.data);
        // console.log('this is step index', this.stepIndex);
        if (this.stepIndex === 0) {
          // console.log('this is step 1 array', this.step1);
          let moved = JSON.parse(JSON.stringify(event.container.data[event.currentIndex]));
          this.step1.splice(event.currentIndex, 1);
          setTimeout(() => {
            this.step1.splice(event.currentIndex, 0, moved)
            this.step1[event.currentIndex].uid = Math.random().toString();
            this.countOne = this.countOne +  1;
            this.unDo.push({event:event, index: this.countOne});
            console.log('this is undo array in step 1 block', this.unDo)

          }, 300)
        } else if (this.stepIndex === 1) {

        } else if (this.stepIndex === 2) {
          let moved = JSON.parse(JSON.stringify(event.container.data[event.currentIndex]));
          this.step3.splice(event.currentIndex, 1);
          setTimeout(() => {
            this.step3.splice(event.currentIndex, 0, moved)
            this.step3.forEach((el: any) => {
              // console.log('this is element', el)
              const found = (el.type === 'mat-option') || (el.type === 'sub-service')
              if (found) {
                if (el.type === 'mat-option'){
                  this.snack.open('You can not place  services here.', '' , {duration: 2000 })
                }
                else if (el.type === 'sub-service'){
                  this.snack.open('You can not place  products here.', '' , {duration: 2000 })
                }
                _.remove(this.step3, el);
              }
            })
            // console.log('this is step 3 time out', this.step3)
            this.step3[event.currentIndex].uid = Math.random().toString();
            this.countTwo = this.countTwo +  1;
            this.unDoThree.push({event:event, index: this.countTwo});
            console.log('this is undo array in step 3 block', this.unDo)
          }, 300)
          // console.log('this is the event', event);
        }
      } else {


      }

    }
  }

  getContainer(data: any) {
    const step1 = _.find(data, this.step1);
    const step2 = _.find(data, this.step3);
    return step1 ? 1 : 3;
  }

}

