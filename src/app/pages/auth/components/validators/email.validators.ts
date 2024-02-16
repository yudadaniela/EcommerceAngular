import { AbstractControl, AsyncValidatorFn,ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

export function emailUniqueValidator(
    authService: AuthService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return authService.isEmailUnique(email).pipe(
        map(isUnique => (isUnique ? null : { emailNotUnique: true })),
        catchError(() => of(null))
      );
    };
  }