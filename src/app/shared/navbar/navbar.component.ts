import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import { UserSubjectNavBarService } from 'src/app/services/UserSubjectNavBar.service';
import Swal from 'sweetalert2';

/** Componente Navbar*/
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  userDetails!: UserDetails | null;

  constructor(
    private accessService: AccessService,
    private userSubject: UserSubjectNavBarService
  ) {
    /**
     * Me suscribo a los cambios del observable que identifica qué tipo de usuario es el que está en la sesión en ese momento.
     * De este modo puedo mostrar diferentes opciones en la barra de navegación según el usuario
     */
    this.userSubject.userDetails$.subscribe((data) => {
      this.userDetails = data;
    });
  }

  ngOnInit(): void {}

  /**
   * Método que sirve para que un usuario cierre su sesión
   * Llama al cerrar sesión del servicio AccessService y modifica el estado del observable que identifica al usuario
   */
  onlogout() {
    Swal.fire({
      title: 'Cierre de sesión',
      icon: 'warning',
      text:
        'Vaya ' +
        this.userDetails?.username +
        ', ¿seguro que quieres cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Has cerrado sesión. <br> ¡Vuelve pronto!', '', 'success');
        this.accessService.logout();
        this.userSubject.changeNavBarNull();
      }
    });
  }
}
