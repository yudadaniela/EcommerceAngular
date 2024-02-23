import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiProductsService } from '../../../services/api-products.service';
import { ProductHome } from '../../../Models/products-home';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  formProducts: FormGroup;
  titleAction: string = 'New Product';
  buttonAction: string = 'Save';
  listProduct: ProductHome[] = [];
  submit: boolean = false;
  segment: number = 1;
  constructor(
    private modalRef: MatDialogRef<ModalComponent>, //*** */
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiProductsService,
    @Inject(MAT_DIALOG_DATA) public dataProduct: ProductHome
  ) {
    this.formProducts = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      //id: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.apiService.getData().subscribe({
      next: (data) => {
        this.listProduct = data;
      },
      error: (e) => {},
    });
  }

  showAlert(mesg: string, action: string) {
    this.snackBar.open(mesg, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  addEditProduct() {
    console.log(this.formProducts.value);
    const model: ProductHome = {
      category: this.formProducts.value.category,
      id: 0,
      description: this.formProducts.value.description,
      image: this.formProducts.value.image,
      price: this.formProducts.value.price,
      title: this.formProducts.value.title,
    };
    //this.modalRef.close(model)
    if (this.dataProduct == null) {
      this.apiService.addData(model).subscribe((data) => {
        //console.log('mensaje antes', data);
        this.showAlert('product register', 'OK');
        this.modalRef.close(data);
      });
    } else {
      this.apiService.upDate(this.dataProduct.id, model).subscribe((data) => {
        //console.log('mensaje antes', data);
        this.showAlert('product update', 'OK');
        this.modalRef.close('edit');
      });
    }
  }
  ngOnInit(): void {
    if (this.dataProduct) {
      this.formProducts.patchValue({
        //actualizar partes específicas de un modelo de datos de control de formulario.
        //id:this.dataProduct.id,       //setvalue(), patchValue()
        category: this.dataProduct.category,
        description: this.dataProduct.description,
        image: this.dataProduct.image,
        price: this.dataProduct.price,
        title: this.dataProduct.title,
      });
      this.titleAction = 'Edit Product';
      this.buttonAction = 'Update';
    }
  }
  advance() {
    if (this.segment < 2) {
      this.segment++;
    }
  }
  goBack() {
    if (this.segment > 1) {
      this.segment--;
    }
  }
}
