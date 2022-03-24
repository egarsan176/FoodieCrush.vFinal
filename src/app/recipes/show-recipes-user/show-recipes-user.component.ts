import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interface';
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
  user!: any;
  mostrar: boolean = false;
  recetario: any[] = [];
  loading: boolean = true;
  first = 0;
  rows = 10;

  constructor(
    private recipesService: RecipesService,
    private accessService: AccessService
  ) {}

  ngOnInit(): void {
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
  getRecetario(user: any) {
    this.recipesService.getRecipesFromUser(this.user).subscribe({
      next: (data) => {
        this.recetario = data;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para volver atrás en la vista
   */
  back() {
    history.back();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.recetario
      ? this.first === this.recetario.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.recetario ? this.first === 0 : true;
  }
}
