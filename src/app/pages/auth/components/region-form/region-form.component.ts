import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';
import { Region, SmallCountry } from 'src/app/Models/country-interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush,
  // viewProviders:[
  //   {
  //     provide:ControlContainer,
  //     useFactory:()=>
  //     inject(ControlContainer,{skipSelf:true, host:true})
  //   }
  // ]
})
export class RegionFormComponent implements OnInit{
  public countriesByRegion:SmallCountry[]=[]
 @Input() groupName = '' 
 @Output() locationDataChange:EventEmitter<any> = new EventEmitter<any>() 
  constructor(
    private fb:FormBuilder,
    private countryService:CountriesService,
  ){}
  public formRegion:FormGroup=this.fb.group({
    region:['', [Validators.required]],
    country:['', [Validators.required]]
  })

  ngOnInit(): void {
    const predeterminedRegion = '';
    const predeterminedCountry = ''

    this.formRegion = this.fb.group({
      region:[predeterminedRegion, [Validators.required]],
      country:[predeterminedCountry, [Validators.required]]
    })
    console.log('formulario inicial', this.formRegion.value);

    this.formRegion.valueChanges.subscribe(()=>{
     this.emitLocationData();
    })

    this.regions
    this.onRegionChanged()
    
   }
  
   get regions():Region[]{
    return this.countryService.regions
   } 
 
   onRegionChanged():void{
     this.formRegion.get('region')!.valueChanges
     .pipe(
       //tap(()=>this.formRegion.get('country')!.setValue('')),
       switchMap(region=>this.countryService.getCountriesByRegion(region))
     )
     .subscribe(countries=>{
      this.countriesByRegion=countries;
       
     })
   }
 

   emitLocationData(){
    const location={
      region:this.formRegion.value.region,
      country:this.formRegion.value.country
    }
    this.locationDataChange.emit(location)
   }
}
