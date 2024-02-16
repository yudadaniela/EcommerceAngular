import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  FormControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
    const confirmPasword = control.get('confirmPasword');
    console.log(password && confirmPasword && password.value === confirmPasword.value
      ? null : { notMatch: true });
    
    return password && confirmPasword && password.value === confirmPasword.value
      ? null : { notMatch: true };
  }
}
