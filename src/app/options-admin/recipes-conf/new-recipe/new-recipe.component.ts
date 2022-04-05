import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /**
   * Método para volver a la página anterior en la vista
   */
  back() {
    history.back();
  }
}
