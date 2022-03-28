import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Recipe, User } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente ShowRecipesUser
 * Este componente sirve para que un usuario pueda gestionar sus recetas ya publicadas
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
  @ViewChild('dt1') dt1!: Table | undefined;

  constructor(
    private recipesService: RecipesService,
    private accessService: AccessService
  ) {}

  ngOnInit(): void {
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
    return recipe.pending ? 'pendiente' : 'aprobada';
  }

  /**
   * Este método sirve para volver atrás en la vista
   */
  back() {
    history.back();
  }

  /**
   * Este método se usa para retornar al filtro de la tabla la propiedad event.target.value
   * @param $event
   * @returns
   */
  getEventValue($event: any): string {
    return $event.target.value;
  }
}
