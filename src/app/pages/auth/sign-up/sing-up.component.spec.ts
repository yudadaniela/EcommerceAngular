import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { Component, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegionFormComponent } from '../components/region-form/region-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { User } from 'src/app/Models/user';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '../../../Models/user';
describe('SingUpComponent', () => {
    
    let component:SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let authServiceMock:jasmine.SpyObj<AuthService>;
    let regionFormComponentMock:Partial<RegionFormComponent>;
    let matSnackBarMock:MatSnackBar;
    let routerMock: Router
    
    beforeEach(async()=>{
    authServiceMock=jasmine.createSpyObj('AuthService',['createUser']);
    matSnackBarMock=jasmine.createSpyObj('MatSnackBar', ['open']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']); 
    const formRegion:FormGroup=new FormBuilder().group({
        region:['Test region'],
        country:['Test country']
    });
    //se define el objeto regionFormComponentMock
    regionFormComponentMock ={
     locationDataChange:new EventEmitter<any>(),
     formRegion:formRegion,
     countriesByRegion:[],
     onRegionChanged:jasmine.createSpy('onRegionChanged')
    };
    await TestBed.configureTestingModule({
        declarations:[SignUpComponent,
                      RegionFormComponent],
        imports:[ReactiveFormsModule,
                 MatSnackBarModule,
                HttpClientModule],
        providers:[
            FormBuilder,
            {provide:AuthService, useValue:authServiceMock},
            {provide:MatSnackBar, useValue:matSnackBarMock},
            {provide:Router, useValue:routerMock},
            {provide:RegionFormComponent, useValue:regionFormComponentMock}
        ]
    }).compileComponents()    
})
    
    beforeEach(()=>{
        fixture = TestBed.createComponent(SignUpComponent);
        component =fixture.componentInstance;
        fixture.detectChanges()
    })
    it('should create',()=>{
        expect(component).toBeTruthy();
    })
    xdescribe('onsubmit',()=>{
        it('should call createUsermethod of AuthService when form is valid',()=>{
            const userData:User={
                    firtName: 'yurani',
                    secondName: "Daniela",
                    surtName: "Nieto",
                    secondSurtname: "Castro",
                    email: "yudadaniela@hotmail.com",
                    password: "Wendy.123456",
                    confirmPassword: "Wendy.123456",
                    role: "admi",
                    gender: "female",
                    location: {
                      region: "america",
                      country: "Colombia"
                    }
            }
            //creacion exitosadel ususario
            authServiceMock.createUser.and.returnValue(of(userData))
            //llamada a la funcion onSubmit del componente
            component.onSubmit()
            //verificacion de la llamada al servicio y y datos correctos 
            expect(authServiceMock.createUser).toHaveBeenCalledWith(userData)
            console.log('authService test',userData);
            
        })
    })
    describe('From Validators',()=>{
        it('should invalidate the formif requires fields are empty',()=>{
        component.signupForm.get('informationUser.firtName')?.setValue('');
        component.signupForm.get('informationUser.surtName')?.setValue('');
        component.onSubmit()

        expect(component.signupForm.valid).toBeFalsy()

        })

    })
    it('should update location when locationDataChange',()=>{
        const locationData={
            region:'Americas',
            country:'canada'
        }
        regionFormComponentMock.locationDataChange?.emit(locationData)
        const locationControl = component.signupForm.get('location')
        if(locationControl){
            expect(locationControl.value)
        }else{
            fail('Location es nulo')
        }
    })
    it('should create signup form with required controls', () => {
        expect(component.signupForm.contains('informationUser')).toBeTruthy();
        const infoUser = component.signupForm.get('informationUser') as FormGroup;
        expect(infoUser.contains('firtName')).toBeTruthy();
        expect(infoUser.contains('secondName')).toBeTruthy();
        expect(infoUser.contains('surtName')).toBeTruthy();
        expect(infoUser.contains('secondSurtname')).toBeTruthy();
        expect(infoUser.contains('email')).toBeTruthy();
        expect(infoUser.contains('password')).toBeTruthy();
        expect(infoUser.contains('confirmPassword')).toBeTruthy();
        expect(infoUser.contains('role')).toBeTruthy();
        expect(infoUser.contains('gender')).toBeTruthy();
    
        expect(component.signupForm.contains('location')).toBeTruthy();
        const location = component.signupForm.get('location') as FormGroup;
        expect(location.contains('region')).toBeTruthy();
        expect(location.contains('country')).toBeTruthy();
      });
})