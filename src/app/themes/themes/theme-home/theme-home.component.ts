import {AfterViewInit, Component, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DragService} from "../../../services/drag.service";
import {UiService} from "../../../services/ui.service";
import {MatStepper} from "@angular/material/stepper";
import {DOCUMENT} from "@angular/common";
import {DataService} from "../../../services/data.service";
import {ApiService} from "../../../services/api.service";
import {TooltipPosition} from "@angular/material/tooltip";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as _ from 'lodash'
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-theme-home',
  templateUrl: './theme-home.component.html',
  styleUrls: ['./theme-home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ThemeHomeComponent implements OnInit, AfterViewInit {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  contactForm = false;
  contactUs!: FormGroup;

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
  site: any = [];
  singleSite: any ={}
  @ViewChild("stepper", {static: false}) stepper?: MatStepper;
  constructor( public drag: DragService, public ui: UiService, @Inject(DOCUMENT) private document: HTMLDocument, private renderer: Renderer2, public data: DataService, public api: ApiService, private fb: FormBuilder, public session: SessionService) {
    this.contactUs = this.fb.group({
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.ui.changeStepUi()
  }
  ngOnInit(): void {
    this.api.getSites().subscribe(data=> {
      console.log('single site data********', data)
      data.rows.forEach((el:any)=>{
        this.singleSite = el
        console.log('single ele', this.singleSite)
      })
      this.data.singleSite = this.singleSite
    }, error => {
      console.log('error occurred', error)
    })
    this.getSlots();
  }


  showTime($event: MatCheckboxChange) {
    this.show = $event.checked;
  }

  selectedComponent(components: any, type: number) {
    if (type === 1) {
      const i = this.drag.step1.findIndex((x: { uid: any; }) => x.uid == components.uid);
      this.drag.step1.forEach((el: any) => {
        console.log('element uiData', el)
        el.uiData.selected = false;
      })
      this.drag.step1[i].uiData.selected = true;
      this.ui.selectedComponent(components, 1);
    }
    if (type === 3) {
      const i = this.drag.step3.findIndex((x: { uid: any; }) => x.uid == components.uid);
      console.log('index found', this.drag.step3);
      this.drag.step3.forEach((el: any) => {
        el.uiData.selected = false;
      })
      this.drag.step3[i].uiData.selected = true;
      this.ui.selectedComponent(components, 3);
    }
  }

  changeStep($event:any) {
    // @ts-ignore
    this.drag.stepIndex = $event.selectedIndex;
    setTimeout(() => {
      const items = this.document.querySelectorAll('.mat-step-icon')
      const items2 = this.document.querySelectorAll('.mat-step-icon-selected')
      const items3 = this.document.querySelectorAll('.mat-step-icon-state-number')
      this.renderer.setStyle(items.item(0), 'background', this.session.getColor());
      this.renderer.setStyle(items2.item(0), 'background', this.session.getColor());
      this.renderer.setStyle(items3.item(0), 'background', this.session.getColor());
    })
  }



  public getSlots() {
    // console.log('this is site data', this.data.siteData);
    this.api.getSlots().subscribe(data => {
      // console.log('this is slot data', data)
      // console.log('contact div value is true now', this.dataShare.contactDiv);
      this.slots = _.chain(data).groupBy('date').map((value, key) => ({date: key, slots: value})).value();
      for (const slot of this.slots) {
        slot.mDate = moment(slot.date);
        slot.date = moment(slot.date).format('dddd') + ' ' + moment(slot.date).format('DD.MM');
        for (const mSlot of slot.slots) {
          mSlot.label = moment(mSlot.start).format('HH:mm');
        }
      }

      this.getNextSlots(moment().startOf('day'), false)
    }, error => {
      console.log('error while getting API key', error)
      // console.log('error while getting API key', AppConstants.COMPANY_KEY)
    })
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

  private isSlotExists(date: any) {
    for (const item of this.slots) {
      if (date.isSame(item.mDate, 'day')) {
        return item.slots;
      }
    }
    return [];
  }


  openContactForm() {
    this.contactForm = !this.contactForm
  }

  moveNextTab() {
    console.log('form value', this.contactUs.value)
    if (this.contactUs.valid ) {
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
    this.data.contactForm = this.contactUs.value;
    // console.log('form details', this.data.contactForm);
  }


}
