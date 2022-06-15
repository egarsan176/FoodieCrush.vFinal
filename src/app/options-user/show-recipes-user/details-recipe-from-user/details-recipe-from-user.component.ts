import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente DetailsRecipeFromUser
 * Este componente sirve para mostrar dentro de la ruta del panel de gestión del usuario, los detalles de una receta,
 * sin perder la ruta del breadcrumbs
 */
@Component({
  selector: 'app-details-recipe-from-user',
  templateUrl: './details-recipe-from-user.component.html',
  styleUrls: ['./details-recipe-from-user.component.css'],
})
export class DetailsRecipeFromUserComponent implements OnInit {
  id: any = localStorage.getItem('id');
  recipe!: Recipe;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    /**
     * Este método muestra la receta que coincide con el id que se le pasa por parámetro
     */
    this.recipeService.showRecipe(this.id).subscribe({
      next: (data) => {
        this.recipe = data;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }
}
