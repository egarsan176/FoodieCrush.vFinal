import { Component, OnInit } from '@angular/core';
/**
 * Componente Spinner
 * Este componente aparece cuando estamos esperando la respuesta a una petición
 * Pertenece al módulo Shared
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
