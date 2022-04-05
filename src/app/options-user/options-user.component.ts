import { Component, OnInit } from '@angular/core';
import { AccessService } from '../services/access.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetails } from '../interfaces/interface';
/**
 * Componente de Opciones del Usuario
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

  constructor(
    private accessService: AccessService,
    private decodificarToken: JwtHelperService
  ) {}

  ngOnInit(): void {}

  /**
   * Método para obtener el nombre del usuario a través del token que se encuentra en el localStorage
   */
  get username() {
    let token = this.accessService.getToken();
    this.userDetails = this.decodificarToken.decodeToken(JSON.stringify(token));
    return this.userDetails?.username;
  }
}
