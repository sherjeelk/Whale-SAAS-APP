import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DragService} from "./drag.service";
import {LocalStorageService} from "./local-storage.service";
import {SessionService} from "./session.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // bold = false;
  // italic = false;
  // line = false;
  currency: any;
  font_family: any;
  styles = {
    font: ''
  };
  public selected: any;
  color: any = '';
  themeColor = '';
  private renderer: Renderer2;

  constructor( @Inject(DOCUMENT) private document: HTMLDocument, rendererFactory: RendererFactory2, private drag: DragService, private localStorage: LocalStorageService, private session: SessionService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setFont(font: any): string {
    this.styles.font = font.value;
    this.renderer.addClass(document.body, this.styles.font)
    console.log('this is font', font);
    return font;
  }

  /**
   * this function is used for selecting the components
   * @param components from theme-components
   * @param type is for step 1 and step3
   */
  selectedComponent(components: any, type: number) {
    console.log('this is selected before', this.selected);
    this.selected = undefined;
    this.selected = {components, type};
    console.log('this is final selected ********', this.selected);
  }

  /**
   * this function is used for change the font size
   * @param value
   */
  changeFontSize(value: any) {
    this.drag.step1.forEach((el: { id: any; uiData: any; }) => {
      if (el.id === this.selected.components.id) {
        el.uiData.font = value;
        // el.uiData.font_family= value;
      }
      console.log('this is changed ui arr', value)
    })
  }
  /**
   * this function for changing  the Bold, Italic and Underline
   * type 1 for bold, type 2 for italic and type 3 for underline(line)
   */
  changeFontStyle(type: number) {

    if (type === 1) {
      this.selected.components.uiData.bold =  !this.selected.components.uiData.bold;
    } else if (type === 2) {
      this.selected.components.uiData.italic =  !this.selected.components.uiData.italic;
    } else if (type === 3) {
      this.selected.components.uiData.underline =  !this.selected.components.uiData.underline;
    }
    // else {
    //   this.drag.step1.forEach((el: { id: any; uiData: any; }) => {
    //     if (el.id === this.selected.components.id) {
    //       // el.uiData.color = true;
    //     }
    //   })
    // }
  }

  /**
   * function for changing the font family from edit section in builder tools
   */
  changeFontFamily(value: any) {
    this.drag.step1.forEach((el: { id: any, uiData: any; }) => {
      el.uiData.font_family = value;
    })
    console.log('value', value);
  }


  // /**
  //  * function for changing the font family from global settings
  //  */
  //
  // fontFamily(value: any){
  //   // this.font_family=value;
  //   // this.localStorage.setObject('fontFamily', {fontFamily: this.font_family})
  //   // console.log('value', value);
  // }
  //
  //
  // changeCurrency(value: any) {
  //   // this.currency = value;
  //   // this.localStorage.setObject('currency', {currency: this.currency});
  //   // console.log('value', value);
  //   // // console.log('value', this.currency);
  //   console.log('this is currency', this.session.getSite().custom.global.currency)
  // }

  changeStepUi() {
    setTimeout(()=> {
      const items = this.document.querySelectorAll('.mat-step-icon')
      const items2 = this.document.querySelectorAll('.mat-step-icon-content')
      console.log('Items', items)
      this.renderer.setStyle(items.item(0), 'background', this.session.getColor());
      this.renderer.setStyle(items2.item(0), 'background', this.session.getColor());



      const items3 = this.document.querySelectorAll('.mat-step-icon-state-number')
      this.renderer.setStyle(items2.item(0), 'background', this.session.getColor());
      this.renderer.setStyle(items3.item(0), 'background', this.session.getColor());


      console.log('called to change UI');
    })
  }

}
