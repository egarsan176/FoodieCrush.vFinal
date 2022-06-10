import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
} from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  pending: boolean = true;
  id: any = localStorage.getItem('id');
  recipe!: any; //dejo tipo any porque al no estar la categoría definida en receta como una interfaz aparte no me deja obtener el nombre

  title: string = '';

  recipeDetails!: FormGroup;
  ingredientLine!: FormGroup;
  recipeMethod!: FormGroup;

  reInfo_step = false;
  inLine_step = false;
  meth_step = false;

  step = 1;

  img: string = '';

  searchTerm$ = new BehaviorSubject<string>(''); //mantiene un estado inicial que en este caso es un string vacío
  listFiltered$!: Observable<string[]>; //la declaro como un observable para usar el async pipe en lugar de un subscribe
  private ingredients: string[] = []; //contiene los nombres de todos los ingredientes de la bbdd

  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private fileService: FileUploadService,
    private route: Router
  ) {}

  ngOnInit(): void {
    /**Recupero la receta original para mostrar sus datos */
    this.recipeService.showRecipe(this.id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.getFileByRecipe(data.id);

        this.title = data.recipeName;

        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });

    /**
     * Se crean los FormGroups para los distintos formularios
     */
    this.recipeDetails = this.fb.group({
      recipeName: [''],
      category: [''],
    });

    this.ingredientLine = this.fb.group({
      line: this.fb.array([]),
    });
    this.recipeMethod = this.fb.group({
      method: this.fb.array([]),
    });

    /** Para cargar la lista de ingredientes */
    this.recipeService.getIngredientsFromBD().subscribe({
      next: (data) => {
        this.ingredients = data;
        /** para eliminar los items repetidos */
        this.deleteItemDuplicate();
      },
      error: (e) => {
        console.log(e);
      },
    });

    /** Método para mostrar buscador de ingredientes */
    this.filterList();
  }

  /**
   * Método provisional para no mostrar los ingredientes repetidos hasta que se arregle en el back el añadido de ingredientes
   */
  deleteItemDuplicate() {
    let aux: string[] = [];

    for (var i = 0; i < this.ingredients.length; i++) {
      const elemento = this.ingredients[i].toLocaleUpperCase();

      if (!aux.includes(elemento)) {
        aux.push(elemento);
      }
    }

    this.ingredients = aux;
  }
  /**
   * Este método nos sirve para obtener el fichero asociado a una receta
   * A través del servicio recipeService, si la suscripción tiene éxito nos
   * devuelve el fichero asociado a la receta que coincide con el id que le pasamos,
   * si no, devuelve error
   * @param id de la receta de la que queremos obtener su fichero
   */
  getFileByRecipe(id: number) {
    this.fileService.getFileByRecipeID(id).subscribe({
      next: (data) => {
        if (data != null) {
          this.img = this.recipeService.getImage(data);
        }
      },
      error: (e) => {
        Swal.fire('Error', e.error.message, 'error');
      },
    });
  }

  /**
   * MÉTODO para añadir nuevas líneas de ingredientes (ingredientes y cantidades)
   */
  addNewIngredientLine() {
    const line = this.ingredientLine.get('line') as FormArray;

    const group = this.fb.group({
      ingredient: [null],
      amount: [null],
    });

    line.push(group);
  }

  /**
   * MËTODO para eliminar una línea de ingredientes
   * @param i index de la línea que se quiere eliminar
   */
  deleteGroup(i: number) {
    const line = this.ingredientLine.get('line') as FormArray;
    line.removeAt(i);
  }

  /**
   * MÉTODO para añadir los pasos de elaboración de la receta
   */
  addNewStep() {
    const method = this.recipeMethod.get('method') as FormArray;

    const steps = this.fb.group({
      step: [null],
    });

    method.push(steps);
  }
  /**
   * MËTODO para eliminar un paso de elaboración de la receta
   * @param i index del paso que se quiere eliminar
   */
  deleteStep(i: number) {
    const method = this.recipeMethod.get('method') as FormArray;
    method.removeAt(i);
  }

  /**
   * MÉTODOS GETTER PARA ACCEDER EN LA VISTA
   */
  get reInfo() {
    return this.recipeDetails.controls;
  }

  get line() {
    return this.ingredientLine.controls['line'] as FormArray;
  }

  get method() {
    return this.recipeMethod.controls['method'] as FormArray;
  }

  /**
   * A este método se accede para ir al siguiente formulario
   * @returns
   */
  next() {
    if (this.step == 1) {
      this.reInfo_step = true;
      if (this.recipeDetails.invalid) {
        return;
      }
      this.step++;
    } else if (this.step == 2) {
      this.inLine_step = true;
      if (this.ingredientLine.invalid) {
        return;
      }
      this.step++;
    }
  }

  /**
   * A este método se accede para volver al formulario anterior
   */
  previous() {
    this.step--;

    if (this.step == 1) {
      this.inLine_step = false;
    }
    if (this.step == 2) {
      this.meth_step = false;
    }
  }

  /**
   * MÉTODO para editar una receta
   * Se suscribe al servicio recipeService y edita la receta que coincide con el id que se le pasa por parámetro
   * con los nuevos valores introducidos en los formularios
   * Si existen campos que no se han editado, se conservan los de la receta original
   * @returns receta editada
   */
  editRecipe() {
    if (this.step == 3) {
      this.meth_step = true;
      if (this.recipeMethod.invalid) {
        return;
      }

      let newName = '';
      if (this.recipeDetails.controls['recipeName'].value != '') {
        newName = this.recipeDetails.controls['recipeName'].value;
      } else {
        newName = this.recipe.recipeName;
      }

      let newCategory = 0;
      if (this.recipeDetails.controls['category'].value != 0) {
        newCategory = this.recipeDetails.controls['category'].value;
      } else {
        newCategory = this.recipe.category;
      }

      let methodNew = [];
      if (this.recipeMethod.controls['method'].value.length > 0) {
        methodNew = this.recipeMethod.controls['method'].value;
      } else {
        methodNew = this.recipe.method;
      }

      let ingredientLineNew = [];
      if (this.ingredientLine.controls['line'].value.length > 0) {
        ingredientLineNew = this.ingredientLine.controls['line'].value;
      } else {
        ingredientLineNew = this.recipe.ingredientLine;
      }

      const editedRecipe: Recipe = {
        id: this.recipe.id,
        recipeName: newName,
        method: methodNew,
        category: newCategory,
        ingredientLine: ingredientLineNew,
        file: this.recipe.file,
        comments: [],
        isPending: true,
      };

      this.recipeService.editRecipe(this.recipe.id, editedRecipe).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Receta editada',
            text: 'Su receta ha sido editada satisfactoriamente.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigateByUrl('/optionsUser/myRecipes');
            }
          });
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
    }
  }

  /**
   * Como el term inicial que pasa al buscador es un string vacío, al ejecutar este método hace que se carguen los ingredintes en la variable listFiltered
   * Con el debounceTime() se consigue esperar un tiempo para luego emitir un valor (en este caso 200ms).
   * Cuando se escriba en el input, transcurridos los 200 ms, nos devuelve un valor. Si pongo la palabra piña, después de colocar la "a" se va a ejecutar
   * 4 veces que es la cantidad de letras que se han escrito; pero con el distinctUntilChange() solo va a llegar hasta dentro del susbcribe una sola vez.
   * Para usar la data y que se continue regresando un observable, use usa el .map de RxJS.
   * Como el resultado es un string se usa toLowerCase() para que no haya problema de mayúsculas/minúsculas
   * Si el indexOf() encuentra una coincidencia en la lista de ingredientes, devuelve un index >= 0 y esto se usa para mostrar la lista
   */
  filterList(): void {
    this.listFiltered$ = this.searchTerm$.pipe(
      map((term) => {
        return this.ingredients.filter(
          (item) => item.toLowerCase().indexOf(term.toLowerCase()) >= 0
        );
      })
    );
  }
}
