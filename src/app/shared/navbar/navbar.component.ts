import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // PRUEBAS BehaviorSubject:
  //   PRUEBA1: (muestra de joaquín) https://jasonwatmore.com/post/2020/05/15/angular-9-role-based-authorization-tutorial-with-example
  //   PRUEBA2: https://rneto.es/blog/gestionar-estado-angular-rxjs-behaviorsubject-servicios-datos-observables/
  //   PRUEBA3: https://dev.to/dipteekhd/angular-behaviorsubject-p1


  user!: User | null;

  //private userServiceSubscription: Subscription | undefined;  //PRUEBA2

  constructor(private accessService: AccessService) { 
    //this.accessService.user.subscribe(x => this.user = x);  //PRUEBA1
  }

  ngOnInit(): void {
    //PRUEBA2
    // this.userServiceSubscription = this.accessService.currentUser.subscribe(  
    //   currentUser => {
    //     this.user = currentUser;
    //   }
    // );

    //PRUEBA3
    // this.accessService.getUsuariosubject().subscribe((userSubject) => {
    //   this.user = userSubject;
    // })

    //PRUEBA4
    // this.accessService.getUsuario().subscribe( (data) => {
    //   this.user = data;
    // })

    this.accessService.user.subscribe(x => this.user = x);  //PRUEBA1
    
  }


   //MÉTODO que llama al logout() del servicio para cerrar la sesión del usuario
   onlogout() {
    this.accessService.logout();
  }

  // ngOnDestroy(): void {
  //   this.userServiceSubscription?.unsubscribe();    //PRUEBA2
  // }

}
