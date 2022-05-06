import { Component, OnInit } from '@angular/core';
import { FileDB, Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
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
  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeService.showRecipe(this.id).subscribe({
      next: (data) => {
        this.recipe = data;
        console.log(data);

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
  hideName() {
    this.showEditName = false;
    if ((this.editedRecipe.recipeName = '')) {
      this.editedRecipe.recipeName = this.recipe.recipeName;
    }
  }

  editRecipe() {
    console.log(
      this.editedRecipe.recipeName +
        ' (editada) - (original) ' +
        this.recipe.recipeName
    );
    console.log('Receta editada: ' + this.editedRecipe);
  }
}
