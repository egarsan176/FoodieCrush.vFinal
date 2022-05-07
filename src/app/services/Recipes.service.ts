import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FileDB, Recipe, RecipeComment, User } from '../interfaces/interface';
import { AccessService } from './access.service';
/**
 * RecipesService
 * Este servicio gestiona todas las tareas que tienen que ver con las recetas.
 * Todas las peticiones a /recipes, necesitan tener el token
 * Todas las peticiones a /admin, necesitan token y rol de administrador
 */
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private urlBase: string = environment.urlBase; //url a la que hacer las peticiones

  constructor(
    private httpClient: HttpClient,
    public router: Router,
    private accessService: AccessService
  ) {}

  /////////////////////RECETAS

  /**
   * A este método se accede cuando se quiere publicar una receta.
   * Se hace una petición POST a /recipes pasandole la receta del formulario
   * @param recipe que hemos obtenido en el formulario
   * @returns la receta que acabamos de almacenar en la bbdd
   */
  publicar(recipe: Recipe) {
    let token = this.accessService.getToken();

    const url = `${this.urlBase}/recipes`;
    const body = recipe;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post<Recipe>(url, body, { headers });
  }

  /**
   * Este método sirve para que un usuario pueda conocer todas las recetas
   * que ha publicado en la bbdd. Se hace una petición GET a /recipes pasando por
   * parámetros el usuario que está logueado en ese momento
   * http://localhost:9000/recipes?userID=1
   * @param user que se encuentra en la sesión en el momento de la petición
   * @returns lista con todas las recetas del usuario
   */
  getRecipesFromUser(user: User) {
    let token = this.accessService.getToken();

    const params = new HttpParams().set('userID', user.id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/recipes?${params}`;

    return this.httpClient.get<Recipe[]>(url, { headers });
  }

  /**
   * A este método se accede para conocer las recetas que se incluyen en
   * una categoría determinada y que ya han sido aprobadas por el administrador.
   * A través de una petición GET a /mostrar.
   * @param id de la categoría cuyas recetas quieres obtener
   * @returns listado de todas las recetas que pertenecen a la categoría que
   * coincide el id pasado por parámetro
   */
  getRecipesByCategory(id: number) {
    const params = new HttpParams().set('categoryID', id);
    const url = `${this.urlBase}/mostrar?${params}`;

    return this.httpClient.get<Recipe[]>(url);
  }

  /**
   * A este método se accede cuando se quiere conocer una receta en concreto.
   * A través de una petición GET a /mostrar/{id}
   * @param id de la receta que queremos obtener
   * @returns receta que coincide con ese id o exception si no existe
   */
  showRecipe(id: number) {
    const url = `${this.urlBase}/mostrar/${id}`;

    return this.httpClient.get<Recipe>(url);
  }

  /**
   * A este método se accede para conocer al autor de una receta.
   * A través de una petición GET a /mostrar/recipe/{id}
   * @param id de la receta de la que quieres saber su autor
   * @returns el usuario que está asociado a esa receta
   */
  getUserByRecipe(id: number) {
    const url = `${this.urlBase}/mostrar/recipe/${id}`;
    return this.httpClient.get<User>(url);
  }

  /**
   * A este método se accede para conocer el nombre de una categoría
   * A través de una petición GET a /category/{id}
   * @param id de la categoría de la que queremos saber su nombre
   * @returns nombre de la categoría que coincide con ese id
   */
  getCategory(id: number) {
    const url = `${this.urlBase}/category/${id}`;
    return this.httpClient.get<string>(url);
  }

  /**
   * A este método se accede para mostrar una imagen en la vista,
   * transformando el array de bits del fichero que recibe
   * @param file
   * @returns vista del fichero que queremos mostrar
   */
  getImage(file: FileDB) {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(file.data))
    );
    const source = `data:image/png;base64,${base64String}` + file.data;
    return source;
  }

  /**
   * Se accede a este método para obtener todas las recetas de la bbdd,
   * independientemente de su estado
   * A través de una petición GET, que necesita de token
   * @returns lista con todas las recetas almacenadas
   */
  getAllRecipes() {
    let token = this.accessService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/recipes`;

    return this.httpClient.get<Recipe[]>(url, { headers });
  }

  /**
   * A este método se accede cuando se quiere eliminar una receta de la bd
   * @param id
   * @returns noContent
   */
  deleteRecipe(id: number) {
    let token = this.accessService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/recipes/${id}`;
    return this.httpClient.delete<any>(url, { headers });
  }

  /////////////////////COMENTARIOS

  /**
   * A este método se accede para publicar un comentario en una receta
   * @param id
   * @param comment
   * @returns texxto del mensaje del comentario
   */
  addCommentToRecipe(id: number, comment: RecipeComment) {
    let token = this.accessService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const body = comment;

    const url = `${this.urlBase}/recipes/${id}/comments`;
    return this.httpClient.post<any>(url, body, { headers });
  }

  /**
   * Este método obtiene todos los comentarios aprobados de una receta en concreto
   * @param id recipe
   * @returns lista de comentarios que ya han sido aprobados por el admin
   */
  getCommentsNotPendingFromRecipe(id: number) {
    const url = `${this.urlBase}/mostrar/recipe/${id}/comments`;
    //pongo any porque la clase Comment del back me devuelve más cosas que la clase Comment del front
    return this.httpClient.get<any[]>(url);
  }

  /**
   * A este método se accede cuando se quiere eliminar un comentario de la bd
   * @param id
   * @returns noContent
   */
  deleteComment(id: number) {
    let token = this.accessService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/recipes/comments/${id}`;
    return this.httpClient.delete<any>(url, { headers });
  }

  /////////////////////BUSCADOR

  getRecipeByName(recipeName: string) {
    const params = new HttpParams().set('recipeName', recipeName);
    const url = `${this.urlBase}/mostrar/recipes/name?${params}`;

    return this.httpClient.get<Recipe[]>(url);
  }

  getRecipeBySimilarName(recipeName: string) {
    const params = new HttpParams().set('recipeName', recipeName);
    const url = `${this.urlBase}/mostrar/recipes/similar?${params}`;

    return this.httpClient.get<Recipe[]>(url);
  }
}
