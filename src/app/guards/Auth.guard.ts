import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import Swal from "sweetalert2";
import { AccessService } from "../services/access.service";

@Injectable({
    providedIn: 'root'
  })

  export class AuthGuard implements CanActivate{

    constructor(private accessService: AccessService, public router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.accessService.validarToken()
      .pipe(
        map( resp => {
            //si me devuelve algo (un [] vacío) significa que el token NO ha expirado
          //console.log(resp);

          return true
        }),
        catchError( e => {
          //si me devuelve error es que el token ha expirado
            Swal.fire(  //devuelve el mensaje de la fakeAPi verificarToken
              {
              title: 'No tiene acceso a esta página',
              text: 'Inicie sesión',
              icon: 'error',
              confirmButtonText: 'Ok'
            }
            )

            //si el token no es válido me redirije al login
            this.router.navigate(['access']); // es lo mismo que: this.router.navigateByUrl('login');
            return of(false)
        })
      )
    }
    
}