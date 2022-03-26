import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetails } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import { UserSubjectNavBarService } from 'src/app/services/UserSubjectNavBar.service';
import Swal from 'sweetalert2';
/**
 * Componente de login
 * Este componente sirve para que un usuario pueda iniciar sesión
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /**
   *  //PROPIEDADES
   */
  userDetails!: UserDetails | null;
  email: string = '';
  password: string = '';

  constructor(
    public router: Router,
    private accessService: AccessService,
    private decodificarToken: JwtHelperService,
    private userSubject: UserSubjectNavBarService
  ) {}

  ngOnInit(): void {}

  /**
   * Método para que un usuario inicie sesión en la aplicación
   * Este método llama al método de login del servicio AccessService.
   * Si la suscripción tiene éxito:
   *  - se almacena el token del usuario que ha iniciado sesión en el localStorage
   *  - se cambia el estado del observable que identifica el usuario logueado (para control de navbar)
   *  - si el usuario es ADMIN, te redirije a las opciones de administrador, si no a las opciones de usuario
   * Si no tiene éxito, muestra mensaje de error
   */
  login() {
    let token = this.accessService.getToken();
    //console.log(token);
    if (token != null) {
      let userDetails2: UserDetails = this.decodificarToken.decodeToken(
        JSON.stringify(token)
      );
      if (userDetails2.email === this.email) {
        Swal.fire(
          'Info',
          userDetails2.username + ', ¡ya habías iniciado sesión!',
          'info'
        );
      }
    } else {
      this.accessService.login(this.email, this.password).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.access_token);

          this.userDetails = this.decodificarToken.decodeToken(
            data.access_token
          ); //este método sirve para decodificar la info del token
          //console.log(this.userDetails)
          this.userSubject.changeNavBar(this.userDetails);

          Swal.fire({
            title: 'Sesión Iniciada',
            text: 'Ha iniciado sesión como ' + this.userDetails?.username + '.',
            icon: 'success',
            confirmButtonText: 'Acceder',
          }).then((result) => {
            if (result.isConfirmed) {
              if (this.userDetails?.role === 'ADMIN')
                this.router.navigateByUrl('optionsADMIN');
              else {
                this.router.navigateByUrl('optionsUser');
              }
            }
          });
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
    }
  }
}
