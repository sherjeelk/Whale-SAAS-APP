import {Component, Input, OnInit} from '@angular/core';
import {DragService} from "../../../services/drag.service";
import {ApiService} from "../../../services/api.service";
import {Product} from "../../../Models/Product";
import {Router} from "@angular/router";
import {UiService} from "../../../services/ui.service";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-sub-service-stack',
  templateUrl: './sub-service-stack.component.html',
  styleUrls: ['./sub-service-stack.component.scss']
})
export class SubServiceStackComponent implements OnInit {
  @Input() data: any;
   // productData: Product[] =[]
  constructor(public drag: DragService, private api: ApiService, public router: Router, public ui: UiService, public tabData: DataService) { }

  ngOnInit(): void {
     // this.productStack()
  }
// productStack(){
//     this.api.getSiteProductData().subscribe(data => {
//       console.log('data of product',data);
//       // this.productData= data;
//     })
// }

  /**
   * goes to setting Add Product
   */
//   product(){
//      this.router.navigateByUrl('settings').then(() => {
//        this.tabData.tabIndex = 2;
//      })
// }
}
