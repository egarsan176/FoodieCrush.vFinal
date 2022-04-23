import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-comments',
  templateUrl: './pending-comments.component.html',
  styleUrls: ['./pending-comments.component.css'],
})
export class PendingCommentsComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  first = 0;
  rows = 10;
  pending: boolean = true;
  commentsPending: any[] = [];

  constructor(
    private adminService: AdminService,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.getCommentsPending();
  }

  /**
   * El administrador accede a este método para conocer todos los comentarios
   * pendientes de aprobación a través de una subcripción al servicio
   * adminService. Si la respuesta es éxitosa, la propiedad commentsPending del componente
   * se iguala a la respuesta de la petición
   */
  getCommentsPending() {
    this.adminService.getCommentsPending().subscribe({
      next: (data) => {
        this.commentsPending = data;
        this.pending = false;
        //console.log(data);
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

  changeStatusComment(id: number) {
    this.adminService.changeStatusComment(id).subscribe({
      next: (data) => {
        this.getCommentsPending();
        Swal.fire({
          title: 'Cambio de Estado Satisfactorio',
          text: 'El comentario con id  ' + data.id + ' ha sido aprobado.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  deleteComment(id: number) {
    Swal.fire({
      title: 'Eliminación de comentario',
      text: 'A continuación vas a eliminar este comentario. ¿Seguro que deseas eliminar esta receta?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sí, quiero borrar el comentario.',
      denyButtonText: `No.`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipesService.deleteComment(id).subscribe({
          next: (data) => {
            this.getCommentsPending();
            if (data == null) {
              Swal.fire({
                title: 'Comentario Eliminado',
                text: 'El comentario con id  ' + id + ' ha sido eliminado.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
            }
          },
          error: (e) => {
            Swal.fire('Error', e.error.mensaje, 'error');
          },
        });
      }
    });
  }

  /**
   * Método para volver a la página anterior en la vista
   */
  back() {
    history.back();
  }
}
