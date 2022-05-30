import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FileDB, Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componenete SearchByIngredients
 * Este componente muestra el buscador de recetas por ingredientes, pudiendo buscar por uno, dos o hasta tres ingredientes
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
  name1!: string;
  name2!: string;
  name3!: string;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  showPic: boolean = false;
  okRecipes1: boolean = false;
  okRecipes2: boolean = false;
  okRecipes3: boolean = false;
  recipes1: Recipe[] = [];
  recipes2: Recipe[] = [];
  recipes3: Recipe[] = [];
  pending!: boolean;
  nameInput: string = '';
  nameInput2: string = '';
  nameInput3: string = '';

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    let option = localStorage.getItem('option');

    if (option === '1') {
      this.show1Input();
      let nameBusqueda = localStorage.getItem('i1');
      if (nameBusqueda != null) {
        this.getRecipeFrom1ingredient(nameBusqueda);
      }
    } else if (option === '2') {
      this.show2Input();
      let nameBusqueda = localStorage.getItem('i1');
      let nameBusqueda2 = localStorage.getItem('i2');
      if (nameBusqueda != null && nameBusqueda2 != null) {
        this.getRecipeFrom2ingredients(nameBusqueda, nameBusqueda2);
      }
    } else if (option === '3') {
      this.show3Input();
      let nameBusqueda = localStorage.getItem('i1');
      let nameBusqueda2 = localStorage.getItem('i2');
      let nameBusqueda3 = localStorage.getItem('i3');
      if (
        nameBusqueda != null &&
        nameBusqueda2 != null &&
        nameBusqueda3 != null
      ) {
        this.getRecipeFrom3ingredients(
          nameBusqueda,
          nameBusqueda2,
          nameBusqueda3
        );
      }
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

  /**
   * MÉTODO PARA QUE SE MUESTRE EL INPUT DE UN INGREDIENTE
   */
  show1Input() {
    this.show1 = true;
    this.show2 = false;
    this.show3 = false;
    this.showPic = false;
    this.name1 = '';
    this.name2 = '';
    this.name3 = '';
  }
  /**
   * MÉTODO PARA QUE SE MUESTRE EL INPUT DE DOS INGREDIENTES
   */
  show2Input() {
    this.show2 = true;
    this.show1 = false;
    this.show3 = false;
    this.showPic = false;
    this.name1 = '';
    this.name2 = '';
    this.name3 = '';
  }
  /**
   * MÉTODO PARA QUE SE MUESTRE EL INPUT DE TRES INGREDIENTES
   */
  show3Input() {
    this.show3 = true;
    this.show2 = false;
    this.show1 = false;
    this.showPic = false;
    this.name1 = '';
    this.name2 = '';
    this.name3 = '';
  }

  /**
   * Metodo para obtener las recetas que contiene un ingrediente en concreto.
   * Se susbcribe al método getRecipesByIngredient() del servicio recipesService
   * e iguala la respuesta a la variable recipes1
   */
  getRecipeFrom1ingredient(name1: string) {
    this.pending = true;
    if (name1 != null) {
      this.recipeService.getRecipesByIngredient(name1).subscribe({
        next: (data) => {
          this.recipes1 = data;
          this.okRecipes1 = true;
          this.okRecipes2 = false;
          this.okRecipes3 = false;
          this.nameInput = name1;
          this.pending = false;

          if (this.recipes1 == null) {
            this.showPic = true;
            this.okRecipes1 = false;
          }
          //console.log(data);
          localStorage.setItem('i1', this.nameInput);
          localStorage.setItem('option', '1');
        },

        error: (e) => {
          this.pending = false;
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
    } else {
      Swal.fire(
        'Error',
        'Recuerda que debes introducir un ingrediente.',
        'error'
      );
    }
  }

  /**
   * Metodo para obtener las recetas que contienen dos ingredientes en concreto.
   * Se susbcribe al método getRecipesByTwoIngredients() del servicio recipesService
   * e iguala la respuesta a la variable recipes2
   */
  getRecipeFrom2ingredients(name1: string, name2: string) {
    this.pending = true;
    if (name1 != null && name2 != null) {
      this.recipeService.getRecipesByTwoIngredients(name1, name2).subscribe({
        next: (data) => {
          this.recipes2 = data;
          this.okRecipes2 = true;
          this.okRecipes1 = false;
          this.okRecipes3 = false;
          this.nameInput = name1;
          this.nameInput2 = name2;
          if (this.recipes2 == null) {
            this.showPic = true;
            this.okRecipes2 = false;
          }
          this.pending = false;
          localStorage.setItem('i1', this.nameInput);
          localStorage.setItem('i2', this.nameInput2);
          localStorage.setItem('option', '2');
        },
        error: (e) => {
          this.pending = false;
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
    } else {
      Swal.fire(
        'Error',
        'Recuerda que debes introducir dos ingredientes.',
        'error'
      );
    }
  }

  /**
   * Metodo para obtener las recetas que contienen tres ingredientes en concreto.
   * Se susbcribe al método getRecipesByThreeIngredients() del servicio recipesService
   * e iguala la respuesta a la variable recipes3
   */
  getRecipeFrom3ingredients(name1: string, name2: string, name3: string) {
    this.pending = true;
    if (name1 != null && name2 != null && name3 != null) {
      this.recipeService
        .getRecipesByThreeIngredients(name1, name2, name3)
        .subscribe({
          next: (data) => {
            this.recipes3 = data;
            //console.log(data);
            this.okRecipes3 = true;
            this.okRecipes2 = false;
            this.okRecipes1 = false;

            this.nameInput = name1;
            this.nameInput2 = name2;
            this.nameInput3 = name3;
            this.pending = false;
            if (this.recipes3 == null) {
              this.showPic = true;
              this.okRecipes3 = false;
            }

            localStorage.setItem('i1', this.nameInput);
            localStorage.setItem('i2', this.nameInput2);
            localStorage.setItem('i3', this.nameInput3);
            localStorage.setItem('option', '3');
          },
          error: (e) => {
            this.pending = false;
            Swal.fire('Error', e.error.mensaje, 'error');
          },
        });
    } else {
      Swal.fire(
        'Error',
        'Recuerda que debes introducir tres ingredientes.',
        'error'
      );
    }
  }
}
