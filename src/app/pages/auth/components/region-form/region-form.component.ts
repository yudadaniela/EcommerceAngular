import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';
import { Region, SmallCountry } from 'src/app/Models/country-interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css'],
})
export class RegionFormComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  @Output() locationDataChange: EventEmitter<any> = new EventEmitter<any>();
/**
 * 
 * @param fb injection the FormBuilder
 * @param countryService Injection the service countrie
 */
  constructor(
    private fb: FormBuilder,
    private countryService: CountriesService
  ) {}
  public formRegion: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });
  /**
   * inicialization the component, form and suscription to changes
   */
  ngOnInit(): void {
    const predeterminedRegion = '';
    const predeterminedCountry = '';

    this.formRegion = this.fb.group({
      region: [predeterminedRegion, [Validators.required]],
      country: [predeterminedCountry, [Validators.required]],
    });
    console.log('formulario inicial', this.formRegion.value);

    this.formRegion.valueChanges.subscribe(() => {
      this.emitLocationData();
    });

    this.regions;
    this.onRegionChanged();
  }
/**
 * getter that delivery the list the regions
 */
  get regions(): Region[] {
    return this.countryService.regions;
  }
 /**
  * execute when change the region selected 
  * load the countries for region 
  */
  onRegionChanged(): void {
    this.formRegion
      .get('region')!
      .valueChanges.pipe(
        //tap(()=>this.formRegion.get('country')!.setValue('')),
        switchMap((region) => this.countryService.getCountriesByRegion(region))
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }
/**
 * emit the data selected
 */
  emitLocationData() {
    const location = {
      region: this.formRegion.value.region,
      country: this.formRegion.value.country,
    };
    this.locationDataChange.emit(location);
  }
}
