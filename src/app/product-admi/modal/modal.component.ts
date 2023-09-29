import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';


import { ApiServiceService } from '../../service/api-service.service';
import { ProductHome } from '../../interface/products-home';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent  {
  formProducts: FormGroup;
  titleAction: string = 'New';
  buttonAction: string = 'Save';
  listProduct: ProductHome[] = [];
  submit:boolean=false;
  constructor(
    private modalRef: MatDialogRef<ApiServiceService>, //*** */
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiServiceService
  ) {
    this.formProducts = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      //id: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      title: ['', Validators.required],
    });
    this.apiService.getData().subscribe({
      next:(data)=>{
        this.listProduct=data
      },error:(e)=>{}
    })
  }
 
  showAlert(mesg: string, action: string) {
    this.snackBar.open(mesg, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }
 addEditProduct(){
 
  //console.log(this.formProducts.value);
 const model:ProductHome={
  category: this.formProducts.value.category,
      id:0,    
      description:this.formProducts.value.description ,
      image: this.formProducts.value.image,
      price: this.formProducts.value.price,
      title: this.formProducts.value.title,
 } 
  this.apiService.addData(model).subscribe((data)=>{
      console.log(data);
      
      this.showAlert('product register','OK');
      this.modalRef.close(data)
    }
  ) 
 }

 
}
