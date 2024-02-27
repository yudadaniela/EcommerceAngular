import { ProductHome } from './../../../Models/products-home';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DescriptionComponent } from '../description/description.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockApiService:jasmine.SpyObj<ApiProductsService>
  let mockCartService:jasmine.SpyObj<CartService>
  let mockfilterservice:jasmine.SpyObj<FilterService>
  let mockAuthService:jasmine.SpyObj<AuthService>
  let mockActivateRouter:Partial<ActivatedRoute>
  beforeEach(async()=>{
    mockApiService = jasmine.createSpyObj('ApiProductService', ['getDataId'])
    mockCartService=jasmine.createSpyObj('CartService',['addToCartLocalStorage', 'total', 'counter'])
    mockfilterservice=jasmine.createSpyObj('FilterService', ['filterBySearch', 'filterByCategory','emitSearch' ] )
    mockAuthService=jasmine.createSpyObj('AuthService', ['ifAuthentication'])
    mockActivateRouter= {queryParams:of({category:'categoryTest'})}
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      declarations: [DescriptionComponent],
      providers:[
        {provide:ActivatedRoute, useValue:mockActivateRouter },
        {provide:ApiProductsService, useValue:mockApiService},
        {provide:CartService, useValue:mockCartService},
        {provide:AuthService, useValue:mockAuthService},
        {provide:FilterService, useValue:mockfilterservice}
      ]
    }).compileComponents();
  })
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should filter the data filter when the category is supplied',()=>{
   const testData:ProductHome[]=[{id:1, title:'testCategory', price:12.5}]
   const filteredData:ProductHome[]=[{id:1, title:'testCategory', price:12.5}]
   mockApiService.getData.and.returnValue(of(testData))
   mockfilterservice.filterByCategory.and.returnValue(filteredData)
   fixture.detectChanges()
   expect(component.filterData).toEqual(filteredData)
  })
  it('should show all data when dont supplied the category',()=>{
    const testData:ProductHome[]=[{id:1, title:'testCategory', price:12.5}]
    mockApiService.getData.and.returnValue(of(testData))
    fixture.detectChanges()
    expect(component.filterData).toEqual(testData)
  })
});
