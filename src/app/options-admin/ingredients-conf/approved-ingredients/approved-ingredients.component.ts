import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/interfaces/interface';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approved-ingredients',
  templateUrl: './approved-ingredients.component.html',
  styleUrls: ['./approved-ingredients.component.css'],
})
export class ApprovedIngredientsComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  pending: boolean = true;
  approvedIngredientsBD: Ingredient[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getApprovedIngredientsFromBD();
  }

  getApprovedIngredientsFromBD() {
    this.adminService.getIngredientsApproved().subscribe({
      next: (data) => {
        this.approvedIngredientsBD = data;
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
   * @returns estado del ingrediente (pendiente/aprobado)
   */
  getStatus(ingredient: Ingredient) {
    return ingredient.pending ? 'pendiente' : 'aprobado';
  }
}
