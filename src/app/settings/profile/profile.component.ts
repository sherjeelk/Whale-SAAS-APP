import {Component, Inject, OnInit} from '@angular/core';
import {Event, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataService} from "../../services/data.service";
import {fakeAsync} from "@angular/core/testing";
import {UtilService} from "../../services/util.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  companyDetails!: FormGroup;
  uploadImg = new FormData();
  imgeUrl: string = '';
  imageFile: any;
  isChecked = false;
  newImage: boolean = false;

  public sites: any
  private loading: boolean = false;
  public spinner: boolean = false;
  public socialLinks: any = {
    facebook: {active: false, link: ''},
    insta: {active: false, link: ''},
    twitter: {active: false, link: ''},
  };
  public logoAsHeader: boolean = false;
  public siteData: any = {};
  private imageLocation: any;


  constructor(public util: UtilService, public route: Router, public fb: FormBuilder, public api: ApiService, public session: SessionService, private _snackBar: MatSnackBar, public data: DataService) {
    this.companyDetails = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      title: ['', Validators.required],
      brand: ['', Validators.required],
      desc: ['', Validators.required],
      about: ['', Validators.required],
      terms: ['', Validators.required],
      privacy: ['', Validators.required],
      logo: [ ],
      fb: ['',],
      insta: ['',],
      twitter: ['',],
      logoAsHeader: [],
    })
  }

  ngOnInit(): void {
    console.log('site', this.session.getSite())
    // this.profileDetails();
    this.patchData();
  }

  /**
   * Uploading Logo(image)
   */
  imgChange(event: any) {
    const reader = new FileReader();
    // @ts-ignore
    if (event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event.target.files;
      // @ts-ignore
      reader.readAsDataURL(file);
      reader.onload = (mFile) => {

        this.imgeUrl = reader.result as string;
        this.imageFile = file;
        this.uploadImg.append('file', file);
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.uploadImg.append('identifier', id);
        this.newImage = true
      };
    }
  }

  matCheck(event: any){
    console.log('event is checked', event.checked)
    this.logoAsHeader = event.checked;
    this.session.getSite().custom.logoAsHeader = event.checked
    console.log('event is checked',  this.logoAsHeader)
    console.log('event is checked',   this.session.getSite().custom.logoAsHeader)
  }


  /**
   * check whether the fb, instagram and Twitter are checked or not
   * @param event
   * @param type
   */
  check(event: any, type: number) {
    if (type === 1) {
      this.socialLinks.facebook = {link: this.companyDetails.value.fb, active: event.checked}
    } else if (type === 2) {
      this.socialLinks.insta = {link: this.companyDetails.value.insta, active: event.checked}
    } else if (type === 3) {
      this.socialLinks.twitter = {link: this.companyDetails.value.twitter, active: event.checked}
    }
  }


  saveDetails(event: any, url?: any) {
    // this.profileDetails();
    console.log('this is site0', this.session.getSite())
    console.log('init save details', this.companyDetails.value.fb)
    if (this.companyDetails.valid) {
      this.spinner = false
      // event.preventDefault();
      this.companyDetails.value.logo = url;
      console.log('fb details', this.companyDetails.value.fb)
      const body = {custom: this.session.getSite().custom, name: this.companyDetails.value.brand, logo: url? url : this.session.getSite().logo};
      body.custom = JSON.parse(JSON.stringify(this.companyDetails.value));
      console.log('body custom', body.custom)
      if (this.session.getSite().custom.global) {
        body.custom.global = this.session.getSite().custom.global;
      }
      body.custom.fb = {active: this.socialLinks.facebook.active, link: this.companyDetails.value.fb}
      body.custom.insta = {active: this.socialLinks.insta.active, link: this.companyDetails.value.insta}
      body.custom.twitter = {active: this.socialLinks.twitter.active, link: this.companyDetails.value.twitter}
      this.data.profileData = body.custom;
      this.api.patchSiteData(body, this.session.getSite().id).subscribe(data => {
          this.spinner = false
          // console.log('this is update profile data after save', data)
          this.session.setSite(data);
          this.data.singleSite = data;
          this.data.siteDataConfig = data;
          this.newImage = false;
          this.util.presentSnackBar('Details saved successfully');

        },
        error => {
          this.spinner = false
          console.log('error', error)
        })
      // if (this.companyDetails.value.fb.length > 0 && this.companyDetails.value.insta.length && this.companyDetails.value.twitter.length ){
      //
      // }
      // else {
      //   this._snackBar.open('Please enter the url', '', {duration: 1000})
      // }

    } else {
      console.log('not saving');
      this.util.presentSnackBar('Please fill all the details');
    }

  }


  /**
   * Save Form details
   */
  uploadImage(event: any) {
    if (this.newImage) {
      this.spinner = true
      event.preventDefault();
      // if (this.companyDetails.valid){
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
      this.api.uploadFile(id, this.uploadImg).subscribe(data => {
        console.log('after upload logo', data);
        this.saveDetails(event, data.location);
        this.companyDetails.value.logo = data.location;
        this.imageLocation = data.location
        this.spinner = false
        // this._snackBar.open('All details saved Successfully.', '', {duration: 2000})
      }, error => {
        this.spinner = false
        console.log('error on save, for not selecting image', error)
      })
    } else {
      this.saveDetails(event);

    }

  }

  /**
   * get Profile details
   */
  // profileDetails() {
  //   this.loading = true;
  //   this.api.dataSite(this.session.getSite().id).subscribe(data => {
  //     console.log('sites api data...', data)
  //     this.siteData = data
  //     this.sites = data.custom;
  //     this.patchData(data, data.custom);
  //     this.loading = false;
  //   }, error => {
  //     console.log('error', error)
  //   })
  // }

  /**
   * patch the site data here
   */
  patchData() {
    console.log('this is site data', this.session.getSite());
    if (this.session.getSite().custom) {
      this.companyDetails.patchValue({
        name: this.session.getSite().custom.name,
        email: this.session.getSite().custom.email,
        phone: this.session.getSite().custom.phone,
        address: this.session.getSite().custom.address,
        title: this.session.getSite().custom.title,
        brand: this.session.getSite().custom.name,
        desc: this.session.getSite().custom.desc,
        about: this.session.getSite().custom.about,
        terms: this.session.getSite().custom.terms,
        privacy: this.session.getSite().custom.privacy,
        logo: this.session.getSite().custom.logo,
        fb: this.session.getSite().custom.fb?.link,
        insta: this.session.getSite().custom.insta?.link,
        twitter: this.session.getSite().custom.twitter?.link,
        logoAsHeader: this.session.getSite().custom?.logoAsHeader

        //add Link after fb twitter and insta
      })
      this.companyDetails.value.logo = this.session.getSite().custom.logo;

      this.socialLinks.facebook.active = this.session.getSite().custom.fb ? (this.session.getSite().custom.fb.active ? this.session.getSite().custom.fb.active : false) : false
      this.socialLinks.insta.active = this.session.getSite().custom.insta ? (this.session.getSite().custom.insta.active ? this.session.getSite().custom.insta.active : false) : false
      this.socialLinks.twitter.active = this.session.getSite().custom.twitter ? (this.session.getSite().custom.twitter.active ? this.session.getSite().custom.twitter.active : false) : false
      this.data.profileData = this.companyDetails.value;
    }
  }


}
