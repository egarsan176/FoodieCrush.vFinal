import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
/**
 * Componente AllComments
 * Este componente muestra todos los comentarios existentes en la BBDD.
 * Se encuentra dentro del apartado Comentarios del Panel de Gestión del ADMIN
 */
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
  /**
   * Método para obtener todos los comentarios de la BBDD.
   * Se suscribe al método getAllCommentsFromBD() del servicio adminService e iguala
   * la respuesta a la variable allComentsBD del componente
   */
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
   * Este método sirve para obtener el estado de un comentario (aprobado por el admin o no)
   * Si la propiedad comment.isPending = true, el comentario está pendiente de aprobación,
   * si es false, está aprobado por el admin
   * @param recipe
   * @returns estado del (pendiente/aprobado)
   */
  getStatus(comment: any) {
    return comment.isPending ? 'pendiente' : 'aprobado';
  }
}
