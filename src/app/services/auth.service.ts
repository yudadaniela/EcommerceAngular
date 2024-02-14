import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:3000/users';
  private token:string=''
  private users:any=[]
  private isLoggedIn: boolean = false;
  private currentUser: User | null = null;
  constructor(
    private http:HttpClient
  ) { }
  private tokenGenerate() {
    let random1= Math.random().toString(36).substring(2)
    let random2= Math.random().toString(36).substring(2)
    let random3= Math.random().toString(36).substring(2)
    console.log(random1+random2+random3);
    return this.token= random1+random2+random3;
    
  }
  private setAccesToken(){
    localStorage.setItem('access_token', this.tokenGenerate())
  }
  private getAccessToken():string | null {
    return localStorage.getItem('access_token')
  }
  createUser(user:User):Observable<User>{
   return this.http.post<User>(this.apiUrl, user)
   
  }
  getUsers():Observable<User[]>{
    this.users = this.http.get(this.apiUrl)
    console.log(this.users);
    return this.http.get<User[]>(this.apiUrl)
    
  }
  login(email:string, password:string): Observable<boolean>{
   return this.getUsers().pipe(
    map((users:any[])=>{
      console.log("usuarios recibidos", users);
      
      const user =users.find((e: any)=>{
      return e.email===email && e.password===password})
      console.log("usuario encontrado", user);
      if(user){
        this.isLoggedIn=true;
        this.currentUser=user;
        this.setAccesToken()
        console.log('se hizo login', this.getAccessToken());
        
      }
      return this.isLoggedIn
    })
   ).pipe(catchError((error)=>{
    console.log("error durante la ejecucion", error);
    
    return throwError(()=>{error})
   }))
  }
  
  ifAuthentication(): boolean{
    
    const token = this.getAccessToken();
    return !!token;
  }
  logout(){
   this. isLoggedIn = false;
   this.currentUser = null;
   localStorage.removeItem('access_token');
   console.log('remove', this.getAccessToken()); 
  }
  getUser(){
    return this.currentUser
  }
  isAdmi():boolean | null{
    const user = this.getUser()
    return user && user.role==='admi' 
  }
  isUser():boolean | null{
    const user = this.getUser()
    return user && user.role==='user' 
  }

  
}
