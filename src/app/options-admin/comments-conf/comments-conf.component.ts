import { Component, OnInit } from '@angular/core';
import { RecipeComment } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';

@Component({
  selector: 'app-comments-conf',
  templateUrl: './comments-conf.component.html',
  styleUrls: ['./comments-conf.component.css'],
})
export class CommentsConfComponent implements OnInit {
  comment: RecipeComment = {
    message: 'esto es un comentatario',
  };
  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {}

  option() {
    this.recipeService.addCommentToRecipe(1, this.comment).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
