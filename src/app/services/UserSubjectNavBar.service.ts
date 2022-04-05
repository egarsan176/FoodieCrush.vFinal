import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetails } from '../interfaces/interface';
/**
 * UserSubjectNavBarService
 * Se encarga de gestionar el observable que controla qué tipo de usuario es el que inicia sesión para
 * mostrar distintas partes de la barra de navegación
 */
@Injectable({
  providedIn: 'root',
})
export class UserSubjectNavBarService {
  /**
   * Se hace uso de la librería RxJs, para programación reactiva
   * Los subjects de RxJs son un tipo de observable especial que me permite compartir el mismo stream de datos con todas las suscripciones
   * Los subjects son observables y observers al mismo tiempo, por lo que me puedo suscribir a un subject como a cualquier otro observable
   */

  //declaro la variable que usaré para indicar a todos los elementos suscritos que tiene información
  private _userDetails: BehaviorSubject<UserDetails | null> =
    new BehaviorSubject<UserDetails | null>(null);
  //la variable con la que nos suscribiremos a esa información. $ identifica que se trata de un observable
  public userDetails$: Observable<UserDetails | null> =
    this._userDetails.asObservable();

  constructor() {}

  /**
   * Este método cambia el valor de la información de la variable con la info que se le pasa por parámetro
   * @param userDetails
   */
  changeNavBar(userDetails: UserDetails | null) {
    this._userDetails.next(userDetails);
  }

  /**
   * Este método cambia el valor de la información de la variable a null
   */
  changeNavBarNull() {
    this._userDetails.next(null);
  }
}
