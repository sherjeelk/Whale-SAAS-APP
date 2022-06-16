import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataService} from "../../services/data.service";
import {SessionService} from "../../services/session.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {LogoutAlertComponent} from "../../Shared/logout-alert/logout-alert.component";

@Component({
  selector: 'app-domain-verification',
  templateUrl: './domain-verification.component.html',
  styleUrls: ['./domain-verification.component.scss']
})
export class DomainVerificationComponent implements OnInit {
  isLinear = false;
  domain: string = '';
  domainData: any;
  isShow = false;
  stepperArr = [
    {
      id: 1,
      isStepper: false,
      className: 'check',
      defaultClass: 'numeric-1',
      text: 'Enter Domain'
    },
    {
      id: 2,
      isStepper: false,
      className: 'check',
      defaultClass: 'numeric-2',
      text: 'Verify Ownership'
    },
    // {
    //   id: 3,
    //   isStepper: false,
    //   className: 'check',
    //   defaultClass: 'numeric-3',
    //   text: 'Go live'
    // }
  ]
  public createdDomain: any;
  public domainBoolValue: boolean = false;


  constructor(private dialog: MatDialog, private api: ApiService, public snack: MatSnackBar, public data: DataService, public session: SessionService, private clipboard: Clipboard) {
  }

  ngOnInit(): void {
  }

  /**
   * this function is used for add domain value.
   * @param domainValue
   */
  addDomain(domainValue: string) {
    const body = {
      name: 'test_site',
      domain: this.domain,
      color: '#090865',
      logo: 'http://www.ideatechnologies.net/wp-content/uploads/2017/04/home-2.jpg',
      site: this.session.getSite().id
    };
    if (domainValue.length > 0) {
      this.api.verifyDomain(body).subscribe(data => {
        console.log('this is domain verification data', data)
        const site = this.session.getSite();
       site.domain = data.domain;
        site.verified = data.verified;
       site.verificationCode = data.verificationCode;
        this.session.setSite(site);
        this.createdDomain = data;
        this.isShow = !this.isShow;
        this.data.domainValue = data.domain
      }, error => {
        if (error.status === 401)
        {
          this.domainBoolValue = true
        }
        console.log('error occurred while creating domain', error);
      })
      this.stepperArr[0].isStepper = true;
    } else {
      this.openSnackBar('Please enter Domain', '');
    }
  }

  /**
   * open the toaster to show some message
   * @param message
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this.snack.open(message, action, {
      duration: 3000
    });
  }

  /**
   * this function is  for verify the domain...
   */
  checkDomain() {
    this.api.checkDomain(this.session.getSite().id).subscribe((data: any) => {
      console.log('this is check domain data', data)
      const user = this.session.getSite();
      console.log('this is user data for verify domain', user )
      user.verified = data.verified;
      this.session.setSite(user);
      this.dialog.closeAll();
      this.dialog.open(LogoutAlertComponent, {
        data: {type: data.verified ? 'verify' : 'not-verify'},
        panelClass: 'panel_class',
        width:'350px',
        disableClose: true,
      })
    }, error => {
      console.log('Error in verification', error)
    })

  }

  subDomain(url: string) {

// IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
    url = url.replace(new RegExp(/^\s+/), ""); // START
    url = url.replace(new RegExp(/\s+$/), ""); // END

// IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
    url = url.replace(new RegExp(/\\/g), "/");

// IF THERE, REMOVES 'http://', 'https://' or 'ftp://' FROM THE START
    url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i), "");

// IF THERE, REMOVES 'www.' FROM THE START OF THE STRING
    url = url.replace(new RegExp(/^www\./i), "");

// REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
    url = url.replace(new RegExp(/\/(.*)/), "");

// REMOVES '.??.??' OR '.???.??' FROM END - e.g. '.CO.UK', '.COM.AU'
    if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
      url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "");

// REMOVES '.??' or '.???' or '.????' FROM END - e.g. '.US', '.COM', '.INFO'
    } else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
      url = url.replace(new RegExp(/\.[a-z]{2,4}$/i), "");
    }

// CHECK TO SEE IF THERE IS A DOT '.' LEFT IN THE STRING
    const subDomain = !!(url.match(new RegExp(/\./g)));

    return (subDomain);

  }

  /**
   * function to be used for copy the text on one click
   * @param verificationCode
   */
  copyToClipboard(verificationCode: any) {
    // this.clipboard.copy(verificationCode)
    this.clipboard.copy(verificationCode);
    this.openSnackBar('Copy to Clipboard', 'ok');
  }

  /**
   * open the component on dialog box
   */
  open() {
    this.dialog.open(DomainVerificationComponent, {
      width: '850px',
      maxHeight: '500px'
    });

  }
}
