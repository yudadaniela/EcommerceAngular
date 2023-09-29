import {Component,OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProductHome } from "../../interface/products-home";
import { ApiServiceService } from "../../service/api-service.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ModalComponent } from "../modal/modal.component";


@Component({
  selector: 'app-admi',
  templateUrl: './admi.component.html',
  styleUrls: ['./admi.component.css'],
 
})
export class AdmiComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Title', 'Category', 'Price', 'Action'];
  dataSource = new MatTableDataSource<ProductHome>();
  
  constructor(
    private apiservice:ApiServiceService,
    public dialog: MatDialog
    ){}
  ngOnInit(): void {
    this.showList();
  }
  showList(){
    this.apiservice.getData().subscribe({
      next:(products)=>{       //este next es para cuando la respuesta no da ningun problema
       // console.log(products);
        this.dataSource.data=products
      }, error:(e)=>{}
    })
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 
  openModal() {
    const dialogRef=this.dialog.open(ModalComponent);
   dialogRef.afterClosed().subscribe((res)=>{
    console.log(res);
    
    
    if(res){
      console.log(res);
      //this.showList();
      this.dataSource.data=res
    }else {
      console.log("algo paso")
    }
   })
    
  }
}



