import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/Recipes.service';

@Component({
  selector: 'app-search-ingredients',
  templateUrl: './search-ingredients.component.html',
  styleUrls: ['./search-ingredients.component.css'],
})
export class SearchIngredientsComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private recipeService: RecipesService) {}

  ingredients: any[] = [];

  getAllIngredients() {
    this.recipeService.getIngredientsFromBD().subscribe({
      next: (data) => {
        this.ingredients = data;
        console.log(this.ingredients);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
