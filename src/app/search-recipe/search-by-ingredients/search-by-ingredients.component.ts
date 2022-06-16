import { Component, OnInit } from '@angular/core';
import { FileDB, Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componenete SearchByIngredients
 * Este componente muestra el buscador de recetas por ingredientes
 */
@Component({
  selector: 'app-search-by-ingredients',
  templateUrl: './search-by-ingredients.component.html',
  styleUrls: ['./search-by-ingredients.component.css'],
})
export class SearchByIngredientsComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  search: string = '';

  recipes: Recipe[] = [];
  pending!: boolean;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {}

  /**
   * Este método a través del servicio RecipeService nos devuelve la imagen asociada a un fichero para
   * poder visualizarla en la vista
   * @param file
   * @returns la imagen de una receta que se proporciona en la vista
   */
  obtenerImagenReceta(file: FileDB) {
    return this.recipeService.getImage(file);
  }

  /**
   * Método para obtener las recetas que contienen todos los ingredientes que se introducen en el input search.
   * A través de una suscripción al recipeService, si ésta tiene éxito se iguala la variable recipes[] a la respuesta de la petición
   * @param search
   */
  getRecipe(search: string) {
    this.pending = true;
    let listIngredients: string[] = search.split(',');

    this.recipeService
      .getRecipesFromIngredients(JSON.parse(JSON.stringify(listIngredients)))
      .subscribe({
        next: (data) => {
          this.recipes = data;
          this.pending = false;
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
  }
}
