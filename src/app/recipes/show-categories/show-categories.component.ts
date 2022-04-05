import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileDB, Recipe } from 'src/app/interfaces/interface';
import { RecipesService } from 'src/app/services/Recipes.service';
/**
 * Componente ShowCategories
 * Este componente nos sirve para obtener las distintas recetas que pertenecen a una categoría determinada
 */
@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css'],
})
export class ShowCategoriesComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  recetario: Recipe[] = [];
  categoria: any = '';

  constructor(
    private recipeService: RecipesService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //para que al iniciar el componente muestre los datos
    this.getCategoria();
    this.showCategories();
  }

  //MÉTODO que se suscribe al getRecipesByCatgery() del servcio
  //si la suscripción tiene éxito, muestra todas las recetas que corresponden a la categoría que coincide con el id que se le pasa
  /**
   * Este método sirve para obtener las recetas de una determinada categoría a través del
   * servicio recipeService, paśandole como parámetro el id de la categoría que se desea obtener
   * Si la petición tiene éxito, se iguala la propiedad recetario del componente a la respuesta de la petición
   * (todas las recetas que pertenecen a esa categoría),
   * si no lo tiene, la propiedad recetario se queda null (o si la respuesta no contiene recetas)
   */
  showCategories() {
    this.recipeService
      .getRecipesByCategory(this.activeRoute.snapshot.params['id'])
      .subscribe({
        next: (data) => {
          this.recetario = data;
        },
      });
  }

  /**
   * Este método nos sirve para obtener el nombre de la categoría que queremos conocer a través de su ID
   * A través del servicio recipesService, se realiza una petición y si tiene respuesta se iguala la propiedad
   * categoría del componente a ésta.
   */
  getCategoria() {
    let id = this.activeRoute.snapshot.params['id'];
    //console.log(id)
    this.recipeService.getCategory(id).subscribe({
      next: (data) => {
        this.categoria = data;
      },
    });
  }

  /**
   * Este método a través del servicio RecipeService nos devuelve la imagen asociada a un fichero para
   * poder visualizarla en la vista
   * @param file
   * @returns la imagen de una receta que se proporciona en la vista
   */
  obtenerImagenReceta(file: FileDB) {
    return this.recipeService.getImage(file);
  }
}
