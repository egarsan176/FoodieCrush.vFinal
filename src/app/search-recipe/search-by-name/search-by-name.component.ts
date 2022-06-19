import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  nameInput: string = '';
  show: boolean = false;
  pending!: boolean;
  showRecipeNameInput: string = '';
  recipes1: Recipe[] = [];
  recipes2: Recipe[] = [];

  constructor(private recipeService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    let option = localStorage.getItem('busqueda');
    if (option != null) {
      this.getRecipe(option);
    }
  }

  /**
   * Este método obtiene las recetas que coinciden con el nombre que el usuario introduce en el input
   * A través de dos peticiones al servicio recipeService, obtiene las recetas cuyo nombre es igual
   * al introducido en el input y las recetas cuyo nombre contiene parte de texto introducido en el input
   * La respuesta de la petición se almacena en las variables recipe1 (coincidencia nombre exacto) y
   * recipes2 (nombre similar al introducido)
   * @param name
   */
  getRecipe(name: string) {
    this.pending = true;
    if (name != null) {
      this.show = true;
      this.recipeService.getRecipeByName(name.toUpperCase()).subscribe({
        next: (data) => {
          this.recipes1 = data;
          this.nameInput = name.toUpperCase();
          this.showRecipeNameInput = this.nameInput;
          this.pending = false;
          //console.log(this.recipes1);
          localStorage.setItem('busqueda', this.nameInput);
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
          this.pending = false;
        },
      });

      this.recipeService.getRecipeBySimilarName(name.toUpperCase()).subscribe({
        next: (data) => {
          this.recipes2 = data;
          //console.log(this.recipes2);
          this.pending = false;
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
          this.pending = false;
        },
      });
    } else {
      this.pending = false;
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
