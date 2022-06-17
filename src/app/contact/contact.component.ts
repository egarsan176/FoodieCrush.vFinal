import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactMsg } from '../interfaces/interface';
import { AccessService } from '../services/access.service';
import { ValidatorService } from '../services/validator.service';
/**
 * Componente Contact
 * Este componente sirve para que el usuario pueda rellenar el formulario de contacto para ponerse en contacto con
 * el admin de la página
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  miFormulario: UntypedFormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    /** el email tiene que concordar con el patrón de email del validator-service*/
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ],
    ],
    message: ['', Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private validatorService: ValidatorService,
    private accesService: AccessService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset();
  }

  /** GESTIÓN de mensajes para el error del nombre */
  get nameErrorMsg(): string {
    const errors = this.miFormulario.get('fullName')?.errors!;
    if (errors['required']) {
      return 'Este campo es obligatorio';
    }
    return '';
  }

  /** GESTIÓN de mensajes para el error del campo email */
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors!;
    if (errors['required']) {
      return 'El email es obligatorio';
    } else if (errors['pattern']) {
      //si no concuerda con el patrón del validator.service
      return 'El valor ingresado no tiene formato de correo';
    }

    return '';
  }

  /** GESTIÓN de mensajes para el error del nombre */
  get messageErrorMsg(): string {
    const errors = this.miFormulario.get('message')?.errors!;
    if (errors['required']) {
      return 'Este campo es obligatorio';
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
   * A este método se accede cuando se envía el formulario de contacto, que a través de una petición en el
   * servicio AccessService, envía un email al correo de la página web.
   */
  contactUs() {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.valid) {
      let message: ContactMsg = this.miFormulario.value;

      this.accesService.sendMessage(message).subscribe({
        next: (data) => {
          this.miFormulario.reset();
          Swal.fire({
            title: 'Mensaje Enviado',
            text: 'Le contestaremos lo antes posible.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
    }
  }
}
