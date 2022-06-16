import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {UiService} from "../../../services/ui.service";
import {ApiService} from "../../../services/api.service";
import {Services} from "../../../Models/Services";
import {Product} from "../../../Models/Product";
import {DataService} from "../../../services/data.service";
import {Router} from "@angular/router";
import {SessionService} from "../../../services/session.service";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Component({
  selector: 'app-sub-service',
  templateUrl: './sub-service.component.html',
  styleUrls: ['./sub-service.component.scss']
})
export class SubServiceComponent implements OnInit {
@Input() data : any;
getServices: Services[] =[]
  getProductData: Product[] = []
  public subService: any;

  constructor(public drag: DragService, public ui: UiService, private api: ApiService, public dataShare: DataService, public router: Router, public session: SessionService) { }

  ngOnInit(): void {
    console.log('this is dataShare ', this.dataShare.subService);
    // this.singleSiteData();
    console.log('this is dynamic data in sub service view', this.data)
    this.changView();
    this.servicesGet();
  this.fetchProduct();
  }

  servicesGet(){
    this.api.serviceDataGet().subscribe( ele=> {
      this.getServices = ele;
    },
      error => {
        console.log('error occurred', error)
      })
  }

  fetchProduct(){
  this.api.getSiteProductData().subscribe(data => {
    console.log('data ', data);
    this.getProductData = data.reverse();
  }, error => {
    console.log('error occurred', error)
  })
  }

  /**
   * goes to setting Add Product
   */
  product(){
    this.router.navigateByUrl('settings').then(() => {
      this.dataShare.tabIndex = 2;
    })
  }


  changView() {
  this.drag.builder.forEach( el=> {
  if (el.type === 'sub-service'){
    this.dataShare.subService = el;
    console.log('el******************************************', el)
  }
})
  }

  // singleSiteData(){
  //   console.log('this is site data', this.session.getSite().config.step1)
  //   this.session.getSite().config.step1.forEach( (el:any)=> {
  //     if (el.type === 'sub-service'){
  //       console.log('new array element', el)
  //       this.subService = el
  //     }
  //   })
  // }


}
