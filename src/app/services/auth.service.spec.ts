import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../Models/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock:HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports :[HttpClientTestingModule],
      providers:[AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should be login with correct credential', () => {
    const email = 'test@gmail.com';
    const password = '123456'
    service.login('test@gmail.com', '123456').subscribe(isLogged =>{
      expect(isLogged).toBeTrue()
      expect(service.isAuthentication()).toBeTrue()
    })
    const req = httpMock.expectOne('http://localhost:3000/users')
    expect(req.request.method).toEqual('GET')
    req.flush([{email:'test@gmail.com', password:'123456'}])
  });

  it('should be true in ifAuthentication', () => {
    const email = 'test@gmail.com';
    const password = '123456'
    service.login('test@gmail.com', '123456').subscribe(isLogged =>{
      expect(service.isAuthentication()).toBeTrue()
    })

    const req = httpMock.expectOne('http://localhost:3000/users')
    expect(req.request.method).toEqual('GET')
    req.flush([{email:'test@gmail.com', password:'123456'}])
  });
  it('should logout successfully ', () => {
    const email = 'test@gmail.com';
    const password = '123456'
    service.login('test@gmail.com', '123456').subscribe(isLogged =>{
      expect(service.isAuthentication()).toBeTrue()
    })
    service.logout()
    expect(service.isAuthentication()).toBeFalse()
    const req = httpMock.expectOne('http://localhost:3000/users')
    expect(req.request.method).toEqual('GET')
    req.flush([{email:'test@gmail.com', password:'123456'}])
  });
  it('should create a new user', () => {
    const NEWUSER:User={
      "firtName": "yurani",
      "secondName": "Daniela",
      "surtName": "Nieto",
      "secondSurtname": "Castro",
      "email": "yudadaniela@hotmail.com",
      "password": "Wendy.123456",
      "confirmPassword": "Wendy.123456",
      "role": "admi",
      "gender": "female",
      "location": {
        "region": "america",
        "country": "Colombia"
      },
    };
    service.createUser(NEWUSER).subscribe(createdUser =>{
      expect(createdUser).toEqual(NEWUSER)
    })
  
    const req = httpMock.expectOne('http://localhost:3000/users')
    expect(req.request.method).toEqual('POST')
    expect(req.request.body).toEqual(NEWUSER)
    req.flush(NEWUSER)
  });
  it('should get the users', () => {
    const NEWUSER:User[]=[
      {
      "firtName": "yurani",
      "surtName": "Nieto",
      "email": "yudadaniela@hotmail.com",
      "password": "Wendy.123456",
      "confirmPassword": "Wendy.123456",
      "role": "admi",
      "gender": "female",
      "location": {
        "region": "america",
        "country": "Colombia"
      }
    },
    {
        "firtName": "bibian",
        "secondName": "andrea",
        "surtName": "Castro",
        "secondSurtname": "Prieto",
        "email": "biancaspri@hotmail.com",
        "password": "Wendy.123456",
        "confirmPassword": "Wendy.123456",
        "role": "user",
        "gender": "female",
        "location": {
          "region": "america",
          "country": "Colombia"
        }
      }
    ]
    
    service.getUsers().subscribe(users =>{
      expect(users).toEqual(NEWUSER)
    })
  
    const req = httpMock.expectOne('http://localhost:3000/users')
    expect(req.request.method).toEqual('GET')
    req.flush(NEWUSER)
  });
});
