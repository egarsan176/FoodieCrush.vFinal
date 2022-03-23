import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileDB, IngredientLine, Recipe } from 'src/app/interfaces/interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-recipe-form',
  templateUrl: './upload-recipe-form.component.html',
  styleUrls: ['./upload-recipe-form.component.css'],
})
export class UploadRecipeFormComponent implements OnInit {
  //PROPIEDADES
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
  };

  constructor(
    private recipeService: RecipesService,
    private uploadService: FileUploadService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  ///////////////////////////GESTIÓN DE LA LÍNEA DE INGREDIENTES

  //MÉTODO que agrega un ingrediente al auxiliar de ingredientes[] si éste no lo incluye todavía
  agregarIngrediente() {
    if (!this.ingredientes.includes(this.ingrediente)) {
      this.ingredientes.push(this.ingrediente);
    }
  }

  //MÉTODO que agrega la cantidad de ingrediente al auxiliar de cantidades[]
  //una vez añadida la cantidad se resetea el ingrediente y la cantidad
  agregarCantidad() {
    this.cantidades.push(this.cantidad);
    this.ingrediente = '';
    this.cantidad = 0;
  }

  //MÉTODO que elimina un ingrediente y su cantidad correspondiente de los auxiliares ingredientes[] y cantidades[]
  eliminar(index: number) {
    this.ingredientes.splice(index, 1);
    this.cantidades.splice(index, 1);
  }

  //MÉTODO para crear la línea de ingredientes de la receta a través de los auxiliares ingredientes[] y cantidades[]
  //creando el recipe.ingredientLine[] cuando confirmamos los ingredientes
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

  //MÉTODO para agregar un nuevo paso de la receta al auxiliar de pasos[]
  agregarPaso() {
    if (!this.pasos.includes(this.paso)) {
      this.pasos.push(this.paso);
    }
  }
  //MÉTODO para eliminar un paso de la receta del auxiliar de pasos[]
  eliminarPaso(index: number) {
    this.pasos.splice(index, 1);
  }

  //MÉTODO para confirmar los pasos de la receta e iguala el auxiliar de pasos[] al recipe.method[]
  confirmarPasos() {
    this.recipe.method = this.pasos;
  }

  //MÉTODO para publicar la receta en la base de datos
  //se suscribe al getFileByName() para obtener el fichero que corresponde a la receta que se va a publicar
  //una vez que consigue el fichero, se suscribe al método publicar() del servicio pasando el obtejo receta que se crea en el formulario
  //si la suscripción tiene éxito obtenemos un mensaje de éxito
  //si no tiene éxito nos devuelve error
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
        console.log(e);
      },
    });
  }

  //MÉTODO para volver a la página anterior
  back() {
    history.back();
  }
}
