import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approved-comments',
  templateUrl: './approved-comments.component.html',
  styleUrls: ['./approved-comments.component.css'],
})
export class ApprovedCommentsComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  first = 0;
  rows = 10;
  pending: boolean = true;
  commentsApproved: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getCommentsApproved();
  }

  /**
   * El administrador accede a este método para conocer todos los comentarios
   * aprobados a través de una subcripción al servicio
   * adminService. Si la respuesta es éxitosa, la propiedad commentsApproved del componente
   * se iguala a la respuesta de la petición
   */
  getCommentsApproved() {
    this.adminService.getCommentsApproved().subscribe({
      next: (data) => {
        this.commentsApproved = data;
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
}
