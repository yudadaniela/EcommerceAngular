import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, Validators, Validator } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent',()=>{
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router:jasmine.SpyObj<Router>
  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'isEmailUnique']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the login fromwith requred fields and validators',()=>{
   expect(component.formLogin).toBeDefined();
   expect(component.formLogin.controls['email']).toBeDefined();
   expect(component.formLogin.controls['password']).toBeDefined();
   console.log(component.formLogin.controls['email'].validator);
   console.log(component.formLogin.controls['password'].validator);

  })
  // it('should navigate to admin page upon successful login', () => {
  //   spyOn(component.router, 'navigate');
  //   spyOn(component.authService, 'login').and.returnValue(of(true)); // Simulate successful login
  //   component.onSumit();
  //   expect(component.router.navigate).toHaveBeenCalledWith(['/admi']);
  // });
})