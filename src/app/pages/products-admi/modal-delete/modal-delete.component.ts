import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiServiceService } from '../../../services/api-service.service';
import { ProductHome } from '../../../Models/products-home';


@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {
 constructor(
  private modalRef: MatDialogRef<ModalDeleteComponent>, 
  @Inject(MAT_DIALOG_DATA)public dataProduct:ProductHome
 ){}

 deleteItem(){
  if(this.dataProduct){
    this.modalRef.close('delete')
  }
 }
}
