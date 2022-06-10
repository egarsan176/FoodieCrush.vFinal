import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/interfaces/interface';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-ingredients',
  templateUrl: './all-ingredients.component.html',
  styleUrls: ['./all-ingredients.component.css'],
})
export class AllIngredientsComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  pending: boolean = true;
  allIngredientsBD: Ingredient[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllIngredientsFromBD();
  }

  /**
   * Método para obtener todos los ingredientes de la BBDD.
   * Se suscribe al método getAllIngredients() del servicio adminService e iguala
   * la respuesta a la variable allIngredientsBD del componente
   */
  getAllIngredientsFromBD() {
    this.adminService.getAllIngredients().subscribe({
      next: (data) => {
        this.allIngredientsBD = data;
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

  /**
   * Método provisional para no mostrar los ingredientes repetidos hasta que se arregle en el back el añadido de ingredientes
   */
  deleteItemDuplicate() {
    let aux: String[] = [];
    let contador: number = 0;

    this.allIngredientsBD.forEach((element) => {
      aux.push(element.name);
    });
    let aux2: string[] = [];

    console.log(aux);

    for (var i = 0; i < aux.length; i++) {
      const elemento = aux[i].toLocaleUpperCase();

      if (!aux2.includes(elemento)) {
        aux2.push(elemento);
      }

      contador = contador + 1;
      if (contador === 1) {
        this.allIngredientsBD.splice(i);
      }
    }

    console.log(aux2);
    console.log(this.allIngredientsBD);

    let ingredients: Ingredient[] = [];

    this.allIngredientsBD = ingredients;
  }
}
