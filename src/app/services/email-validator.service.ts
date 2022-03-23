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
 * EmailValidatorService
 * Este servicio se encarga de comprobar si el email introducido en el formulario de registro ya existe en el sistema o no
 */
@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  private urlBase: string = environment.urlBase; //url a la que hacer la petición

  constructor(private httpClient: HttpClient) {}

  //AbstractControl clase base abstracta para las clases concretas de control de formularios FormControl , FormGroup y FormArray . Proporciona sus comportamientos y propiedades comunes.
  //modificación método validar Joaquín petición asíncrona para comprobar que el email existe una vez que ha escrito el campo completo y salta a otro campo
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value; //recupero el valor del campo email
  //   return this.checkEmail(email)
  //   .pipe(
  //     map (resp => {
  //       if(resp.email != null){
  //          return {emailTomado: true};
  //       }else{
  //        return null;
  //       }
  //     }),

  //   );
  //  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value; //recupero el valor del campo email
    return this.checkEmail(email).pipe(
      map((resp) => {
        if (resp.email != null) {
          return { emailTomado: true };
        } else {
          return null;
        }
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  /**
   * Este método hace una petición GET con el email pasado por parámetro para comprobar si ese email ya está registrado
   * @param email
   * @returns si el email está registrado, devuelve el usuario correspondiente a ese email. Si no lo está, devuelve null
   */
  checkEmail(email: string) {
    const url = `${this.urlBase}/user/${email}`;
    return this.httpClient.get<User>(url);
  }
}
