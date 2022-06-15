import { Component, OnInit } from '@angular/core';
import { User, UserBACK } from 'src/app/interfaces/interface';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
/**
 * Componente UsersConf
 * Este componente muestra todos los usuarios existentes en la BBDD.
 * Se encuentra dentro del apartado Usuarios del Panel de Gestión del ADMIN
 */
@Component({
  selector: 'app-users-conf',
  templateUrl: './users-conf.component.html',
  styleUrls: ['./users-conf.component.css'],
})
export class UsersConfComponent implements OnInit {
  /** PROPIEDADES */
  users: UserBACK[] = [];
  pending: boolean = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  /**
   * Este método sirve para cargar todos los usuarios registrados en el sistema y los alamacena en la
   * propiedad users del componente
   */
  getAllUsers() {
    this.adminService.getAllUsersFromBD().subscribe({
      next: (data) => {
        this.users = data;
        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método hace una petición al adminService para eliminar a un usuario
   * de la base de datos
   * @param id del usuario a borrar
   */
  deleteUser(id: number) {
    Swal.fire({
      title: 'Eliminación de Usuario',
      text: 'A continuación vas a eliminar a este usuario del sistema. ¿Seguro que deseas hacerlo?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sí, quiero eliminar a este usuario.',
      denyButtonText: `No.`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe({
          next: (data) => {
            this.getAllUsers();
            if (data == null) {
              Swal.fire({
                title: 'Usuario eliminado',
                text:
                  'El usuario con id  ' +
                  id +
                  ' ha sido eliminado de nuestro sistema.',
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
          'Usuario no eliminado',
          'Este usuario sigue registrado en nuestro sistema.',
          'info'
        );
      }
    });
  }
}
