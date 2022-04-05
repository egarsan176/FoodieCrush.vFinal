import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
/**
 * ValidatorService
 * Este servicio se encarga de validar algunos de los campos del formulario de registro
 */
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  /**
   * PROPIEDADES
   */

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  //Mínimo 6 caracteres, una letra y un número
  public passwordPattern: string =
    '^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$';

  /**
   *
   * @param campo1 Este método comprueba si los dos campos de la contraeña son iguales
   * @param campo2
   * @returns
   */
  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true };
      }

      formGroup.get(campo2)?.setErrors(null);

      return null;
    };
  }
}
