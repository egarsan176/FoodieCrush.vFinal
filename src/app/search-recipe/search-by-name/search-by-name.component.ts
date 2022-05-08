import { Component, OnInit } from '@angular/core';
import { FileDB, Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';

/**
 * Componente SearchByName
 * Este componente nos permite buscar una receta a través de su nombre
 */
@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css'],
})
export class SearchByNameComponent implements OnInit {
  /**
   * PROPIEDADES
   */

  name!: string;
  show: boolean = false;

  recipes1: Recipe[] = [];
  recipes2: Recipe[] = [];

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {}

  /**
   * Este método obtiene las recetas que coinciden con el nombre que el usuario introduce en el input
   * A través de dos peticiones al servicio recipeService, obtiene las recetas cuyo nombre es igual
   * al introducido en el input y las recetas cuyo nombre contiene parte de texto introducido en el input
   * La respuesta de la petición se almacena en las variables recipe1 (coincidencia nombre exacto) y
   * recipes2 (nombre similar al introducido)
   * @param name
   */
  getRecipe(name: string) {
    if (name != null) {
      this.show = true;
      this.recipeService.getRecipeByName(name).subscribe({
        next: (data) => {
          this.recipes1 = data;
          //console.log(this.recipes1);
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });

      this.recipeService.getRecipeBySimilarName(name).subscribe({
        next: (data) => {
          this.recipes2 = data;
          //console.log(this.recipes2);
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
    } else {
      Swal.fire('Error', 'Recuerda introducir un nombre.', 'error');
    }
  }

  /**
   * Este método a través del servicio RecipeService nos devuelve la imagen asociada a un fichero para
   * poder visualizarla en la vista
   * @param file
   * @returns la imagen de una receta que se proporciona en la vista
   */
  obtenerImagenReceta(file: FileDB) {
    return this.recipeService.getImage(file);
  }
}