import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
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

  showRecipesPending: boolean = false;
  showRecipesApproved: boolean = false;
  showRecipes: boolean = false;
  addNewRecipe: boolean = false;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {}

  /**
   * A este método accede el administrador cuando quiere publicar
   * una nueva receta y se cambian el valor de las propiedades del componente
   * para que se muestre el formulario de publicar la receta
   */
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
