import { TestBed } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";
import { ApiProductsService } from './api-products.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
} 
describe('ApiServiceService', () => {
  let service: ApiProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
