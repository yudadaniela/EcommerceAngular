import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { RegionFormComponent } from './region-form.component';
import { CountriesService } from '../../../../services/countries.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RegionFormComponent', () => {
  let component: RegionFormComponent;
  let fixture: ComponentFixture<RegionFormComponent>;
  let countriesServiceSpy:jasmine.SpyObj<CountriesService>
  
  
  beforeEach(async () => {
    const countriesService = jasmine.createSpyObj('CountriesService', ['getCountriesByRegion']);
    countriesService.getCountriesByRegion.and.returnValue(of([{name:'country1', code:'code1'},
    {name:'country2', code:'code2'}]))
    await TestBed.configureTestingModule({
      declarations: [RegionFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CountriesService, useValue: countriesService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionFormComponent);
    component = fixture.componentInstance;
    countriesServiceSpy = TestBed.inject(CountriesService) as jasmine.SpyObj<CountriesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit location data when form values change', ()=>{
    const emitEventSpy= spyOn(component.locationDataChange,'emit');
    component.formRegion.setValue({region:'Region',country:'Country'})
    expect(emitEventSpy).toHaveBeenCalledWith({region:'Region',country:'Country'})
  })
  it('should update countriesByRegion when region changes',()=>{
    const countries =[{
      name:'colombia',
      cca3:'cca',
      borders:[] 
     },
     {
      name:'cuba',
      cca3:'ccaa',
      borders:[]
    }];
    countriesServiceSpy.getCountriesByRegion.and.returnValue(of(countries))
    component.formRegion.get('region')?.setValue('Region')
    expect(component.countriesByRegion).toEqual(countries)
  })
});
