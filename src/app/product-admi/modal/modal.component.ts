import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiServiceService } from '../../service/api-service.service';
import { ProductHome } from '../../interface/products-home';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  formProducts: FormGroup;
  titleAction: string = 'New';
  buttonAction: string = 'Save';
  listProduct: ProductHome[] = [];

  constructor(
    private modalRef: MatDialogRef<ModalComponent>, //*** */
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private apiService: ApiServiceService
  ) {
    this.formProducts = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      id: ['', Validators.required],
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
  addEditProduct(){
    console.log(this.formProducts);
    console.log(this.formProducts.value);
    
    
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
