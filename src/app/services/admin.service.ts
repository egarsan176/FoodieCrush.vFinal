import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccessService } from './access.service';
/**
 * AdminService
 * Este servicio gestiona todas las peticiones que tienen que ver con la gestión de tareas  del administrador
 */
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private urlBase: string = environment.urlBase; //url a la que hacer las peticiones

  constructor(
    private httpClient: HttpClient,
    public router: Router,
    private accessService: AccessService
  ) {}

  /**
   * MÉTODO que hace una petición GET a /admin/recipes para obtener el listado de tareas
   * que NO han sido aprobadas por el administrador
   * @returns listado de recetas pendientes de aprobación
   */
  getRecipesPending() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'true');

    const url = `${this.urlBase}/admin/recipes?${params}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any[]>(url, { headers });
  }

  /**
   * MÉTODO que hace una petición GET a /admin/recipes para obtener el listado de tareas
   * que SÍ han sido aprobadas por el administrador
   * @returns listado de recetas aprobadas
   */
  getRecipesNotPending() {
    let token = this.accessService.getToken();
    const params = new HttpParams().set('isPending', 'false');

    const url = `${this.urlBase}/admin/recipes?${params}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any[]>(url, { headers });
  }
}
