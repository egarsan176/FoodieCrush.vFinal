import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
/**
 * Componente AppUploadRecipeFile
 * Este componente sirve para poder subir una imagen cuando estamos en el formulario que publica una receta
 */
@Component({
  selector: 'app-upload-recipe-file',
  templateUrl: './upload-recipe-file.component.html',
  styleUrls: ['./upload-recipe-file.component.css'],
})
export class UploadRecipeFileComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  mostrar: boolean = false;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    //this.fileInfos = this.uploadService.getFiles(); //cargo en el init los ficheros ya almacenados
  }

  /**
   * Este método sirve para obtener los archivos seleccionados
   * @param event
   */
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  //MÉTODO que se suscribe al upload() del servicio para subir una imagen
  /**
   * Este método se encarga de subir una imagen a la base de datos a través
   * de una suscripción al servicio uploadService
   * Si la respuesta de la petición tiene éxito, nos devuelve un mensaje indicando
   * que se ha subido correctamente y almacena en el localStorage el nombre de la imagen.
   * Si la respuesta no tiene éxito, mensaje de error indicando que no se ha podido subir
   */
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              let index = this.message.lastIndexOf(':') + 2;
              localStorage.setItem('imgNAME', this.message.substring(index));
              console.log(this.message);
              this.fileInfos = this.uploadService.getFiles();
              this.mostrar = true;
              //console.log(this.currentFile)
              //console.log(JSON.stringify(this.currentFile))  //devuelve {}
            }
          },
          error: (err: any) => {
            Swal.fire('Error', err.error.message, 'error');
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'No se ha podido subir el archivo';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  /**
   * Este método sirve para eliminar una imagen a través de una suscripción al
   * servicio uploadService con el fichero que queremos eliminar
   * @param file
   */
  deleteFile(file: File) {
    this.uploadService.deleteFile(file).subscribe;
    this.fileInfos = this.uploadService.getFiles();
  }

  //   We use selectedFiles for accessing current File as the first Item.
  //Then we call uploadService.upload() method on the currentFile.

  // The progress will be calculated basing on event.loaded and event.total.
  // If the transmission is done, the event will be a HttpResponse object.
  //At this time, we call uploadService.getFiles() t
}
