import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-notifications-user',
  templateUrl: './show-notifications-user.component.html',
  styleUrls: ['./show-notifications-user.component.css'],
})
export class ShowNotificationsUserComponent implements OnInit {
  /** PROPIEDADES */
  pending: boolean = true;
  user!: User;
  notifications: [] = [];
  first = 0;
  rows = 10;

  mostrar: boolean = false;

  constructor(private accessService: AccessService) {}

  ngOnInit(): void {
    this.getUser();
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

        this.notifications = data.notifications;
        this.pending = false;
        this.mostrar = true;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /** Este método, a través del servicio AccessService, hace que el usuario pueda eliminar una notificación de su lista */
  deleteNotification(id: number) {
    this.accessService.deleteNotification(id).subscribe({
      next: (data) => {
        this.getUser();
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
}
