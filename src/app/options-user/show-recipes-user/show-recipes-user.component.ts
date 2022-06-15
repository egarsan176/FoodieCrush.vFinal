import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Recipe, User } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente ShowRecipesUser
 * Este componente sirve para que un usuario pueda gestionar sus recetas ya publicadas
 * Se encuentra dentro del panel de opciones del usuario
 */
@Component({
  selector: 'app-show-recipes-user',
  templateUrl: './show-recipes-user.component.html',
  styleUrls: ['./show-recipes-user.component.css'],
})
export class ShowRecipesUserComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  user!: User;
  recetario: Recipe[] = [];
  status: string = '';
  cols!: any[];
  first = 0;
  rows = 10;
  @ViewChild('dt1') dt1!: Table | undefined;
  pending: boolean = true;

  constructor(
    private recipesService: RecipesService,
    private accessService: AccessService
  ) {}

  ngOnInit(): void {
    /** CAMPOS DE LA DATATABLE */
    this.cols = [
      { field: 'id', header: 'ORDEN' },
      { field: 'recipeName', header: 'NOMBRE' },
      { field: 'category.name', header: 'CATEGORÍA' },
      { field: 'fechaBonita', header: 'FECHA DE PUBLICACIÓN' },
      { field: 'pending', header: 'ESTADO' },
    ];
    this.getUser(); //para obtener al usuario al cargar el componente
  }

  /**
   * Este método, a través del servicio AccessService, si la suscripción tiene éxito,
   * iguala la propiedad usuario del componente al usuario que corresponde con el token
   * que hay almacenado en ese momento en el localStorage,
   * si no tiene éxito, error
   */
  getUser() {
    this.accessService.getUsuario().subscribe({
      next: (data) => {
        this.user = data;
        this.getRecetario(data);
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método se suscribe al servicio recipesService para obtener todas las recetas
   * de un usuario en concreto. Si la respuesta tiene éxito, nos devuelve todas las recetas
   * del usuario, si no lo tiene, error
   * @param user del que queremos conocer sus recetas
   */
  getRecetario(user: User) {
    this.recipesService.getRecipesFromUser(user).subscribe({
      next: (data) => {
        this.recetario = data;

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
   * Este método se usa para retornar al filtro de la tabla la propiedad event.target.value
   * @param $event
   * @returns
   */
  getEventValue($event: any): string {
    return $event.target.value;
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
      confirmButtonText: 'Sí, quiero borrar mi receta.',
      denyButtonText: `No.`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipesService.deleteRecipe(id).subscribe({
          next: (data) => {
            this.getRecetario(this.user);
            if (data == null) {
              Swal.fire({
                title: 'Receta Eliminada',
                text:
                  'Tu receta con id  ' +
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
          'Tu receta sigue disponible en el Foodie Recetario. ¡Gracias!',
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
