import { TestBed } from '@angular/core/testing';
import { HttpTestingController,HttpClientTestingModule } from "@angular/common/http/testing";
import { ApiProductsService } from './api-products.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
} 
describe('ApiServiceService', () => {
  let service: ApiProductsService;
  let httpMock:HttpTestingController
  beforeEach(() => {
    service = TestBed.inject(ApiProductsService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
