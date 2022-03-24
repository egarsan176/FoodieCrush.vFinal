import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileDB, IngredientLine, Recipe } from 'src/app/interfaces/interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente UploadRecipeForm
 * Este componente contiene el formulario para poder publicar una receta
 */
@Component({
  selector: 'app-upload-recipe-form',
  templateUrl: './upload-recipe-form.component.html',
  styleUrls: ['./upload-recipe-form.component.css'],
})
export class UploadRecipeFormComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  ingrediente: string = '';
  cantidad!: number;
  paso: string = '';
  pasos: string[] = [];
  ingredientes: string[] = [];
  cantidades: number[] = [];
  category: number = 0;

  file!: FileDB;

  recipe: Recipe = {
    recipeName: '',
    method: [],
    category: 0,
    ingredientLine: [],
    file: this.file,
    comments: [],
  };

  constructor(
    private recipeService: RecipesService,
    private uploadService: FileUploadService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  ///////////////////////////GESTIÓN DE LA LÍNEA DE INGREDIENTES

  /**
   * Este método sirve para agregar un ingrediente al auxiliar ingredientes[]
   * del componente siempre que éste ingrediente no se encuentre ya en el []
   */
  agregarIngrediente() {
    if (!this.ingredientes.includes(this.ingrediente)) {
      this.ingredientes.push(this.ingrediente);
    }
  }

  /**
   * Este método sirve para agregar la cantidad de ingrediente necesaria al auxiliar
   * de cantidades[] del componente. Una vez que la añade, resetea los campos
   * ingrediente y cantidad del formulario
   */
  agregarCantidad() {
    this.cantidades.push(this.cantidad);
    this.ingrediente = '';
    this.cantidad = 0;
  }

  /**
   * Este método sirve para eliminar un ingrediente y su correspondiente cantidad
   * de los auxilares ingredientes[] y cantidades[] del componente
   * @param index del ingrediente y cantidad que se quiere eliminar
   */
  eliminar(index: number) {
    this.ingredientes.splice(index, 1);
    this.cantidades.splice(index, 1);
  }

  //MÉTODO para crear la línea de ingredientes de la receta a través de los auxiliares ingredientes[] y cantidades[]
  //creando el recipe.ingredientLine[] cuando confirmamos los ingredientes
  /**
   * Este método sirve para crear la línea de ingredientes de una receta a través
   * de los auxiliares ingredientes[] y cantidades[] del componente.
   * Cuando se confirman los ingredientes en el formulario, se crea
   * el recipe.ingredientLine[] del objeto recipe del componente
   */
  crearLinea() {
    if (this.ingredientes.length == this.cantidades.length) {
      for (let index = 0; index < this.ingredientes.length; index++) {
        const nuevaLinea: IngredientLine = {
          ingredient: this.ingredientes[index],
          amount: this.cantidades[index],
        };
        this.recipe.ingredientLine.push(nuevaLinea);
      }
    } else {
      Swal.fire(
        'Error',
        'Recuerda que debes añadir una cantidad para cada ingrediente',
        'error'
      );
      this.ingredientes = [];
      this.cantidades = [];
    }
  }

  ///////////////////////////GESTIÓN DE LOS PASOS DE LA RECETA

  /**
   * Este método sirve para agregar un nuevo paso de la receta al auxiliar
   * de pasos[] del componente
   */
  agregarPaso() {
    if (!this.pasos.includes(this.paso)) {
      this.pasos.push(this.paso);
    }
  }

  /**
   * Este método sirve para eliminar un paso que ha sido añadido al auxiliar
   * de pasos[] del componente
   * @param index del paso que se quiere eliminar
   */
  eliminarPaso(index: number) {
    this.pasos.splice(index, 1);
  }

  /**
   * Este método sirve para confirmar en el formulario los pasos de la receta
   * y cuando se confirma se iguala el auxiliar de pasos[] del componente
   * al recipe.method del objeto recipe del componente
   */
  confirmarPasos() {
    this.recipe.method = this.pasos;
  }

  /**
   * Este método sirve para publciar una receta en la base de datos
   * Primero, se suscribe al servicio uploadService para obtener el fichero que
   * corresponde a la receta que se va a publicar, si la respuesta tiene éxito,
   * se iguala al recipe.file del objeto recipe del componente.
   * A través del servicio recipeService, se suscribe para publicar el objeto
   * recipe del componente en la base de datos.
   */
  publicar() {
    this.uploadService.getFileByName().subscribe({
      next: (data) => {
        this.file = data;
        //console.log(this.file)
        if (
          this.recipe.recipeName != '' &&
          this.recipe.method.length > 0 &&
          this.recipe.category != 0 &&
          this.recipe.ingredientLine.length > 0
        ) {
          this.recipe.file = this.file;
          //console.log(this.recipe.file)

          this.recipeService.publicar(this.recipe).subscribe({
            next: (data) => {
              Swal.fire({
                title: 'Receta publicada',
                text: 'Su receta se ha publicado con éxito',
                icon: 'info',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.route.navigateByUrl('optionsUser');
                }
              });
            },
            error: (e) => {
              Swal.fire(
                'Error',
                'No se puede publicar la receta. ' + e.error.mensaje,
                'error'
              );
            },
          });
        } else {
          Swal.fire(
            'Error',
            'Todos los campos de la receta deben estar rellenos.',
            'error'
          );
        }
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para volver a la página anterior en la vista
   */
  back() {
    history.back();
  }
}
