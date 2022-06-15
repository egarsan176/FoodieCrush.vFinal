import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css'],
})
export class SearchRecipeComponent implements OnInit {
  constructor() {}

  /**
   * Se eliminan del localStorage las variables necesarias para que no se pierdan las búsquedas al volver al buscador
   */
  ngOnInit(): void {
    localStorage.removeItem('busqueda');
    localStorage.removeItem('option');
    localStorage.removeItem('i1');
    localStorage.removeItem('i2');
    localStorage.removeItem('i3');
  }
}
