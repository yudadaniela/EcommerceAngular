import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';
import { Region, SmallCountry } from 'src/app/Models/country-interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css']
})
export class RegionFormComponent implements OnInit{
  public countriesByRegion:SmallCountry[]=[]
  
  constructor(
    private fb:FormBuilder,
    private countryService:CountriesService,
  ){}
  public formRegion:FormGroup=this.fb.group({
    region:['', [Validators.required]],
    country:['', [Validators.required]]
  })

  ngOnInit(): void {
    this.onRegionChanged()
    this.onCountryChange()
   }
  get regions():Region[]{
    return this.countryService.regions
   } 
 
   onRegionChanged():void{
     this.formRegion.get('region')!.valueChanges
     .pipe(
       tap(()=>this.formRegion.get('country')!.setValue('')),
       switchMap(region=>this.countryService.getCountriesByRegion(region))
     )
     .subscribe(countries=>{
      this.countriesByRegion=countries;
       
     })
   }
 
   onCountryChange():void{
     this.formRegion.get('country')!.valueChanges
     .pipe(
       tap(()=>this.formRegion.get('currency')!.setValue('')),
       filter((value:string)=>value.length>0),
       switchMap(alphaCode=>this.countryService.getCountryAlphaCode(alphaCode))
     )
     .subscribe(country=>{
      console.log({currency:country.currencies});
      //this.currencyCountry=country.currencies
       
     })
   }
}
