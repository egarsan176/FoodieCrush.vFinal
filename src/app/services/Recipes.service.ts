import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FileDB, Recipe, User } from '../interfaces/interface';
import { AccessService } from './access.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  //url a la que hacer la petición
  private urlBase: string = environment.urlBase;

  constructor(
    private httpClient: HttpClient,
    public router: Router,
    private accessService: AccessService
  ) {}

  //MÉTODO que hace una petición POST a /recipes, pasándole el token y el objeto recipe y alamacena la receta en la bbdd
  publicar(recipe: Recipe) {
    let token = this.accessService.getToken(); //localStorage.getItem('token');  recupero el token

    const url = `${this.urlBase}/recipes`;
    const body = recipe; //es la receta que se obtiene al rellenar el formulario de /publicar

    const headers = new HttpHeaders({
      //cabeceras necesarias para hacer la petición de tipo get y pasarle el token
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post<Recipe>(url, body, { headers });
  }

  //MÉTODO que hace una petción GET a /recipes, pasándole por parámetros el usuario que está logueado en ese momento
  //te devuelve todas las recetas de ese usuario
  //http://localhost:9000/recipes?userID=1
  getRecipes() {
    let token = localStorage.getItem('token'); //recupero el token
    let user = JSON.parse(<string>localStorage.getItem('user'));

    const params = new HttpParams().set('userID', user.id);

    const headers = new HttpHeaders({
      //cabeceras necesarias para hacer la petición de tipo get y pasarle el token
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.urlBase}/recipes?${params}`;

    return this.httpClient.get<any[]>(url, { headers });
  }

  //MÉTODO que hace una petición GET a /mostrar y le pasa por parámetros el id de la categoría que quieres consultar
  //devuelve una lista con todas las recetas que pertenecen a la categoría que coincide con ese id
  getRecipesByCategory(id: number) {
    const params = new HttpParams().set('categoryID', id);
    const url = `${this.urlBase}/mostrar?${params}`;

    return this.httpClient.get<any[]>(url);
  }

  //MÉTODO que hace una petición GET a /mostrar/{id} y te devuelve una receta en concreto a través de su id
  showRecipe(id: number) {
    const url = `${this.urlBase}/mostrar/${id}`;

    return this.httpClient.get<any>(url);
  }

  //MÉTODO que hace una petición GET a /mostrar/recipe/{id} y te devuelve el usuario que está asociado a la receta cuyo id es el que se le pasa
  getUserByRecipe(id: number) {
    const url = `${this.urlBase}/mostrar/recipe/${id}`;
    return this.httpClient.get<User>(url);
  }

  //MÉTODO que hace una petición GET a /category/{id} y te da el nombre de la categoría que corresponde con el id que se le pasa
  getCategory(id: number) {
    const url = `${this.urlBase}/category/${id}`;
    return this.httpClient.get<string>(url);
  }

  //MÉTODO que recibe un fichero y transforma su array de bits para poder visualizar la imagen
  obtenerImagen(file: FileDB) {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(file.data))
    );
    const source = `data:image/png;base64,${base64String}` + file.data;
    return source;
  }
}
