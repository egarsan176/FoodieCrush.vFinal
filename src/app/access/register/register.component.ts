import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import { EmailValidatorService } from 'src/app/services/email-validator.service';
import { UsernameValidatorService } from 'src/app/services/username-validator.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2';
/**
 * Componente Register
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  /**
   * PROPIEDADES (objecto del formulario)
   */

  user: User = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: '',
  };

  miFormulario: FormGroup = this.fb.group(
    {
      //formGroup (un grupo de controles) realiza un seguimiento del valor y estado de cambio y validez de los datos

      /** el nombre tiene que pasar el patrón que se declara en el servicio que indica que tiene que ser nombre y apellido */
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ],
      ],

      /** tiene que concordar con el patrón de email del validator-service y además this.emailValidator para el servicio de email-validator */
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],

      /** username mínimo 5 caracteres */
      username: [
        '',
        [Validators.required, Validators.min(5)],
        [this.usernameValidator],
      ],

      /** tiene que cumplir con el patrón indicado en el validator-service */
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.passwordPattern),
        ],
      ],
      password2: ['', [Validators.required]],

      condiciones: [false, Validators.requiredTrue],
    },
    {
      //para comprobar que la contraseña sea la misma en los dos campos
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private accessService: AccessService,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService,
    private usernameValidator: UsernameValidatorService,
    public router: Router
  ) {}

  ngOnInit(): void {
    //se resetea el forumulario en el init para que cada vez que se cargue la página el formulario no contenga datos anteriores
    this.miFormulario.reset({
      ...this.user,
      condiciones: false,
    });

    this.miFormulario.valueChanges.subscribe(({ condiciones, ...rest }) => {
      this.user = rest;
    });
  }

  /** GESTIÓN de mensajes para el error del campo email */
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors!;
    if (errors['required']) {
      return 'El email es obligatorio';
    } else if (errors['pattern']) {
      //si no concuerda con el patrón del validator.service
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors['emailTomado']) {
      //si ya existe ese email (email-validator)
      return 'Este email ya está registrado en el sistema';
    }

    return '';
  }

  /** GESTIÓN de mensajes para el error del campo username */
  get userNameErrorMsg(): string {
    const errors = this.miFormulario.get('username')?.errors!;
    if (errors['required']) {
      return 'El nombre de usuario es obligatorio';
    } else if (errors['min']) {
      //si no concuerda con el patrón del validator.service
      return 'Debe tener como mínimo 5 caracteres';
    } else if (errors['usernameTomado']) {
      return 'Este username ya está registrado en el sistema';
    }
    return '';
  }

  /** GESTIÓN de mensajes para el error del nombre */
  get nameErrorMsg(): string {
    const errors = this.miFormulario.get('fullName')?.errors!;
    if (errors['required']) {
      return 'Este campo es obligatorio';
    } else if (errors['pattern']) {
      //si no concuerda con el patrón del validator.service
      return 'Debe introducir un nombre y un apellido';
    }
    return '';
  }

  /** GESTIÓN de mensajes para la contraseña */
  get passwordErrorMsg(): string {
    const errors = this.miFormulario.get('password')?.errors!;
    if (errors['required']) {
      return 'Este campo es obligatorio';
    } else if (errors['pattern']) {
      //si no concuerda con el patrón del validator.service
      return 'Longitud mínima de 6 caracteres. Al menos una letra y un número. No símbolos.';
    }
    return '';
  }

  /**
   * Este método comprueba si los campos del formulario se han seleccionado y si son válidos o no
   * @param campo
   * @returns los campos del formulario que no son válidos
   */
  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  /**
   * Este método me dice qué campos del formulario son inválidos (para saber dónde hay errores mientras desarrollo)
   * @param formToInvestigate
   * @returns
   */
  public findInvalidControlsRecursive(
    formToInvestigate: FormGroup | FormArray
  ): string[] {
    var invalidControls: string[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        if (control?.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    };
    recursiveFunc(formToInvestigate);

    return invalidControls;
  }

  /**
   * Método al que se accede para registrar un usuario
   * si todos los campos del formulario son correctos, este método genera un usuario a través de los datos del formulario y
   * llama al método del servicio AccessService para registrar un usuario
   * Si la respuesta del servicio es exitosa:
   *  - el usuario se registra en el sistema
   *  - te redirije a la pestaña de login
   */
  register() {
    //console.log(this.findInvalidControlsRecursive(this.miFormulario));

    this.miFormulario.markAllAsTouched();

    if (this.miFormulario.valid) {
      let user: User = this.miFormulario.value;

      this.accessService
        .register(user) //hago la petición de registro
        .subscribe({
          next: (data) => {
            //borro los datos al hacer submit
            this.miFormulario.reset({
              fullName: '',
              email: '',
              username: '',
              password: '',
              condiciones: false,
            });
            Swal.fire({
              title: 'Bienvenid@ a FoodieCrush.',
              text: 'Inicie sesión para comenzar.',
              icon: 'success',
              confirmButtonText: 'Acceder',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('login');
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
