import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FileDB, Recipe, UserDetails } from 'src/app/interfaces/interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente RecipeFormTemplate
 * Este componente contiene el formulario que se usa de plantilla en otros componentes para publicar una receta
 * Pertenece al módulo Shared
 */
@Component({
  selector: 'app-recipe-form-template',
  templateUrl: './recipe-form-template.component.html',
  styleUrls: ['./recipe-form-template.component.css'],
})
export class RecipeFormTemplateComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  pending: boolean = true;
  id: any = localStorage.getItem('id');
  //recipe!: any; //dejo tipo any porque al no estar la categoría definida en receta como una interfaz aparte no me deja obtener el nombre

  title: string = '';

  recipeDetails!: UntypedFormGroup;
  ingredientLine!: UntypedFormGroup;
  recipeMethod!: UntypedFormGroup;

  reInfo_step = false;
  inLine_step = false;
  meth_step = false;

  step = 1;

  img: string = '';
  showLine: boolean = false;
  showMethod: boolean = false;

  showIng: boolean = false;

  searchTerm$ = new BehaviorSubject<string>(''); //mantiene un estado inicial que en este caso es un string vacío
  listFiltered$!: Observable<string[]>; //la declaro como un observable para usar el async pipe en lugar de un subscribe
  ingredients: string[] = []; //contiene los nombres de todos los ingredientes de la bbdd

  userDetails!: UserDetails | null;

  file!: FileDB;

  constructor(
    private recipeService: RecipesService,
    private fb: UntypedFormBuilder,
    private fileService: FileUploadService,
    private route: Router,
    private decodificarToken: JwtHelperService,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    /**
     * Se crean los FormGroups para los distintos formularios
     */
    this.recipeDetails = this.fb.group({
      recipeName: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.ingredientLine = this.fb.group({
      line: this.fb.array([], Validators.required),
    });

    this.recipeMethod = this.fb.group({
      method: this.fb.array([], Validators.required),
    });

    /** Para cargar la lista de ingredientes */
    this.recipeService.getIngredientsFromBD().subscribe({
      next: (data) => {
        this.showIng = true;
        this.ingredients = data;

        /** para eliminar los items repetidos */
        // this.deleteItemDuplicate();
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
  // deleteItemDuplicate() {
  //   let aux: string[] = [];

  //   for (var i = 0; i < this.ingredients.length; i++) {
  //     const elemento = this.ingredients[i].toLocaleUpperCase();

  //     if (!aux.includes(elemento)) {
  //       aux.push(elemento);
  //     }
  //   }

  //   this.ingredients = aux;
  // }
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
    const line = this.ingredientLine.get('line') as UntypedFormArray;

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
    const line = this.ingredientLine.get('line') as UntypedFormArray;
    line.removeAt(i);
  }

  /**
   * MÉTODO para añadir los pasos de elaboración de la receta
   */
  addNewStep() {
    const method = this.recipeMethod.get('method') as UntypedFormArray;

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
    const method = this.recipeMethod.get('method') as UntypedFormArray;
    method.removeAt(i);
  }

  /**
   * MÉTODOS GETTER PARA ACCEDER EN LA VISTA
   */
  get reInfo() {
    return this.recipeDetails.controls;
  }

  get line() {
    return this.ingredientLine.controls['line'] as UntypedFormArray;
  }

  get method() {
    return this.recipeMethod.controls['method'] as UntypedFormArray;
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
        this.showLine = true;
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
  publicar() {
    if (this.step == 3) {
      this.meth_step = true;
      if (this.recipeMethod.invalid) {
        this.showMethod = true;
        return;
      }

      let token = JSON.stringify(localStorage.getItem('token'));
      this.userDetails = this.decodificarToken.decodeToken(token);
      this.uploadService.getFileByName().subscribe({
        next: (data) => {
          this.file = data;
          const newRecipe: Recipe = {
            id: 0,
            recipeName:
              this.recipeDetails.controls['recipeName'].value.toUpperCase(),
            method: this.recipeMethod.controls['method'].value,
            category: this.recipeDetails.controls['category'].value,
            ingredientLine: this.ingredientLine.controls['line'].value,
            file: this.file,
            comments: [],
            isPending: true,
          };

          this.recipeService.publicar(newRecipe).subscribe({
            next: (data) => {
              Swal.fire({
                title: 'Receta publicada',
                text: 'Su receta se ha publicado con éxito',
                icon: 'info',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  if (this.userDetails?.role === 'ADMIN')
                    this.route.navigateByUrl('optionsADMIN/recipesConf');
                  else {
                    this.route.navigateByUrl('optionsUser');
                  }
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
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
    }
  }

  /**
   * Como el term inicial que pasa al buscador es un string vacío, al ejecutar este método hace que se carguen los ingredintes en la variable listFiltered
   
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
