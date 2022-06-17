import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Ingredient, UserBACK } from '../interfaces/interface';
import { AccessService } from './access.service';
/**
 * AdminService
 * Este servicio gestiona todas las peticiones que tienen que ver con la gestión de tareas  del administrador
 * Necesita token y que el rol del usuario sea ADMIN
 */
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private urlBase: string = environment.urlBase; //url a la que hacer las peticiones

  constructor(
    private httpClient: HttpClient,
    public router: Router,
    private accessService: AccessService
  ) {}

  ////////////////////////////////////RECETAS
  /**
   * MÉTODO que hace una petición GET a /admin/recipes para obtener el listado de recetas
   * que NO han sido aprobadas por el administrador
   * @returns listado de recetas pendientes de aprobación
   */
  getRecipesPending() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'true');

    const url = `${this.urlBase}/admin/recipes?${params}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any[]>(url, { headers });
  }

  /**
   * MÉTODO que hace una petición GET a /admin/recipes para obtener el listado de recetas
   * que SÍ han sido aprobadas por el administrador
   * @returns listado de recetas aprobadas
   */
  getRecipesNotPending() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'false');

    const url = `${this.urlBase}/admin/recipes?${params}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any[]>(url, { headers });
  }

  /**
   * Se accede a este método cuando un administrador quiere
   * cambiar el estado de una receta de pendiente a no pendiente
   * @param id  de la receta
   * @returns receta con el estado cambiado
   */
  changeStatusRecipe(id: number) {
    let token = this.accessService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/recipes/${id}`;
    return this.httpClient.get<any>(url, { headers });
  }

  ////////////////////////////COMENTARIOS
  /**
   * El administrador accede a este método para cambiar el estado pendiente de un comentario a no pendiente
   * @param idRecipe
   * @param idComment
   * @returns comentario aprobado por el admin
   */
  changeStatusComment(idComment: number) {
    let token = this.accessService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/admin/recipes/comments/${idComment}`;
    //pongo any porque la clase Comment del back me devuelve más cosas que la clase Comment del front
    return this.httpClient.get<any>(url, { headers });
  }

  /**
   * Este método obtiene todos los comentarios pendientes (no aprobados por el admin) de una receta en concreto
   * @returns lista de comentarios que no han sido aprobados por el admin
   */
  getCommentsPending() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'true');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/recipes/comments?${params}`;
    //pongo any porque la clase Comment del back me devuelve más cosas que la clase Comment del front
    return this.httpClient.get<any[]>(url, { headers });
  }

  /**
   * Este método obtiene todos los comentarios aprobados de una receta en concreto
   * @returns lista de comentarios que aprobados por el admin
   */
  getCommentsApproved() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'false');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/recipes/comments?${params}`;
    //pongo any porque la clase Comment del back me devuelve más cosas que la clase Comment del front
    return this.httpClient.get<any[]>(url, { headers });
  }

  /**
   * Este método obtiene todsos los comentarios almacenados en la base de datos
   * @returns  lista de comentarios
   */
  getAllCommentsFromBD() {
    let token = this.accessService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/recipes/comments`;
    return this.httpClient.get<any[]>(url, { headers });
  }

  ////////////////////////////////////USUARIOS

  /**
   * Este método obtiene una lista de todos los usuarios almacenados en la base de datos
   * @returns lista de usuarios
   */
  getAllUsersFromBD() {
    let token = this.accessService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/admin/users`;
    return this.httpClient.get<UserBACK[]>(url, { headers });
  }

  /**
   * Este método sirve para eliminar a un usuario de la base de datos
   * @param id
   * @returns  noContent
   */
  deleteUser(id: number) {
    let token = this.accessService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/users/${id}`;
    return this.httpClient.delete<any>(url, { headers });
  }

  ////////////////////////////////////INGREDIENTES

  /**
   * Este método obtiene todos los ingredientes pendientes (no aprobados por el admin)
   * @returns lista de ingredientes pendientes (estado is_pending = true)
   */
  getIngredientsPending() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'true');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/ingredients?${params}`;
    return this.httpClient.get<Ingredient[]>(url, { headers });
  }

  /**
   * Este método obtiene todos los ingredientes aprobados (aprobados por el admin)
   * @returns lista de ingredientes pendientes (estado is_pending = false)
   */
  getIngredientsApproved() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'false');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/ingredients?${params}`;
    return this.httpClient.get<Ingredient[]>(url, { headers });
  }

  /**
   * Este método obtiene todos los ingredientes existentes en la base de datos
   * @returns lista de todos los ingredientes de la base de datos
   */
  getAllIngredients() {
    let token = this.accessService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/ingredients`;
    return this.httpClient.get<Ingredient[]>(url, { headers });
  }

  /**
   * Este método sirve para cambiar el estado pendiente de un ingrediente.
   * @param id
   * @returns ingrediente
   */
  changeStatusIngredient(id: number) {
    let token = this.accessService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/ingredients/${id}`;

    return this.httpClient.get<Ingredient>(url, { headers });
  }
}
