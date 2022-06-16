import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {ApiService} from "../../services/api.service";
import {SessionService} from "../../services/session.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  addNewServiceForm!: FormGroup;
  public id: number = 0;
  public name: string = '';
  public active: string = '';
  public image: string = '';
  public imgUrl: string = '';
  public imageFile: any;
  uploadForm = new FormData();
  addImg: boolean = false;
  public load: boolean =  false;
  public createProduct: any = [];
  selectedProduct: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddServiceComponent>, private fb: FormBuilder, public api: ApiService,
              private session: SessionService, public snack: MatSnackBar, private util: UtilService) {
    this.addNewServiceForm = this.fb.group({
      name: ['', Validators.required],
      active: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.patchData()
    } else {
      this.productData();
    }
  }

  /**
   * this function patch all data of service
   */
  patchData() {
    this.addNewServiceForm.patchValue({
      name: this.data.name,
      active: this.data.active,
      image: this.data.image
    });
  }

  /**
   * selecting true or false
   * @param $event
   */
  radioChange($event: MatRadioChange) {
    console.log($event.value);
    this.active = $event.value;
  }
/**
 * for saving data
 */
  save(url?: any) {
    const body = this.addNewServiceForm.value;
    body.site = this.session.getSite().id;
    body.image = url ? url : undefined;
      this.api.serviceDataPost(body).subscribe( (el)=> {
      this.dialogRef.close(el)
        this.dialogRef.close({
            close: true,
            data: true,
            edit: false
          }
        )
        this.load = false;
      }, error=> {
        this.load = false;
        console.log('error occurred while saving', error)
      })
  }

  upDate(url?: any) {
    let body = this.addNewServiceForm.value
    body.site = this.session.getSite().id;
    body.image = url ?  url : this.data.image;
      this.api.updateService(body, this.data.id).subscribe( ele =>{
         ele.name = body.name
        this.dialogRef.close( {
          close: true,
          data: true,
          edit: false
        });
      }, error => {
        console.log('error occurred while update', error)
      })
    }

  /**
   * close the dialog
   */
  cancel() {
    this.dialogRef.close({
      close: false,
      data: undefined
    });
  }

  /**
   * function is used for changing the image
   * @param event
   */
  fileChange(event: Event) {

    const reader = new FileReader();
    // @ts-ignore
    if (event.target.files && event.target.files.length) {
      console.log('appending file');
      // @ts-ignore
      const [file] = event.target.files;
      // @ts-ignore
      console.log('event files', event.target.files)
      reader.readAsDataURL(file);
      reader.onload = (mFile) => {
        this.imgUrl = reader.result as string;
        this.imageFile = file;
        this.uploadForm.append('file', file);
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.uploadForm.append('identifier', id);
        this.addImg = true;
      };
    }
  }

  /**
   * save all data on type 1 and update on type 2
   * @param type
   */
  upLoadImg(type: number){
    this.load = true;
    if(type === 1){
      if (this.addNewServiceForm.valid) {
        if (this.addImg) {
          const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
          this.api.uploadFile(id, this.uploadForm).subscribe(item => {
            this.save(item.location);
            this.load = false
            this.snack.open('Service details saved successfully', '', {duration: 2000})
          }, error => {
            console.log('error file', error)
            this.load = false;
          })
        } else {
          this.save()
        }
      } else {
        this.util.presentSnackBar('Please fill all details');
        this.load = false;
      }
    }
    else if(type === 2) {
      if (this.addImg) {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.api.uploadFile(id, this.uploadForm).subscribe( data=> {
          console.log('data', data)
          this.upDate(data.location);
          this.snack.open('Services details updated successfully', '', {duration: 2000})
        }, error => {
          console.log('error file', error)
        })
      } else {
        this.upDate();
      }
    }
  }

  /**
   * function is used for getting data
   */
  productData(){
    this.load = true
    this.api.getSiteProductData().subscribe( data => {
      this.createProduct = data;
      console.log('api data', data)
      this.load = false;
    }, error => {
      console.log('error', error.message);
      this.load= false;

    })
  }
}
