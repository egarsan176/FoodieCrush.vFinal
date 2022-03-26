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
  constructor() {}

  ngOnInit(): void {}

  /**
   * Este método sirve para volver a la página anterior en la vista
   */
  back() {
    history.back();
  }
}
