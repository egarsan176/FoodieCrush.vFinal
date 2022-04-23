import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css'],
})
export class AllCommentsComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  pending: boolean = true;
  allCommentsBD: any[] = []; //utilizo any porque la clase Comment que tengo declarada en el front no tiene todas las propiedades de la clase Comment existente en el back

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllCommentsFromBD();
  }

  getAllCommentsFromBD() {
    this.adminService.getAllCommentsFromBD().subscribe({
      next: (data) => {
        this.allCommentsBD = data;
        this.pending = false;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  setID(id: any) {
    localStorage.setItem('idComment', id);
  }

  /**
   * El administrador accede a este método para leer el contenido del comentario
   * @param comment
   */
  showComment(comment: any) {
    Swal.fire(
      'Contenido del comentario con id: ' + comment.id,
      comment.message,
      'info'
    );
  }

  /**
   * Método para volver a la página anterior en la vista
   */
  back() {
    history.back();
  }

  /**
   * Este método sirve para obtener el estado de una receta (aprobada por el admin o no)
   * Si la propiedad recipe.pending = true, la receta está pendiente de aprobación,
   * si es false, está aprobada por el admin
   * @param recipe
   * @returns estado de la receta (pendiente/aprobada)
   */
  getStatus(comment: any) {
    return comment.isPending ? 'pendiente' : 'aprobada';
  }
}
