import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';

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
    this.recipeService.showRecipe(this.id).subscribe({
      next: (data) => {
        this.recipe = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
