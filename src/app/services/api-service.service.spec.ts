import { TestBed } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";
import { ApiServiceService } from './api-service.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
} 
describe('ApiServiceService', () => {
  let service: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
