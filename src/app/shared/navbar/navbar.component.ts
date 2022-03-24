import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetails } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import { UserSubjectNavBarService } from 'src/app/services/UserSubjectNavBar.service';
import Swal from 'sweetalert2';

/**
 * Componente Navbar
 * Este componente sirve para mostrar y gestionar la barra de navegación de la aplicación
 */
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
    private userSubject: UserSubjectNavBarService,
    private decodificarToken: JwtHelperService
  ) {
    /**
     * Me suscribo a los cambios del observable que identifica qué tipo de usuario es el que está en la sesión en ese momento.
     * De este modo puedo mostrar diferentes opciones en la barra de navegación según el usuario logueado
     */
    this.userSubject.userDetails$.subscribe((data) => {
      this.userDetails = data;
    });
  }

  ngOnInit(): void {
    /**
     * Compruebo si hay algún usuario con sesión iniciada al cargar el componente
     * por si la aplicación se cerró y el usuario no había cerrado la sesión
     */
    let token = this.accessService.getToken();
    if (token != null) {
      this.userDetails = this.decodificarToken.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
  }

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
      if (result.isConfirmed) {
        Swal.fire('Has cerrado sesión. <br> ¡Vuelve pronto!', '', 'success');
        this.accessService.logout();
        this.userSubject.changeNavBarNull();
      }
    });
  }
}
