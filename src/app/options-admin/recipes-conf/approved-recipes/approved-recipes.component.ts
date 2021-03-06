import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/interface';
import { AdminService } from 'src/app/services/admin.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente ApprovedRecipes
 * Este componente muestra todas las recetas aprobadas de la BBDD, (isPending = false)
 * Se encuentra dentro del apartado Recetas del Panel de Gestión del ADMIN
 */
@Component({
  selector: 'app-approved-recipes',
  templateUrl: './approved-recipes.component.html',
  styleUrls: ['./approved-recipes.component.css'],
})
export class ApprovedRecipesComponent implements OnInit {
  /**
   * PROPIEDADES
   */

  recipesApproved: Recipe[] = [];
  first = 0;
  rows = 10;
  pending: boolean = true;

  constructor(
    private recipesService: RecipesService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getRecipesApproved();
  }

  /**
   * El administrador accede a este método para conocer todas las recetas
   * que ya se han aprobado a través de una subcripción al servicio
   * recipesService. Si la respuesta es éxitosa, la propiedad recipesApproved del componente
   * se iguala a la respuesta de la petición
   */
  getRecipesApproved() {
    this.adminService.getRecipesNotPending().subscribe({
      next: (data) => {
        this.recipesApproved = data;
        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }
  /**
   * Este método sirve para obtener el estado de una receta (aprobada por el admin o no)
   * Si la propiedad recipe.pending = true, la receta está pendiente de aprobación,
   * si es false, está aprobada por el admin
   * @param recipe
   * @returns estado de la receta (pendiente/aprobada)
   */
  getStatus(recipe: Recipe) {
    return recipe.isPending ? 'pendiente' : 'aprobada';
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
            this.getRecipesApproved();
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

  /**
   * Este método almacena el id de la receta en el localStorage para poder
   * recuperarlo al mostrar los detalles de una receta cuando se navega hacia la página /recipeDetail
   * @param id
   */
  setID(id: any) {
    localStorage.setItem('id', id);
  }
}
