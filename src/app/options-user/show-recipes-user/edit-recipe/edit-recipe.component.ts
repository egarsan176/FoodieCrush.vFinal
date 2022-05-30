import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileDB, Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2';

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
  file!: FileDB;
  editedRecipe: Recipe = {
    id: 0,
    recipeName: '',
    method: [],
    category: 0,
    ingredientLine: [],
    file: this.file,
    comments: [],
    isPending: true,
  };
  showEditName: boolean = false;

  show: boolean = false;
  active: number = 1;
  inactive: number = 0;
  showSelect: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    recipeName: ['', [Validators.required]],
    category: [''],
  });
  constructor(private recipeService: RecipesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.recipeService.showRecipe(this.id).subscribe({
      next: (data) => {
        this.recipe = data;
        console.log(data);
        this.title = data.recipeName;

        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  showName() {
    this.showEditName = true;
  }

  editRecipe() {
    // console.log(
    //   this.editedRecipe.recipeName +
    //     ' (editada) - (original) ' +
    //     this.recipe.recipeName
    // );
    // console.log('Receta editada: ' + this.editedRecipe);
  }

  activeName(option: number) {
    let name = document.querySelector('.recipeName');
    if (option === 1) {
      name?.removeAttribute('disabled');
    } else {
      name?.setAttribute('disabled', '');
    }
  }
  activeCategory(option: number) {
    let cat = document.querySelector('.recipeCategory');
    if (option === 1) {
      cat?.removeAttribute('disabled');
      this.showSelect = true;
    } else {
      cat?.setAttribute('disabled', '');
      this.showSelect = false;
    }
  }
}
