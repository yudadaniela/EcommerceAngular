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
  /**
   * 
   * @param fb injection the formbuilder
   * @param snackBar injection the MatSnckBar
   * @param router injection the router
   * @param authService injection the AuthService
   */
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
   * Login 
   * if the Login is successes, redirects pag the admi
   * if the email no is register, send mesaggepara register
   * if the password is incorrect, send message for check
   */
  onSubmit() {
    const email = this.formLogin.get('email')?.value;
    //console.log(email);
    const password = this.formLogin.get('password')?.value;
    //console.log(password);
    this.authService.login(email, password).subscribe(
      (login) => {
            if (login) {
          console.log('se hizo login');
          this.router.navigate(['/admi']);
        } else {
          this.authService.isEmailUnique(email).subscribe((verify) => {
            console.log(verify);
            if (verify === true) {
              this.showMesagge('You have not registered', 'please register');
              setTimeout(() => {
                this.router.navigate(['']);
              }, 3000);
            } else {
              this.showMesagge('Opsss', 'Verify your password');
            }
          });
        }
      },
      (error) => {
        console.log('error durante el inicio de sesion', error);
      }
    );
  }
}

