import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as _ from 'lodash';
import {UtilService} from "../../services/util.service";
import {config} from "rxjs";



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  newProductForm!: FormGroup;
  public id: number = 0;
  public name: string = '';
  public active: string = '';
  public image: string = '';
  public price: number = 0;
  public desc: string = ''


  // public site: string = '';
  public imageUrl: string = '';
  public imageFile: any;
  uploadForm = new FormData();
  public addImage: boolean = false;
  public loading: boolean = false;
  selectedService: any;
  chosenService: any = []
  services: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public details: any, private fb: FormBuilder, private dialogRef: MatDialogRef<AddProductComponent>,
              public api: ApiService, private session: SessionService, public snack: MatSnackBar, public util: UtilService) {
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      active: [true, Validators.required],
      price: ['', Validators.required],
      desc: ['']
    })
  }

  ngOnInit(): void {
    this.chosenService = [];
    this.getService();
    if (this.details) {
      this.patchData()
    }
  }

  /**
   * this function is used for patch data
   */
  patchData() {
    this.newProductForm.patchValue({
      name: this.details.name,
      active: this.details.active,
      image: this.details.image,
      price: this.details.price,
      desc: this.details.desc
    })
    this.chosenService = JSON.parse(JSON.stringify(this.details.services));

  }

  /**
   * this function is used for closing the dialog box
   */
  close() {
    this.dialogRef.close({
      close: false,
      data: undefined
    });
  }

  /**
   * this function is used for selecting true false
   * @param $event
   */
  // radioChange($event: MatRadioChange) {
  //   this.active = $event.value;
  // }

  /**
   * this function is used for saving product details
   * @param url
   */
  submit(url?: any) {
    const body = this.newProductForm.value;
    body.site = this.session.getSite().id;
    body.image = url ? url : undefined;
    body.services = _.map(this.chosenService, (item) => item.id)
    this.api.postProductData(body).subscribe((product) => {
      this.dialogRef.close(product)
      // el.site = body.site;
      this.loading = false;
      this.dialogRef.close({
          close: true,
          data: true,
          edit: false
        }
      )
      this.snack.open('Product details saved successfully', '', {duration: 2000})

    }, error => {
      this.loading = false;
      console.log('error occurred', error)
    })

  }

  /**
   * this function to be used for update the product details
   * @param url
   */
  update(url?: any) {
    let body = this.newProductForm.value
    body.site = this.session.getSite().id;
    body.services = _.map(this.chosenService, (item) => item.id);
    body.image = url ? url : this.details.image;
    this.api.updateProductData(body, this.details.id).subscribe(ele => {
      ele.name = body.name
      ele.desc = body.desc
      this.dialogRef.close({
        close: true,
        data: true,
        edit: false
      });
    }, error => {
      console.log('error occurred while update', error)
    })
  }

  /**
   * this function is used for uploading the image
   * @param event
   */
  onFileChange(event: Event) {
    const reader = new FileReader();
    // @ts-ignore
    if (event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event.target.files;
      // @ts-ignore
      reader.readAsDataURL(file);
      reader.onload = (mFile) => {
        this.imageUrl = reader.result as string;
        this.imageFile = file;
        this.uploadForm.append('file', file);
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.uploadForm.append('identifier', id);
        this.addImage = true;
        console.log('append done')
      };
    }
  }

  /**
   * this function is used on save button to save all details
   * @param type
   */
  uploadImage(type: number) {
    if (this.chosenService.length>0){
    this.loading = true;
    if (type === 1) {
      if (this.newProductForm.valid) {
        if (this.addImage) {
          const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
          this.api.uploadFile(id, this.uploadForm).subscribe(data => {
            console.log('data', data)
            this.submit(data.location);
            this.loading = false
          }, error => {
            console.log('error file', error)
            this.loading = false;
          })
        } else {
          this.submit();
        }
      } else {
        this.loading = false;
        this.snack.open('Please enter all details', '', {duration: 2000})
      }
    } else if (type === 2) {
      if (this.addImage) {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.api.uploadFile(id, this.uploadForm).subscribe(data => {
          console.log('this is data upload', data);
          this.update(data.location);
          this.snack.open('Product details updated successfully', '', {duration: 2000})
        }, error => {
          console.log('error file', error)
        })
      }
      else {
        this.update();
      }
    }
    }
    else {
      this.util.presentSnackBar('Please add one service')
    }

  }

  /**
   * this function is used to get all service data
   */
  getService() {
    this.loading = true;
    this.api.serviceDataGet().subscribe(data => {
      console.log('this is service data', data)
      this.loading = false;
      this.services = data;
    }, error => {
      console.log('error', error.message);
    })
    this.loading = false;
  }

  /**
   * this function is used for to add selected services
   * @param selectedService
   */
  addService(selectedService: any) {
      if (selectedService){
        const found = _.filter(this.chosenService, {id: selectedService.id})
        if (found.length > 0) {
          this.snack.open('Service already added', '', {duration: 1000})

        }  else {
          this.chosenService.push(selectedService)

        }
        console.log('selected service', selectedService.id)
      }
      else {
        this.snack.open('Please select service', '', {duration: 1000})
      }
  }

  /**
   * delete  item from stored array
   */

  deleteService(item: any) {
    /**
     *  deletes all the element of same id
     */
    // this.chosenService = this.chosenService.filter((data: any) => data.id != item.id);

    /**
     * deletes element on index basis
     */
    let index = this.chosenService.indexOf(item);
    this.chosenService.splice(index, 1)
  }
}
