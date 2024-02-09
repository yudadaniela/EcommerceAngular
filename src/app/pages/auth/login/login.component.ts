import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
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
    private router: Router,
    private authService: AuthService
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  showMesagge(mesg: string, action: string) {
    this.snackBar.open(mesg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
  onSumit(email: string, password: string) {
    //this.formLogin.markAllAsTouched();
    const emailAndPassword = { email: email, password: password };
    this.authService
      .login(emailAndPassword.email, emailAndPassword.password)
      .then((response) => {
        console.log(response, 'ok');
      })
      .catch((error) => console.log(error));
  }
}
