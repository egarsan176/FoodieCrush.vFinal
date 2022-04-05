import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interface';
/**
 * UsernameValidatorService
 * Este servicio se encarga de comprobar si el username introducido en el formulario de registro ya existe en el sistema o no
 */
@Injectable({
  providedIn: 'root',
})
export class UsernameValidatorService implements AsyncValidator {
  private urlBase: string = environment.urlBase; //url a la que hacer la petición

  constructor(private httpClient: HttpClient) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const username = control.value; //recupero el valor del campo username

    return this.checkUsername(username).pipe(
      map((resp) => {
        if (resp.username != null) {
          return { usernameTomado: true };
        } else {
          return { usernameTomado: false };
        }
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  /**
   * Este método hace una petición GET con el username pasado por parámetro para comprobar si ese username ya está registrado
   * @param username
   * @returns si el username está registrado, devuelve el usuario correspondiente a ese username. Si no lo está, devuelve null
   */
  checkUsername(username: string) {
    const url = `${this.urlBase}/user/checkUsername/${username}`;
    return this.httpClient.get<User>(url);
  }
}
