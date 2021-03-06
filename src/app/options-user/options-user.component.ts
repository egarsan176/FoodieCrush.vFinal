import { Component, OnInit } from '@angular/core';
import { AccessService } from '../services/access.service';
import { User, UserDetails } from '../interfaces/interface';
import Swal from 'sweetalert2';
/**
 * Componente OptionsUser
 * A este componente solo puede acceder un usuario con rol de USER
 * El usuario es dirigido a este componente tras iniciar sesión, mostrando el panel de opciones de gestión
 */
@Component({
  selector: 'app-options-user',
  templateUrl: './options-user.component.html',
  styleUrls: ['./options-user.component.css'],
})
export class OptionsUserComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  userDetails!: UserDetails | null;
  user!: User;
  notifications: [] = [];
  mostrar: boolean = false;

  constructor(private accessService: AccessService) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**Método para obtener el usuario que está en la sesión en ese momento */
  getUser() {
    this.accessService.getUsuario().subscribe({
      next: (data) => {
        this.user = data;
        this.notifications = data.notifications;
        this.mostrar = true;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }
}
