import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductHome } from 'src/app/Models/products-home';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;
  let mockApiService:jasmine.SpyObj<ApiProductsService>
  let mockCartService:jasmine.SpyObj<CartService>
   const MOCKPRODUCT:ProductHome={
      "category": "men's clothing",
      "id": 1,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "price": 109.965,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
   }
  beforeEach(async()=>{
    mockApiService = jasmine.createSpyObj('ApiProductService', ['getDataId'])
    mockApiService.getDataId.and.returnValue(of(MOCKPRODUCT))
    mockCartService=jasmine.createSpyObj('CartService',['addToCartLocalStorage', 'total', 'counter'])
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [DescriptionComponent],
      providers:[
        {provide:ActivatedRoute, useValue:{snapshot:{paramMap:{get:()=>'1'}}}},
        {provide:ApiProductsService, useValue:mockApiService},
        {provide:CartService, useValue:mockCartService}
      ]
    }).compileComponents();
  })
   beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add item to cart when calling add Card method', ()=>{
   component.addCart(MOCKPRODUCT)
   expect(mockCartService.addToCartLocalStorage).toHaveBeenCalledWith({
      id: MOCKPRODUCT.id,
      title: MOCKPRODUCT.title,
      price: MOCKPRODUCT.price,
      quantity: 1,
   });
   expect(mockCartService.total).toHaveBeenCalled()
   expect(mockCartService.counter).toHaveBeenCalled()
  })
  it('should show products detail from Api on components initializacion',()=>{
    expect(mockApiService.getDataId).toHaveBeenCalledWith(1);
    expect(component.itemCar).toEqual(MOCKPRODUCT)
  })
});
