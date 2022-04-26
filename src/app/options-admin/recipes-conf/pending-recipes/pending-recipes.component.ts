import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/interface';
import { AdminService } from 'src/app/services/admin.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-recipes',
  templateUrl: './pending-recipes.component.html',
  styleUrls: ['./pending-recipes.component.css'],
})
export class PendingRecipesComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  first = 0;
  rows = 10;
  recipesPending: Recipe[] = [];
  pending: boolean = true;

  constructor(
    private recipesService: RecipesService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getRecipesPending();
  }

  /**
   * El administrador accede a este método para conocer todas las recetas
   * pendientes de aprobación a través de una subcripción al servicio
   * adminService. Si la respuesta es éxitosa, la propiedad recipesPending del componente
   * se iguala a la respuesta de la petición
   */
  getRecipesPending() {
    this.adminService.getRecipesPending().subscribe({
      next: (data) => {
        this.recipesPending = data;
        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * El administrador accede a este método para cambiar el estado de una receta
   * @param id
   */
  changeStatusRecipe(id: number) {
    this.adminService.changeStatusRecipe(id).subscribe({
      next: (data) => {
        this.getRecipesPending();
        Swal.fire({
          title: 'Cambio de Estado Satisfactorio',
          text: 'La receta con id  ' + data.id + ' ha sido aprobada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para eliminar una receta de la base de datos. Para ello
   * se suscribe al método deleteFiles(id) del servicio RecipesService
   * @param id  de la receta que queremos borrar
   */
  deleteRecipe(id: number) {
    Swal.fire({
      title: 'Eliminación de receta',
      text: 'A continuación vas a eliminar esta receta del Foodie recetario. ¿Seguro que deseas eliminar esta receta?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sí, quiero borrar la receta.',
      denyButtonText: `No.`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipesService.deleteRecipe(id).subscribe({
          next: (data) => {
            this.getRecipesPending();
            if (data == null) {
              Swal.fire({
                title: 'Receta Eliminada',
                text:
                  'La receta con id  ' +
                  id +
                  ' ha sido eliminada del Foodie recetario.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
            }
          },
          error: (e) => {
            Swal.fire('Error', e.error.mensaje, 'error');
          },
        });
      } else if (result.isDenied) {
        Swal.fire(
          'Receta no eliminada',
          'Esta receta sigue disponible en el Foodie Recetario.',
          'info'
        );
      }
    });
  }

  setID(id: any) {
    localStorage.setItem('id', id);
  }
}
