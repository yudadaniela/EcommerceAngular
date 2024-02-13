import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../../services/countries.service';
import {
  Region,
  SmallCountry,
  Currencies,
  Name,
} from '../../../Models/country-interface';
import { filter, switchMap, tap, Subscriber } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  createPasswordStrengthValidator,
  emailPattern,
  passwordMatchValidator,
} from '../components/validators/validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent {
  public countriesByRegion: SmallCountry[] = [];
  //public currencyCountry:SmallCountry[]=[]
  signupForm:FormGroup
  constructor(
    private fb: FormBuilder,
   // private countryService: CountriesService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
        informationUser:this.fb.group({
        firtName: ['', [Validators.required, Validators.minLength(3)]],
        secondName: ['', [Validators.minLength(3)]],
        surtName: ['', [Validators.required, Validators.minLength(3)]],
        secondSurtname: ['', [Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern(emailPattern)]],
        password: ['',
          [
            Validators.required,
            Validators.minLength(8),
            createPasswordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      }),
        region:this.fb.group({
        region: ['', [Validators.required]],
        country: ['', [Validators.required]],
      })
        
      });
  }
  showMesagge(mesg: string, action: string) {
    this.snackBar.open(mesg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
  // onSubmit(email: string, password: string) {
  //   // const emailAndPassword = { email: email, password: password };
  //   // console.log(emailAndPassword);
  //   // this.authService
  //   //   .createUser(emailAndPassword.email, emailAndPassword.password)
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //     this.showMesagge('Register', 'Successful Registration');
  //   //   })
  //   //   .catch((error) =>
  //   //     this.showMesagge('opps', 'Your email is not registered')
  //   //   );
  // }
  // ngOnInit(): void {
  //   //  this.onRegionChanged();
  //   //  this.onCountryChange();
  // }

  // get regions(): Region[] {
  //   return this.countryService.regions;
  // }

  // onRegionChanged(): void {
  //   this.formRegister
  //     .get('region')!
  //     .valueChanges.pipe(
  //       tap(() => this.formRegister.get('country')!.setValue('')),
  //       switchMap((region) => this.countryService.getCountriesByRegion(region))
  //     )
  //     .subscribe((countries) => {
  //       this.countriesByRegion = countries;
  //     });
  // }

  // onCountryChange(): void {
  //   this.formRegister
  //     .get('country')!
  //     .valueChanges.pipe(
  //       tap(() => this.formRegister.get('currency')!.setValue('')),
  //       filter((value: string) => value.length > 0),
  //       switchMap((alphaCode) =>
  //         this.countryService.getCountryAlphaCode(alphaCode)
  //       )
  //     )
  //     .subscribe((country) => {
  //       console.log({ currency: country.currencies });
  //       //this.currencyCountry=country.currencies
  //     });
  // }
}
