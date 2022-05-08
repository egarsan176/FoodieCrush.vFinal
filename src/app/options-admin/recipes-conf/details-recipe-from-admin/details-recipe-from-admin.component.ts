import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente DetailsRecipeFromAdmin
 * Este componente sirve para mostrar dentro de la ruta del panel de gestión del ADMIN, los detalles de una receta,
 * sin perder la ruta del breadcrumbs
 */
@Component({
  selector: 'app-details-recipe-from-admin',
  templateUrl: './details-recipe-from-admin.component.html',
  styleUrls: ['./details-recipe-from-admin.component.css'],
})
export class DetailsRecipeFromAdminComponent implements OnInit {
  id: any = localStorage.getItem('id');
  recipe!: Recipe;
  originParam: string = '';

  constructor(
    private recipeService: RecipesService,
    private rutaActiva: ActivatedRoute,
    private route: Router
  ) {}

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

    this.originParam = this.rutaActiva.snapshot.params['origin'];

    this.rutaActiva.params.subscribe((params: Params) => {
      this.originParam = params['origin'];
    });
  }

  /**
   * Para navegar hacia la ruta correcta en el breadcrumb dependiendo del origin del breadcrumb
   */
  navigateTO() {
    if (this.originParam === 'pending') {
      this.route.navigateByUrl('optionsADMIN/recipesConf/pendingRecipes');
    } else if (this.originParam === 'approved') {
      this.route.navigateByUrl('optionsADMIN/recipesConf/approvedRecipes');
    } else if (this.originParam === 'all') {
      this.route.navigateByUrl('optionsADMIN/recipesConf/allRecipes');
    }
  }

  /**
   * Para mostrar la ruta correcta en el breadcrumb dependiendo de cual sea la ruta que la precede
   */
  get originBreadCrumb() {
    let origin: string = '';

    if (this.originParam === 'pending') {
      origin = 'PENDIENTES';
    } else if (this.originParam === 'approved') {
      origin = 'APROBADAS';
    } else if (this.originParam === 'all') {
      origin = 'TODAS';
    }

    return origin;
  }
}
