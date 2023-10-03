import { ModalComponent } from '../modal-create-edit/modal.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductHome } from '../../interface/products-home';
import { ApiServiceService } from '../../service/api-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'app-admi',
  templateUrl: './admi.component.html',
  styleUrls: ['./admi.component.css'],
})
export class AdmiComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Title', 'Category', 'Price', 'Action'];

  dataSource = new MatTableDataSource<ProductHome>();

  constructor(
    private apiservice: ApiServiceService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.showList();
  }
  showList() {
    this.apiservice.getData().subscribe({
      next: (products) => {
        //este next es para cuando la respuesta no da ningun problema
        //console.log(products);
        this.dataSource.data = products;
      },
      error: (e) => {},
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      //console.log(res);
      if (res) {
        //console.log(res);
        //this.dataSource.data=res;
        console.log(this.dataSource.data);
        //this.dataSource.data.push(res)
        this.showList();
      } else {
        console.log('algo paso');
      }
    });
  }
  openModalEdit(product: ProductHome) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: product,
    });
    dialogRef.afterClosed().subscribe((res) => {
      //console.log(res);
      if (res === 'edit') {
        //console.log(res);
        //this.dataSource.data=res;
        console.log(this.dataSource.data);
        //this.dataSource.data.push(res)
        this.showList();
      } else {
        console.log('algo paso');
      }
    });
  }
  openModalDelete(product: ProductHome) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'delete') {
        this.apiservice.delete(product.id).subscribe({
          next: (data) => {
            this.showList();
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    });
  }
}
