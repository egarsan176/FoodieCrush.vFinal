import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, User } from "../interfaces/interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class AccessService {
  private urlBase: string = environment.urlBase;  //url a la que hacer las peticiones

  //PRUEBA1
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  //PRUEBA2
  // private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject({} as User);
  // public readonly currentUser: Observable<User> = this.currentUserSubject.asObservable();

  //PRUEBA3
  // private _usuario = new BehaviorSubject<User | null>({
  //   email: '',
  //   fullName: '',
  //   password: '',
  //   username: '',
  //   role: ''
  // })
  // private _usuario$ =this._usuario.asObservable(); //$ indica que se trata de un observable

  // setUsuarioSubject(latestValue: User){
  //   return this._usuario.next(latestValue);
  // }

  // getUsuariosubject(): Observable<User | null>{
  //   return this._usuario$;
  // }


  constructor(private httpClient: HttpClient, public router: Router){
    //PRUEBA1
      this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') || '{}'));
      this.user = this.userSubject.asObservable();
  }

  // setCurrentUser(currentUser: User): void { //PRUEBA2
  //   this.currentUserSubject.next(currentUser);
  // }


  public get userValue(): User | null { //PRUEBA1
    return this.userSubject.value;
  }

  //MÉTODO para hacer login que hace una petición POST a la url de la api con  el email y el password
  login(email:string, password:string){

    const url= `${this.urlBase}/auth/login`;
    const body = {
      'email': email,
      'password': password 
    }

    return this.httpClient.post<AuthResponse>(url, body); //devuelve la respuesta de la petición  access_token
   
  }

   //MÉTODO para obtener un usuario a través del token
   getUsuario(){

    const url = `${this.urlBase}/user`; //la url de la api que contiene a los usuarios
    let token = this.getToken(); //recupero el token

    const headers = new HttpHeaders({ //cabeceras necesarias para hacer la petición de tipo get pasando el token
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const options = {
      headers: headers
    }

    return this.httpClient.get<User>(url,options)   //hago una petición al GetMapping /user del UserController que me devuelve un usuario y lo almaceno en el localStorage
    // //  PRUEBA1  
    .subscribe(user =>{
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      });
    //PRUEBA3
    // .subscribe(user =>{
    //   this.setUsuarioSubject(user);
    // })


  }

  //MÉTODO para cerrar sesion y borrar el token del local Storage
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    this.userSubject.next(null);  //PRUEBA1
    //this._usuario.next(null);
    this.router.navigate(['']);
  }

   //MÉTODO para recuperar el token almacenado en el localStorage
  getToken(){
    return localStorage.getItem("token");
  }

  //MÉTODO que comprueba si el token todavía no ha expirado
  //a este método se entra cada vez que se hace login porque el guardian interviene para dar acceso a /publicar
  validarToken():Observable<AuthResponse>{
    const url = `${this.urlBase}/login`; 
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );

    return this.httpClient.get<AuthResponse>( url, { headers } )
  }


  //MÉTODO para registrar un usuario que hace una petición POST a la url de la api pasándole un usuario, devuelve el token de ese usuario
  register(user: User){
    const url = `${this.urlBase}/auth/register`;  //la url de la api para registrar a un usuario
    const body = user;//es el usuario que se ha obtenido al rellenar todos los campos del formulario de registro

     const opcionHeader = new HttpHeaders(); //las cabeceras necesarias para hacer la petición
     opcionHeader.append('Access-Control-Allow-Origin','*');  

    return this.httpClient.post<AuthResponse>(url, body, {headers:opcionHeader});
  }





}