import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import Swal from "sweetalert2";
import { AccessService } from "../services/access.service";

/**
 * Este Guard se ejecuta antes de cargar una ruta y determina si la ruta se puede cargar o no.
 * Si el guardián devuelve true, la ruta sigue su carga normal y si retorna false (no se cumple la condición del guard), se redirije a otra ruta
 */
@Injectable({
    providedIn: 'root'
  })
/**
 * Existen 4 tipos de Guard:
 *  - (CanActivate) Antes de cargar los componentes de la ruta
 *  - (CanLoad) Antes de cargar los recursos (assets) de la ruta.
 *  - (CanDeactivate) Antes de intentar salir de la ruta actual (usualmente utilizado para evitar salir de una ruta, si no se han guardado los datos).
 *  - (CanActivateChild) Antes de cargar las rutas hijas de la ruta actual
 * 
 * info: https://binary-coffee.dev/post/guards-en-angular-como-funcionan
 */
export class AuthGuard implements CanActivate{

  constructor(private accessService: AccessService, public router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.accessService.validarToken()
    .pipe(
      map( resp => {
          //si me devuelve algo (un [] vacío) significa que el token NO ha expirado

            return true
      }),
      catchError( e => {
        //si me devuelve error es que no hay token o ha expirado
          Swal.fire(  
            {
            title: 'No tiene acceso a esta página',
            text: 'Inicie sesión',
            icon: 'error',
            confirmButtonText: 'Ok'
          }
          )

          this.router.navigate(['access']); 
          return of(false)
      })
    )
  }
    
}