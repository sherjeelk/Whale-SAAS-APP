import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snack: MatSnackBar) { }

  presentSnackBar(msg:string) {
    this.snack.open(msg, '' ,{
      duration: 500
    });

  }
  /**
   * @deprecated
   * This function can be used to restrict an input field of text type to accept only number
   * to be used like this onkeypress="return isNumberKey(event)"
   * @param evt Event of key press
   */
  public isNumberKey(evt: any): boolean {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57));
  }

}
