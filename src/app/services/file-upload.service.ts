import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileDB } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private urlBase: string = environment.urlBase; //url a la que hacer la petición

  constructor(private http: HttpClient) {}

  //MÉTODO que hace una petición POST a /upload y almacena un fichero en la base de datos
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlBase}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    //console.log(req)
    return this.http.request(req); //te devuelve el mensaje de que el archivo se ha subido correctamente
  }

  //MÉTODO que hace una petición GET a /files y obtiene todos los ficheros almacenados en la base de datos
  getFiles(): Observable<any> {
    return this.http.get(`${this.urlBase}/files`);
  }

  //MÉTODO que hace una petición DELETE a /files pasándole el fichero y lo elimina de la base de datos
  deleteFile(file: File): Observable<HttpEvent<any>> {
    const url = `${this.urlBase}/files/${file}`;
    return this.http.delete<any>(url);
  }

  //MÉTODO que hace una petición GET a /files pasándole el nombre de un fichero y te devuelve el fichero que coincide con ese nombre
  getFileByName() {
    const name = localStorage.getItem('imgNAME');
    const url = `${this.urlBase}/files/${name}`;

    return this.http.get<FileDB>(url);
  }

  //MÉTODO que hace una petición GET a /file pasándole el id de una receta y te devuelve el fichero que está asociado a esa receta
  getFileByRecipeID(id: number) {
    const url = `${this.urlBase}/file/${id}`;
    return this.http.get<FileDB>(url);
  }
}
