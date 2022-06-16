import {AfterViewInit, Component, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import * as moment from "moment";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UiService} from "../../../services/ui.service";
import {$e} from "@angular/compiler/src/chars";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";
import {DOCUMENT} from "@angular/common";
import {DataService} from "../../../services/data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-theme-light',
  templateUrl: './theme-light.component.html',
  styleUrls: ['./theme-light.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeLightComponent implements OnInit, AfterViewInit {
  contactForm = false;
  ContactUs!: FormGroup;

  public timeSlot: any[] = [];
  private slots: any = [];
  currentDate: any = moment();
  daysRequired = 6;
  ready = false;


  date = moment().format('DD-MM-YYYY');
  time = moment().format('HH:MM');
  current = moment();
  date1 = moment().add(1, 'days');
  date2 = moment().add(2, 'days');
  date3 = moment().add(3, 'days');
  show = false;
  @ViewChild("stepper", {static: false}) stepper?: MatStepper;
  constructor(public drag: DragService, public ui: UiService, @Inject(DOCUMENT) private document: HTMLDocument, private renderer: Renderer2, public data: DataService, private fb: FormBuilder, public session: SessionService) {
    this.ContactUs = this.fb.group({
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.ui.changeStepUi();
    }

  ngOnInit(): void {
  }

  showTime($event: MatCheckboxChange) {
    this.show = $event.checked;
  }
  selectedComponent(components: any, type: number) {
    if (type === 1) {
      const i = this.drag.step1.findIndex((x: { uid: any; }) => x.uid == components.uid);
      this.drag.step1.forEach((el: any) => {
        el.uiData.selected = false;
      })
      this.drag.step1[i].uiData.selected = true;
      this.ui.selectedComponent(components, 1);
    } if (type === 3) {
      const i = this.drag.step3.findIndex((x: { uid: any; }) => x.uid == components.uid);
      console.log('index found', i);
      this.drag.step3.forEach((el: any) => {
        el.uiData.selected = false;
      })
      this.drag.step3[i].uiData.selected = true;
      this.ui.selectedComponent(components, 3);
    }
  }

  changeStep($event: any) {
    this.drag.stepIndex = $event.selectedIndex;
  }
  openContactForm() {
    this.contactForm = !this.contactForm
  }

  moveNextTab() {
    if (this.ContactUs.valid ) {
      this.onSubmit();
      // this.dataShare.index = 1;
      // this.dataShare.step.calendar = true;
      // setTimeout(() => {
      //   this.dataShare.index = 2;
      // }, 30);
    } else {
      console.log('form field required');
    }

  }

  onSubmit() {
    this.data.contactForm = this.ContactUs.value;
  }


  private isSlotExists(date: any) {
    for (const item of this.slots) {
      if (date.isSame(item.mDate, 'day')) {
        return item.slots;
      }
    }
    return [];
  }
  getNextSlots(startDate: any, reverse: boolean): void {
    const mStart = startDate.clone();
    if (reverse) {
      mStart.subtract(6, 'days');
    }
    this.timeSlot = [];
    for (let i = 0; i <= this.daysRequired; i++) {
      const cur = mStart.clone().add(i, 'days').startOf('day');
      this.timeSlot.push({
        day: cur.format('dddd') + ' ' + cur.format('DD.MM'),
        date: cur,
        slots: this.isSlotExists(cur),
      });
    }
    this.ready = true;
  }
}
