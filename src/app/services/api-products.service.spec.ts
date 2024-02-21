import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiProductsService } from './api-products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { ProductHome } from '../Models/products-home';
import { Subscriber } from 'rxjs';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
} 
describe('ApiServiceService', () => {
  let service: ApiProductsService;
  let httpMock:HttpTestingController;
  let authService:AuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[ApiProductsService, AuthService]
    })
    service = TestBed.inject(ApiProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    authService=TestBed.inject(AuthService)
  });
afterEach(()=>{
  httpMock.verify()
})
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get products', ()=>{
  const MOCKPRODUTS:ProductHome[]=[
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.965,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    },]
   spyOn(authService,'ifAuthentication').and.returnValue(true);
   service.getData().subscribe(data=>{
    expect(data).toEqual(MOCKPRODUTS)
   })
   const req = httpMock.expectOne('http://localhost:3000/products');
   expect(req.request.method).toEqual('GET');
   req.flush(MOCKPRODUTS)
  })
  xit('It should send you to another screen if you have not been authenticated', ()=>{
    spyOn(authService, 'ifAuthentication').and.returnValue(false);
    spyOn(service['router'], 'navigate')
    service.getData().subscribe({
      error:er=>{
        expect(er).toBeTruthy();
        expect(service['router'].navigate).toHaveBeenCalled()
       
      }
    })
    httpMock.expectNone(()=>true)
  })
 it('should get product by ID', ()=>{
  const id=1;
  const MOCKPRODUCT:ProductHome={
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.965,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  }
  service.getDataId(id).subscribe(data=>{
    expect(data).toEqual(MOCKPRODUCT)
  })
  const req=httpMock.expectOne(`http://localhost:3000/products/${id}`)
  expect(req.request.method).toEqual('GET')
  req.flush(MOCKPRODUCT)
  httpMock.verify
 })
 it('should add product', ()=>{
  const NEWPRODUCT:ProductHome={
      "id": 3,
      "title": "Mens Cotton Jacket",
      "price": 55.99,
      "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  }
  service.addData(NEWPRODUCT).subscribe(data=>{
    expect(data).toEqual(NEWPRODUCT)
  })
    const req=httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(NEWPRODUCT);
    req.flush(NEWPRODUCT);//COMPLETA LA SOLICITUD SIMULANDO UNA RESPUESTA EXITOSA
    httpMock.verify()//SE VERIFICA QUE NO HAYA SOLICITUDES PENDIENTES
  })
  
  it('should update productby delete by id',()=>{
    const id = 3;
    const UPDATEPRODUCT:ProductHome={
      "id": 3,
      "title": "Women Cotton Jacket",
      "price": 55.99,
      "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
    }
    service.upDate(id, UPDATEPRODUCT).subscribe(data=>{
    expect(data).toEqual(UPDATEPRODUCT)
    })
    const req = httpMock.expectOne(`http://localhost:3000/products/${id}`)
    expect(req.request.method).toEqual('PUT');
    req.flush(UPDATEPRODUCT);
    httpMock.verify()
  })
  it('should update delete by id',()=>{
    const id = 3;
    service.delete(id).subscribe(()=>{})
    
    const req = httpMock.expectOne(`http://localhost:3000/products/${id}`)
    expect(req.request.method).toEqual('DELETE');
    req.flush({})
    httpMock.verify()
  })
  
 })

