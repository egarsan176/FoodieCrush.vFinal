import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-recipe-file',
  templateUrl: './upload-recipe-file.component.html',
  styleUrls: ['./upload-recipe-file.component.css'],
})
export class UploadRecipeFileComponent implements OnInit {
  //PROPIEDADES
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  mostrar: boolean = false;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles(); //cargo en el init los ficheros ya almacenados
  }

  //MÉTODO para obtener los archivos seleccionados.
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  //MÉTODO que se suscribe al upload() del servicio para subir una imagen
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
              localStorage.setItem('imgNAME', file.name);
              this.message = event.body.message;
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

  //MÉTODO que se suscribe al deleteFile() del servicio para elminar una imagen
  //no se usa todavía
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
