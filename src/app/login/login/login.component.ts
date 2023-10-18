import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router:Router
    ) {
    this.formLogin = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  showMesagge(mesg: string, action: string){
    this.snackBar.open(mesg, action, {
      horizontalPosition:'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
  onSumit() {
    //this.formLogin.markAllAsTouched();
    if (this.formLogin.valid){
      const user= this.formLogin.get('user')!.value;
      const password= this.formLogin.get('password')!.value
      if(user==='yuda'&& password==='123456'){
        this.showMesagge('Login','OK')
        this.router.navigate(['/administration'])
      }else{
        this.showMesagge('Login','YOU ARE NOT REGISTERED')
      }
    }
  }
}
