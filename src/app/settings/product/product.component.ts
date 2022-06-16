import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "../add-product/add-product.component";
import {Product} from "../../Models/Product";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {LogoutAlertComponent} from "../../Shared/logout-alert/logout-alert.component";
import {UiService} from "../../services/ui.service";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  obj = false;
  load = false;
  createProduct: Product[] = []
  constructor(public dialog: MatDialog, public api: ApiService, public router: Router, public cur_value: UiService, public session: SessionService) { }

  ngOnInit(): void {
    this.productData()
  }

  /**
   * function to be used for open the add product component as pop-up
   * @param item
   */
    openProductPopUp(item?: any){
    let dialogRef = this.dialog.open(AddProductComponent, {
      width:'500px',
      maxHeight: '600px',
      data: item,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      // received data from dialog-component
      console.log('this is res', result);
      if (result.close){
        this.productData()
      }
    })
      this.obj = !this.obj

  }

  /**
   * function to be used for get all data regarding product from api
   */
  productData(){
  this.api.getSiteProductData().subscribe( data => {
    this.load = true
  this.createProduct = data.reverse();
    console.log('product data ', data)
  }, error => {
  console.log('error', error);
  })
    this.load= false;
  }

  /**
   * delete the product from table of Products
   * @param item
   */
  deleteProduct(item: any) {
    const dialogRef = this.dialog.open(LogoutAlertComponent, {
      width:'350px',
      data: {type: 'delete-product', value: item},
      panelClass:'panel_class'
    })
    dialogRef.afterClosed().subscribe(data=> {
      if (data.data === 'delete') {
        this.productData();
      }
    })
  }

backBtn(){
    this.router.navigateByUrl('settings');
  }
}
