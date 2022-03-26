import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FileDB, Recipe, User } from '../interfaces/interface';
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
   * El administrador accede a este método para obtener todas las recetas que
   * están pendientes de aprobación
   * A través de una petición GET a /admin/recipes?isPending=true
   * @returns listado de recetas pendientes de aprobación
   */
  getAllRecipesPending() {
    let token = this.accessService.getToken();

    const params = new HttpParams().set('isPending', true);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/admin/recipes?${params}`;

    return this.httpClient.get<Recipe[]>(url, { headers });
  }

  /**
   * El administrador accede a este método para obtener todas las recetas que
   * que ya han sido aprobadas
   * A través de una petición GET a /admin/recipes?isPending=false
   * @returns listado de recetas que ya han sido aprobadas
   */
  getAllRecipesApproved() {
    let token = this.accessService.getToken();

    const params = new HttpParams().set('isPending', false);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/admin/recipes?${params}`;

    return this.httpClient.get<Recipe[]>(url, { headers });
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

  changeStatusRecipe(id: number) {
    let token = this.accessService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.urlBase}/admin/recipes/${id}`;
    return this.httpClient.get<Recipe>(url, { headers });
  }
}
