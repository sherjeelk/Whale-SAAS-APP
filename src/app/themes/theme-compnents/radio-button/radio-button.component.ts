import {AfterViewInit, Component, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {UiService} from "../../../services/ui.service";
import {DOCUMENT} from "@angular/common";
import {DataService} from "../../../services/data.service";
import {SessionService} from "../../../services/session.service";
import {fakeAsync} from "@angular/core/testing";

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],

})
export class RadioButtonComponent implements OnInit, AfterViewInit {

  @Input() data: any;

  loopNumber: any;
  public radioBtnValue: boolean = false;

  constructor(public drag: DragService, public ui: UiService, @Inject(DOCUMENT) private document: HTMLDocument, private renderer: Renderer2,public dataShare: DataService, public session: SessionService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('this is mat step ***********', this.document.querySelectorAll('.mat-step-icon'))
    const items = this.document.querySelectorAll('.mat-radio-inner-circle')
    const items2 = this.document.querySelectorAll('.mat-radio-outer-circle')
    // this.renderer.setStyle(items.item(0), 'background', this.ui.themeColor);
    // this.renderer.setStyle(items2.item(0), 'border-color', this.ui.themeColor);

  }

  setColor(event:any) {
    setTimeout(()=> {
      const items = this.document.querySelectorAll('.mat-radio-inner-circle')
      const items2 = this.document.querySelectorAll('.mat-radio-outer-circle')
      const items3 = this.document.querySelectorAll('.mat-radio-checked')
      // this.renderer.setStyle(items.item(0), 'background-color', this.ui.themeColor);
      // this.renderer.setStyle(items2.item(0), 'border-color', this.ui.themeColor);
      // this.renderer.setStyle(items3.item(0), 'border-color', this.ui.themeColor);
    }, 300)
  }
  changeRadioBtn(event: any, item: any) {
    console.log('event value', event.currentTarget.checked)
    console.log('')
    this.data.dynamicData.radioBtn.forEach((el:any)=> {
      if (el.id === item.id){
        el.active = event.currentTarget.checked
      }
      else {
        el.active = !event.currentTarget.checked
      }
    })
    this.radioBtnValue = event.currentTarget.checked;
  }
}
