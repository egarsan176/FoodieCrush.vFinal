import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';

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
    this.recipeService.showRecipe(this.id).subscribe({
      next: (data) => {
        this.recipe = data;
      },
      error: (e) => {
        console.log(e);
      },
    });

    this.originParam = this.rutaActiva.snapshot.params['origin'];

    this.rutaActiva.params.subscribe((params: Params) => {
      this.originParam = params['origin'];
    });
  }

  navigateTO() {
    if (this.originParam === 'pending') {
      this.route.navigateByUrl('optionsADMIN/recipesConf/pendingRecipes');
    } else if (this.originParam === 'approved') {
      this.route.navigateByUrl('optionsADMIN/recipesConf/approvedRecipes');
    } else if (this.originParam === 'all') {
      this.route.navigateByUrl('optionsADMIN/recipesConf/allRecipes');
    }
  }

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
