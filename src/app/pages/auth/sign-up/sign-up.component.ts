import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, Validator, FormGroupDirective, NgForm } from '@angular/forms';
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
} from '../components/validators/validators';
import { RegionFormComponent } from '../components/region-form/region-form.component';
import { User } from 'src/app/Models/user';
import { Router } from '@angular/router';
import { emailUniqueValidator } from '../components/validators/email.validators';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit {
  
  public countriesByRegion: SmallCountry[] = [];
  //public currencyCountry:SmallCountry[]=[]
  segment:number=1;
  signupForm:FormGroup
  constructor(
    private fb: FormBuilder,
   // private countryService: CountriesService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private locationForm:RegionFormComponent,
    private router:Router
  ) {
    this.signupForm = this.fb.group({
        informationUser:this.fb.group({
        firtName: ['', [Validators.required, Validators.minLength(3)]],
        secondName: ['', [Validators.minLength(3)]],
        surtName: ['', [Validators.required, Validators.minLength(3)]],
        secondSurtname: ['', [Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.pattern(emailPattern)],[emailUniqueValidator(this.authService)]],
        password: ['',
          [
            Validators.required,
            Validators.minLength(8),
            createPasswordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        role:'user',
        gender:['']
      }, { validators: passwordMatchValidator()}),
        location:this.fb.group({
        region: [''],
        country: [''],
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
   onSubmit() {
    
    if(this.signupForm.valid){
     
      const userData = this.signupForm.value 
         
        this.authService.createUser(userData).subscribe((createdUser)=>{
          console.log('usuario creado', createdUser)
          this.router.navigate(['/auth/login'])
        }
        )
    }
   }
   ngOnInit(): void {
   this.locationForm.locationDataChange.subscribe(locationData =>{
    this.signupForm.get('location')?.patchValue(locationData)
   })
  }
  UpdateLocation(locationInfo:Location){
   console.log('Datos de ubicacionrecibidos', locationInfo);
   this.signupForm.get('location')?.setValue(locationInfo);
   this.signupForm.updateValueAndValidity()
  }

  advance(){
    if(this.segment<2){
      this.segment ++
    }
  }
  goBack(){
    if(this.segment>1){
      this.segment --
    }
  }
}