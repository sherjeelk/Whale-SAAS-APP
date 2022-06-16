import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddServiceComponent} from "../add-service/add-service.component";
import {ApiService} from "../../services/api.service";
import {Services} from "../../Models/Services";
import { Router} from "@angular/router";
import {LogoutAlertComponent} from "../../Shared/logout-alert/logout-alert.component";
import {reverse} from "lodash";


@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.scss']
})
export class ManageServiceComponent implements OnInit {
  obj = false;
  loading = false;
  createdService: Services[] = []

  constructor(public dialog: MatDialog, private api: ApiService, public router: Router) {
  }

  ngOnInit(): void {
    this.serviceData()
  }

  /**
   * function to be used for getting service data from api
   */
  serviceData(){
    this.api.serviceDataGet().subscribe( data => {
      this.loading = true;
      this.createdService = data.reverse();
      console.log('api data', this.createdService)
    }, error => {
      console.log('error', error.message);
    })
    this.loading= false;
  }

  /**
   * this function is used for open add Service component on pop-up
   * @param item
   */
  openServicePopUp(item?: any) {
    let dialogRef = this.dialog.open(AddServiceComponent, {
      width: '500px',
      maxHeight: '500px',
      data: item,
      disableClose: true
    })
    // console.log('id', item.id)
    dialogRef.afterClosed().subscribe(res => {
      // received data from dialog-component
      console.log('this is res', res);
      if (res) {
        this.serviceData();

      }
    })
    this.obj = !this.obj

  }

  /**
   * this function delete the added service
   * @param item
   */
  deletePopUp(item: any){
    const dialogRef =this.dialog.open(LogoutAlertComponent, {
      width:'350px',
      data: {type: 'delete-service', value: item},
      panelClass:'panel_class'
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data.data === 'deleted') {
        this.serviceData();
      }
    })
  }

  //
  // deleteService(item: any) {
  //   // this.api.deleteService(item.id).subscribe(el => {
  //   //   let index = this.createdService.indexOf(item)
  //   //   this.createdService.splice(index, 1);
  //   // })
  // }
  /**
   * for going back to setting component
   */
  back() {
    this.router.navigateByUrl('settings')
  }
}

