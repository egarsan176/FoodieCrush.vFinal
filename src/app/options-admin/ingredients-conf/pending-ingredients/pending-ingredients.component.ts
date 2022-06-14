import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/interfaces/interface';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-ingredients',
  templateUrl: './pending-ingredients.component.html',
  styleUrls: ['./pending-ingredients.component.css'],
})
export class PendingIngredientsComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  pending: boolean = true;
  pendingIngredientsBD: Ingredient[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getPendingIngredientsFromBD();
  }

  getPendingIngredientsFromBD() {
    this.adminService.getIngredientsPending().subscribe({
      next: (data) => {
        this.pendingIngredientsBD = data;
        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para obtener el estado de un ingrediente (aprobado por el admin o no)
   * Si la propiedad ingredient.is_pending= true, el ingrediente está pendiente de aprobación,
   * si es false, está aprobado por el admin
   * @param ingredient
   * @returns estado del ingrediente (pendiente/aprobado )
   */
  getStatus(ingredient: Ingredient) {
    return ingredient.pending ? 'pendiente' : 'aprobado';
  }

  /**
   * El administrador accede a este método para cambiar el estado de un ingrediente
   * @param id
   */
  changeStatus(id: number) {
    this.adminService.changeStatusIngredient(id).subscribe({
      next: (data) => {
        this.getPendingIngredientsFromBD();
        Swal.fire({
          title: 'Cambio de Estado Satisfactorio',
          text: 'El ingrediente con id  ' + data.id + ' ha sido aprobado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }
}
