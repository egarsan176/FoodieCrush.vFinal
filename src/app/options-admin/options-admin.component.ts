import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/interface';
import { AccessService } from '../services/access.service';
import Swal from 'sweetalert2';
/**
 * Componente de Opciones del Administrador
 */
@Component({
  selector: 'app-options-admin',
  templateUrl: './options-admin.component.html',
  styleUrls: ['./options-admin.component.css'],
})
export class OptionsADMINComponent implements OnInit {
  /**
   * PROPIEDADES
   */

  user!: User;
  mostrar: boolean = false;

  constructor(private accessService: AccessService) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Este método iguala la propiedad usuario del componente al usuario que corresponde al token que hay almacenado en el localStorage
   */
  getUser() {
    this.accessService.getUsuario().subscribe({
      next: (data) => {
        this.user = data;
        this.mostrar = true;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }
}
