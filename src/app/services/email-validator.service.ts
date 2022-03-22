import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

    private urlBase: string = environment.urlBase;  //url a la que hacer la petición


    constructor( private httpClient: HttpClient ) { }

    //     // const opcionHeader = new HttpHeaders();
    //     // opcionHeader.append('Access-Control-Allow-Origin','*'); //es necesario para la peticion POST a la api {headers: opcionHeader})

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
        map (resp => {
          if(resp.email != null){
             return {emailTomado: true};
          }else{
           return null;
          }
        }),
        catchError (err => {
           return of(null);
        })
      );
     }

  //Aquí se hace la petición a la BBDD para comprobar si el email existe
  checkEmail(email:string){
    const url = `${this.urlBase}/user/${email}`;
    return this.httpClient.get<User>(url);
    //si la respuesta a esta petición es null significa que el email está disponible
    //si no es null, es que existe un usuario con ese email
  }

}
