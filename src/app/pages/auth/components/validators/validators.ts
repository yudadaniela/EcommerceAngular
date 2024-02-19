import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  FormControl,
  AsyncValidatorFn,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const miniNumLenght = /^.{8,}/.test(value);
    const specialCharacter = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])/.test(value);

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      miniNumLenght &&
      specialCharacter;

    return !passwordValid
      ? {
          passwordStrength: {
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            miniNumLenght,
            specialCharacter,
          },
        }
      : null;
  };
}
export const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
       
    const confirmPassword = control.get('confirmPassword');
     
    console.log(password && confirmPassword && password.value === confirmPassword.value
      ? 'pasword match' : 'password not match');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { notMatch: true };
  }
}