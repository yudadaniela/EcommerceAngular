import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry, Currencies } from '../../interfaces/country-interface';
import { filter, switchMap, tap } from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  public countriesByRegion:SmallCountry[]=[]
  //public currencyCountry:SmallCountry[]=[]
  public myForm:FormGroup=this.fb.group({
    
    name:['', [Validators.required]],
    surtname:['', [Validators.required]],
    password:['', [Validators.required, Validators.minLength(6)]],
    region:['', [Validators.required]],
    country:['', [Validators.required]],
    borders:['', [Validators.required]],
    currency:['', [Validators.required]]

  })

  constructor(
    private fb:FormBuilder,
    private countryService:CountriesService
  ){}
  ngOnInit(): void {
   this.onRegionChanged()
   this.onCountryChange()
  }

  get regions():Region[]{
   return this.countryService.regions
  } 

  onRegionChanged():void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap(()=>this.myForm.get('country')!.setValue('')),
      switchMap(region=>this.countryService.getCountriesByRegion(region))
    )
    .subscribe(countries=>{
     this.countriesByRegion=countries;
      
    })
  }

  onCountryChange():void{
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap(()=>this.myForm.get('currency')!.setValue('')),
      filter((value:string)=>value.length>0),
      switchMap(alphaCode=>this.countryService.getCountryAlphaCode(alphaCode))
    )
    .subscribe(country=>{
     console.log({currency:country.currencies});
     //this.currencyCountry=country.currencies
      
    })
  }

}
