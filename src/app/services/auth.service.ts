import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private token: string = '';
  private users: User[] | any = [];
  private isLoggedIn: boolean = false;
  private currentUser: User | null = null;
  constructor(private http: HttpClient) {}
  /**
   *
   * @returns return fake token
   */
  private tokenGenerate() {
    let random1 = Math.random().toString(36).substring(2);
    let random2 = Math.random().toString(36).substring(2);
    let random3 = Math.random().toString(36).substring(2);
    console.log(random1 + random2 + random3);
    return (this.token = random1 + random2 + random3);
  }
  /**
   * save a fake token in localstore
   */
  private setAccesToken() {
    localStorage.setItem('access_token', this.tokenGenerate());
  }
  /**
   *
   * @returns return the fake token
   */
  private getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  /**
   *
   * @param user it's a object of type User of new user
   * @returns post request to the API, save the new user
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  /**
   *
   * @returns Return the array the users form data
   */
  getUsers(): Observable<User[]> {
    this.users = this.http.get(this.apiUrl);
    console.log(this.users);
    return this.http.get<User[]>(this.apiUrl);
  }
  /**
   *
   * @param email data entered by the user
   * @returns Observablethat emit true if email is unique, false if email exist
   */
  isEmailUnique(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) => users.every((user) => user.email !== email))
    );
  }
  /**
   *
   * @param email data entered by the user
   * @param password data entared by the user
   * @returns verify that the password and email are in data base and return Observable boolean true
   */
  login(email: string, password: string): Observable<boolean> {
    return this.getUsers()
      .pipe(
        map((users: any[]) => {
          console.log('usuarios recibidos', users);

          const user = users.find((e: any) => {
            return e.email === email && e.password === password;
          });
          console.log('usuario encontrado', user);
          if (user) {
            this.isLoggedIn = true;
            this.currentUser = user;
            this.setAccesToken();
            console.log('se hizo login', this.getAccessToken());
          }
          return this.isLoggedIn;
        })
      )
      .pipe(
        catchError((error) => {
          console.log('error durante la ejecucion', error);

          return throwError(() => {
            error;
          });
        })
      );
  }
  /**
   *
   * @returns return boleean true when the localStorage have fake token
   */
  ifAuthentication(): boolean {
    const token = this.getAccessToken();
    console.log(!!token);
    return !!token;
  }
  /**
   * remove the token fake in localStorage, and change the valor the others parameters (isLoggedIn,
   currentUser )
   */
  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('access_token');
    console.log('remove', this.getAccessToken());
  }
  /**
   *
   * @returns Return the object the user the type User
   */
  getUser() {
    return this.currentUser;
  }
  isAdmi(): boolean | null {
    const user = this.getUser();
    return user && user.role === 'admi';
  }
  isUser(): boolean | null {
    const user = this.getUser();
    return user && user.role === 'user';
  }
}
