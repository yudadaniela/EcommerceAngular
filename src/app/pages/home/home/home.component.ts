//componente contenedor 
import { ApiProductsService } from '../../../services/api-products.service';
import { Component, OnInit } from '@angular/core';
import { ProductHome } from 'src/app/Models/products-home';
import { ItemCar } from '../../../Models/cart-items';
import { CartService } from '../../../services/cart.service';
import { FilterService } from 'src/app/services/filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data!:ProductHome[];
  filterData!:ProductHome[];
  category:string=''
  constructor(
    private cartService: CartService,
    private apiService: ApiProductsService,
    private filterService :FilterService,
    private router:ActivatedRoute
  ) {}

  addToCar(item: ProductHome) {
    //console.log('entro');
    let shopping: ItemCar = {
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
    };
    //console.log('shopping');

    this.cartService.addToCartLocalStorage(shopping);
    this.cartService.total();
    this.cartService.counter();
  }

  ngOnInit(): void {
    this.apiService.getData().subscribe((respond) => {
      this.data = respond;
      this.filterData=respond
      //console.log(respond);
    });
    this.filterService.searchEvent.subscribe((searchTerm)=>{
     this.filterData = this.filterService.filterBySearch(this.data, searchTerm)
    })
    this.router.queryParams.subscribe(params =>{
      const category=params['category']
      if(category){
        this.filterService.categoryEvent.subscribe((category)=>{
          this.filterData = this.filterService.filterByCategory(this.data, category)
         })
      }
    })
    
  }
}
