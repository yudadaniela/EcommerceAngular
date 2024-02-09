import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }
       const hasUpperCase = /[A-Z]+/.test(value);
       const hasLowerCase = /[a-z]+/.test(value);
       const hasNumeric = /[0-9]+/.test(value);
       const miniNumLenght=/^.{8,}/.test(value)
       const specialCharacter=/^[!@#$%^&*()\-_+=~`[\]{}|;:'",.<>?\\/]/.test(value)
       
       const passwordValid = hasUpperCase && hasLowerCase 
       && hasNumeric && miniNumLenght && specialCharacter;

        return !passwordValid ? {
            passwordStrength:{
            hasUpperCase,
            hasLowerCase,
            hasNumeric,
            miniNumLenght,
            specialCharacter
        }}: null;
    }
}
export const emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"

export function passwordMatchValidator(firtsInput:string, secondInput:string):ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {
    const firts = control.get(firtsInput)
    const second = control.get(secondInput)
    if(firts?.value===second?.value){
        return null
    } else {
        return {notMatch:true}
    }
        
 }
}