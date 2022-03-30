import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileDB, User } from 'src/app/interfaces/interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-details-template',
  templateUrl: './recipe-details-template.component.html',
  styleUrls: ['./recipe-details-template.component.css'],
})
export class RecipeDetailsTemplateComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  recipe: any; //dejo tipo any porque al no estar la categoría definida en receta como una interfaz aparte no me deja obtener el nombre
  ruta: string = '';
  user!: User;
  file!: FileDB;
  img: string = '';
  mostrar: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private fileService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.showRecipeDetails(); //para que la receta se muestre al cargar la página
  }

  /**
   * Este método sirve para obtener una receta completa a través del servicio recipeService, al cual se suscribe
   * si la suscripción tiene éxito nos devuelve los detalles de la receta que coincide con el id que indicamos
   * si no es correcta nos devuelve el mensaje de error de la API
   */
  showRecipeDetails() {
    this.recipeService
      .showRecipe(this.activeRoute.snapshot.params['id'])
      .subscribe({
        next: (data) => {
          this.getUserByRecipe(data.id); //para obtener al usuario asociado a esa receta
          this.getFileByRecipe(data.id); //para obtener la imagen asociada a esa receta

          this.recipe = data;
          this.mostrar = true;
        },
        error: (e) => {
          Swal.fire('Error', e.error.message, 'error');
        },
      });
  }

  /**
   * Este método nos sirve para obtener el autor que ha publicado una receta
   * A través del servicio recipeService, si la suscripción tiene éxito nos
   * devuelve el usuario asociado a la receta que coincide con el id que le pasamos,
   * si no es correcta, error
   * @param id de la receta de la que queremos saber su autor
   */
  getUserByRecipe(id: number) {
    this.recipeService.getUserByRecipe(id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => {
        Swal.fire('Error', e.error.message, 'error');
      },
    });
  }

  /**
   * Este método nos sirve para obtener el fichero asociado a una receta
   * A través del servicio recipeService, si la suscripción tiene éxito nos
   * devuelve el fichero asociado a la receta que coincide con el id que le pasamos,
   * si no, devuelve error
   * @param id de la receta de la que queremos obtener su fichero
   */
  getFileByRecipe(id: number) {
    this.fileService.getFileByRecipeID(id).subscribe({
      next: (data) => {
        if (data != null) {
          this.img = this.recipeService.getImage(data);
        }
      },
      error: (e) => {
        Swal.fire('Error', e.error.message, 'error');
      },
    });
  }
}
