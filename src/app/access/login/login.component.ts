import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserDetails } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDetails: UserDetails | undefined;

  //PROPIEDADES de la vista
  email: string = '';
  password: string = '';

  constructor(public router: Router, private accessService: AccessService, private decodificarToken: JwtHelperService) { }

  ngOnInit(): void {
  }

  login(){
    
    this.accessService.login(this.email, this.password)
    .subscribe({
      next: (data => {

        localStorage.setItem('token', data.access_token); 
         this.accessService.getUsuario(); //llamo a este método para almacenar el usuario en el localStorage
        //console.log(this.decodificarToken.decodeToken(data.access_token)) //este método sirve para decodificar la info del token
        this.userDetails = this.decodificarToken.decodeToken(data.access_token);
        console.log(this.userDetails)
        Swal.fire({
          title: 'Sesión Iniciada',
          icon: 'success',
          confirmButtonText: 'Acceder',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('recipes');
            //this.router.navigate(['/publicar' ], {queryParams: {ocultar: true}}); PRUEBAS OCULTAR LOG OUT
          } 
        })
        
        
      }),
      error: e =>{
        Swal.fire(
        'Error', e.error.mensaje, 'error');  
        
      }
    })
  }


}
