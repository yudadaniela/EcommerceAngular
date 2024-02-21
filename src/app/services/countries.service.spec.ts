import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Region, SmallCountry } from '../Models/country-interface';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock:HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CountriesService]
    });
    service = TestBed.inject(CountriesService);
    httpMock=TestBed.inject(HttpTestingController)
  });
  afterEach(()=>{
    httpMock.verify()
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get countries by region',()=>{
   const MOCKREGION:Region = Region.Americas;
   const MOCKCONTRIES:SmallCountry[]=[
    {name:'colombia', cca3:'cca', borders:[]},
    {name:'cuba', cca3:'ccaa', borders:[]}
   ]
   service.getCountriesByRegion(MOCKREGION).subscribe(contries=>{
    expect(contries).toEqual(MOCKCONTRIES)
   })
   const req =httpMock.expectOne(`https://restcountries.com/v3.1/region/${MOCKREGION}?fields=cca3,name,borders,currencies`)
   expect(req.request.method).toEqual('GET');
   req.flush([
    {name:{common:'colombia'}, cca3:'cca', borders:[]},
    {name:{common:'cuba'}, cca3:'ccaa', borders:[]}
   ])
  })
});
