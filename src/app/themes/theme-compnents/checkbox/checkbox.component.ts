import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {UiService} from "../../../services/ui.service";
import {DOCUMENT} from "@angular/common";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DataService} from "../../../services/data.service";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  public checkBoxValue: boolean = false;
  @ViewChild('checkbox', {static: true}) checkBox: ElementRef | undefined;

  constructor(public drag: DragService, public session: SessionService, public ui: UiService, @Inject(DOCUMENT) private document: HTMLDocument, public renderer: Renderer2,public dataShare: DataService) {
  }

  ngOnInit(): void {
    // console.log('data',this.data) ;
    // console.log('view child',this.checkBox?.nativeElement)
  }

  ngAfterViewInit(): void {
    // const items = this.document.querySelectorAll('.mat-ripple-element')
    // const items2 = this.document.querySelectorAll('.mat-checkbox-persistent-ripple')
    const items3 = this.document.querySelectorAll('.mat-checkbox-checked')
    //here
    const items4 = this.document.querySelectorAll('.mat-checkbox-background')
    const items5 = this.document.querySelectorAll('.mat-accent')
    // this.renderer.setStyle(items.item(0), 'background', this.ui.themeColor);
    // this.renderer.setStyle(items2.item(0), 'background', this.ui.themeColor);
    // this.renderer.setStyle(items3.item(0), 'background', this.ui.themeColor);
    // this.renderer.setStyle(items4.item(0), 'background', this.ui.themeColor);
    // this.renderer.setStyle(items5.item(0), 'background', this.ui.themeColor);
    // console.log('these are items', this.ui.themeColor );
    // console.log('view child',this.checkBox)
    // @ts-ignore
    this.checkBox?.nativeElement.style.background = '#000000';
    // @ts-ignore
    this.checkBox?.nativeElement.style.backgroundColor = '#000000';
  }


  changeColor($event: MatCheckboxChange) {
    if (!$event.checked) {
      const items4 = this.document.querySelectorAll('.mat-checkbox-background')
      const items = this.document.querySelectorAll('.mat-checkbox-frame')
      this.renderer.setStyle(items4.item(0), 'background', '#fff');
      this.renderer.setStyle(items.item(0), 'border', '1px solid');
    } else {
      const items4 = this.document.querySelectorAll('.mat-checkbox-background')
      this.renderer.setStyle(items4.item(0), 'background', this.ui.themeColor);

    }

  }


  // checkCheckBoxValue(event: any) {
  //   console.log('checkbox value get',event)
  //   this.checkBoxValue = event.currentTarget.checked
  //   // if (this.checkBox){
  //   //
  //   // }
  //   console.log('view child',this.checkBox)
  //   // if(this.checkBox){
  //   //   const checkBoxStyle = {
  //   //     bak
  //   //   }
  //   // }
  // }
  changeCheckBoxValue(event: any) {
    // console.log('event value', event.currentTarget.checked)
    this.checkBoxValue = event.currentTarget.checked;
  }
}
