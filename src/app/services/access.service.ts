import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, User } from '../interfaces/interface';
import { Observable } from 'rxjs';

/**
 * AccessService
 * Este servicio es el encargado de gestionar todas las peticiones para el acceso de usuarios, es decir, tanto de login como de registro
 */
@Injectable({
  providedIn: 'root',
})
export class AccessService {
  private urlBase: string = environment.urlBase; //url a la que hacer las peticiones

  constructor(private httpClient: HttpClient, public router: Router) {}

  /**
   * Este método es al que se llama cuando se hace login.
   * Hace una petición POST a la url de la api con el email y el password del usuario
   * @param email
   * @param password
   * @returns  token del usuario que inicia sesión (access_token)
   */
  login(email: string, password: string) {
    const url = `${this.urlBase}/auth/login`;
    const body = {
      email: email,
      password: password,
    };

    return this.httpClient.post<AuthResponse>(url, body);
  }

  /**
   * Este método es al que se llama cuando se registra a un usuario.
   * Hace una petición POST a la url de la api, pasándole un usuario por parámetro
   * @param user
   * @returns token del usuario que inicia sesión (access_token)
   */
  register(user: User) {
    const url = `${this.urlBase}/auth/register`; //la url de la api para registrar a un usuario
    const body = user; //es el usuario que se ha obtenido al rellenar todos los campos del formulario de registro

    const opcionHeader = new HttpHeaders(); //las cabeceras necesarias para hacer la petición
    opcionHeader.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.post<AuthResponse>(url, body, {
      headers: opcionHeader,
    });
  }

  /**
   * Este método sirve para obtener un usuario a través del token
   * @returns usuario al que pertenece el token
   */
  getUsuario() {
    const url = `${this.urlBase}/user`; //la url de la api que contiene a los usuarios
    let token = this.getToken(); //recupero el token

    const headers = new HttpHeaders({
      //cabeceras necesarias para hacer la petición de tipo get pasando el token
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = {
      headers: headers,
    };

    return this.httpClient.get<any>(url, options); //hago una petición al GetMapping /user del UserController que me devuelve un usuario
  }

  /**
   * Este método es al que se llama para cerrar la sesión del usuario.
   * Elimina el token  y todo lo almacenado del localStorage y te devuelve a la página de inicio
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  /**
   * Este método sirve para recuperar el token almacenado en el localStorage
   * @returns token almacenado en el localStorage
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Este método es consultado cada vez que un usuario hace login, porque el guardián interviene para dar acceso al Área de Foodies
   * @returns
   */
  validarToken(): Observable<AuthResponse> {
    const url = `${this.urlBase}/login`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );

    return this.httpClient.get<AuthResponse>(url, { headers });
  }

  deleteNotification(id: number) {
    let token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/users/notifications/${id}`;
    return this.httpClient.delete<any>(url, { headers });
  }
}
