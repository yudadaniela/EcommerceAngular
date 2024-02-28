import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  SmallCountry,
  
} from '../../../Models/country-interface';
import { filter, switchMap, tap, Subscriber } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  createPasswordStrengthValidator,
  emailPattern,
  passwordMatchValidator,
} from '../components/validators/validators';
import { RegionFormComponent } from '../components/region-form/region-form.component';
import { User } from 'src/app/Models/user';
import { Router } from '@angular/router';
import { emailUniqueValidator } from '../components/validators/email.validators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  //public currencyCountry:SmallCountry[]=[]
  segment: number = 1;
  signupForm: FormGroup;
  /**
   * 
   * @param fb injection the formbuilder
   * @param authService injection the service authservice
   * @param snackBar injection the snackbar
   * @param locationForm injection the anidado form
   * @param router injection the router
   */
  constructor(
    private fb: FormBuilder,
    // private countryService: CountriesService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private locationForm: RegionFormComponent,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      informationUser: this.fb.group(
        {
          firtName: ['', [Validators.required, Validators.minLength(3)]],
          secondName: ['', [Validators.minLength(3)]],
          surtName: ['', [Validators.required, Validators.minLength(3)]],
          secondSurtname: ['', [Validators.minLength(3)]],
          email: [
            '',
            [Validators.required, Validators.pattern(emailPattern)],
            [emailUniqueValidator(this.authService)],
          ],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              createPasswordStrengthValidator(),
            ],
          ],
          confirmPassword: ['', [Validators.required]],
          role: 'user',
          gender: [''],
        },
        { validators: passwordMatchValidator() }
      ),
      location: this.fb.group({
        region: [''],
        country: [''],
      }),
    });
  }
/**
 * 
 * @param mesg message for show
 * @param action action the message
 */
  showMesagge(mesg: string, action: string) {
    this.snackBar.open(mesg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
  /**
   * send the register form
   * if the user is valid, created a new user 
   */
  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;

      this.authService.createUser(userData).subscribe((createdUser) => {
        console.log('usuario creado', createdUser);
        this.router.navigate(['/auth/login']);
      });
    }
  }
  /**
   *suscribe the form for changes the region and country
   */
  ngOnInit(): void {
    this.locationForm.locationDataChange.subscribe((locationData) => {
      this.signupForm.get('location')?.patchValue(locationData);
    });
  }
  /**
   * update the ubication 
   * @param locationInfo data the ubication 
   */
  UpdateLocation(locationInfo: Location) {
    console.log('Datos de ubicacionrecibidos', locationInfo);
    this.signupForm.get('location')?.setValue(locationInfo);
    this.signupForm.updateValueAndValidity();
  }
/**
 * avance in the form
 */
  advance() {
    if (this.segment < 2) {
      this.segment++;
    }
  }
 /**
  * goback in the form
  */
  goBack() {
    if (this.segment > 1) {
      this.segment--;
    }
  }
}
