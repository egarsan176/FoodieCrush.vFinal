import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * RecipesConfComponent
 * Este componente es el que se encarga de gestionar las recetas que se publican.
 * El administrador puede ver las recetas pendientes de aprobación y gestionarlas
 *
 */
@Component({
  selector: 'app-recipes-conf',
  templateUrl: './recipes-conf.component.html',
  styleUrls: ['./recipes-conf.component.css'],
})
export class RecipesConfComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  recipesPending: Recipe[] = [];
  recipesApproved: Recipe[] = [];
  allRecipesBD: Recipe[] = [];
  first = 0;
  rows = 10;
  showRecipesPending: boolean = false;
  showRecipesApproved: boolean = false;
  showRecipes: boolean = false;
  addNewRecipe: boolean = false;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {}

  /**
   * El administrador accede a este método para conocer todas las recetas
   * pendientes de aprobación a través de una subcripción al servicio
   * recipesService. Si la respuesta es éxitosa, la propiedad recipesPending del componente
   * se iguala a la respuesta de la petición
   */
  getRecipesPending() {
    this.recipesService.getAllRecipesPending().subscribe({
      next: (data) => {
        this.showRecipesApproved = false;
        this.showRecipes = false;
        this.addNewRecipe = false;

        this.recipesPending = data;
        this.showRecipesPending = true;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  changeStatusRecipe(id: number) {
    this.recipesService.changeStatusRecipe(id).subscribe({
      next: (data) => {
        this.getRecipesPending();
        Swal.fire({
          title: 'Cambio de Estado Satisfactorio',
          text: 'La receta con id  ' + data.id + ' ha sido aprobada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * El administrador accede a este método para conocer todas las recetas
   * que ya se han aprobado a través de una subcripción al servicio
   * recipesService. Si la respuesta es éxitosa, la propiedad recipesApproved del componente
   * se iguala a la respuesta de la petición
   */
  getRecipesApproved() {
    this.recipesService.getAllRecipesApproved().subscribe({
      next: (data) => {
        this.showRecipesPending = false;
        this.showRecipes = false;
        this.addNewRecipe = false;

        this.recipesApproved = data;
        this.showRecipesApproved = true;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * El administrador accede a este método para conocer todas las recetas
   * almacenadas en la bbdd independientemente de su estado,
   * a través de una subcripción al servicio recipesService.
   * Si la respuesta es éxitosa, la propiedad recipesApproved del componente
   * se iguala a la respuesta de la petición
   */
  getAllRecipesFromBD() {
    this.recipesService.getAllRecipes().subscribe({
      next: (data) => {
        this.showRecipesPending = false;
        this.showRecipesApproved = false;
        this.addNewRecipe = false;

        this.allRecipesBD = data;
        this.showRecipes = true;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para obtener el estado de una receta (aprobada por el admin o no)
   * Si la propiedad recipe.pending = true, la receta está pendiente de aprobación,
   * si es false, está aprobada por el admin
   * @param recipe
   * @returns estado de la receta (pendiente/aprobada)
   */
  getStatus(recipe: Recipe) {
    return recipe.pending ? 'pendiente' : 'aprobada';
  }

  loadUploadForm() {
    this.showRecipes = false;
    this.showRecipesApproved = false;
    this.showRecipesPending = false;
    this.addNewRecipe = true;
  }

  /**
   * Método para volver a la página anterior en la vista
   */
  back() {
    history.back();
  }
}