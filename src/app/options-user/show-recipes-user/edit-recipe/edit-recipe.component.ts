import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Router } from '@angular/router';

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
        console.log(data);
        this.title = data.recipeName;

        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });

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
      console.log(newName);
      console.log(newCategory);
      console.log(methodNew);
      console.log(ingredientLineNew);

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

      console.log(editedRecipe);

      this.recipeService.editRecipe(this.recipe.id, editedRecipe).subscribe({
        next: (data) => {
          console.log(data);
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
}
