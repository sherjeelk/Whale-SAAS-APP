import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {ApiService} from "../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-logout-alert',
  templateUrl: './logout-alert.component.html',
  styleUrls: ['./logout-alert.component.scss']
})
export class LogoutAlertComponent implements OnInit {
  time = {
    totalTimes: 60,
    minutes: 10,
    seconds: 0
  };

  timeLeft = 30;
  timer: any;
  constructor(private dialogRef: MatDialogRef<LogoutAlertComponent>, public router: Router, public session: SessionService, private change: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public dialogData: any, public api: ApiService, public snackbar: MatSnackBar, public data: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.time.minutes = Math.floor(this.time.totalTimes / 60)
    // this.time.seconds = this.time.totalTimes - this.time.minutes * 60;
    if (this.dialogData.type === 'wait'){
      this.timeCount();
    }

  }

  /**
   *   Confirm for log-out button
   */
  confirm() {
    // this.router.navigateByUrl('/login');
    this.session.logout()
    this.dialogRef.close()
    // console.log('after logout', this.session.getSite())

  }

  /**
   * Close for deleted service
   */
  close() {
    this.dialogRef.close({data: 'exit'})
  }

  /**
   *Exit for  Exit Button
   */
  exit() {
    // this.router.navigateByUrl('');
    window.open('/', '_self')
    this.dialogRef.close()
  }

  /**
   * this function to be used to open pop while deleting the service
   * @param value
   */
  delete(value: any) {
    console.log('value', value)
    this.api.deleteService(value.id).subscribe(data => {
      this.dialogRef.close({data: 'deleted'})
      this.snackbar.open('Service deleted successfully', '', {duration: 2000})
      console.log('deleted', data)
    }, error => {
      console.log('deleetion error', error)
    })
  }
  /**
   * this function to be used to open pop while deleting the product
   * @param item
   */
  deleteProduct(item: any) {
    this.api.deleteProductData(item.id).subscribe(data => {
      this.dialogRef.close({data: 'delete'})
      this.snackbar.open('Product deleted successfully', '', {duration: 2000})
    }, error => {
      console.log('delete eroro', error)
    });
  }

  /**
   * this function to be used to open pop while deleting the api
   * @param item
   */
  deleteApi(item: any) {
    this.api.deleteApp(item.id).subscribe(data => {
      this.dialogRef.close({data: 'delete-api'})
      this.snackbar.open('API deleted successfully', '', {duration: 2000})
    }, error => {
      console.log('error occurred while deleting', error)
    })
  }

  /**
   * Deploy site here
   */
  publishSite() {
    window.clearTimeout(this.timer);
    this.time.totalTimes = 30;
    const body = {domain: this.session.getSite()?.domain}
    this.api.deploySite(body).subscribe(data => {
      console.log('this is publish data', data)

    }, error => {
      console.log('error while deployment', error);
    })
    // this.snackbar.open('Site is Deployed ', '', {duration: 1000});
    this.dialogRef.close({data: 'publish'});
    this.dialog.open(LogoutAlertComponent, {
      width:'350px',
      disableClose: true,
      data: {type: 'wait'},
      panelClass:'panel_class'
    })
  }

  timeCount() {
    this.timer = setInterval(() => {
      if (this.time.minutes > 0) {
        if (this.time.totalTimes <= 60 && this.time.totalTimes > 0) {
          this.timeLeft = this.time.totalTimes--
          console.log('this is time left', this.timeLeft)
          // return this.time.totalTimes--;
        }
        else {
          this.time.minutes = this.time.minutes - 1;
          this.time.totalTimes = 60;
          window.clearTimeout(this.timer);

          this.timeCount();
        }
        return;
      } else {
        window.clearTimeout(this.timer);
        return;
      }

    }, 1000)
    // this.dialogRef.close();
  }

  /**
   * this function to be used to open pop while checking domain is verified or not
   */
  domainConfirm() {
    this.router.navigateByUrl('settings').then(() => {
        this.data.tabIndex = 3
      }
    );
    this.dialogRef.close({data: 'domain-confirmation'})
  }

  /**
   * this function is used for navigation if domain is verified
   */
  nextStep() {
    this.router.navigateByUrl('settings').then(() => {
      this.data.tabIndex = 3
    });
    this.dialogRef.close({data: 'verify'})
  }

  goToSettings(){
    window.open('/settings', '_self')
  }
}
