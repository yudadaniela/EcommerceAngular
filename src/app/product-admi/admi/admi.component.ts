import {Component,OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductHome } from "../../interface/products-home";
import { ApiServiceService } from "../../service/api-service.service";
//import {MatIconModule} from '@angular/material/icon';
//import {MatButtonModule} from '@angular/material/button'


@Component({
  selector: 'app-admi',
  templateUrl: './admi.component.html',
  styleUrls: ['./admi.component.css'],
 
})
export class AdmiComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Title', 'Category', 'Price', 'Action'];
  dataSource = new MatTableDataSource<ProductHome>();
  
  constructor(private apiservice:ApiServiceService){}
  ngOnInit(): void {
    this.showList();
  }
  showList(){
    this.apiservice.getData().subscribe({
      next:(products)=>{       //este next es para cuando la respuesta no da ningun problema
        console.log(products);
        this.dataSource.data=products
      }, error:(e)=>{}
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

}
