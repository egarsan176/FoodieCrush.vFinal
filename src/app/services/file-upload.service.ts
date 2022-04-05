import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileDB } from '../interfaces/interface';
/**
 * FileUploadService
 * Este servicio se encarga de gestionar las peticiones relacionadas con los ficheros
 */
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private urlBase: string = environment.urlBase; //url a la que hacer la petición

  constructor(private http: HttpClient) {}

  /**
   * Este método es al que se llama al subir una imagen en el formulario para
   * publicar una receta. Hace una petición POST a la url de la api
   * @param file  fichero que se quiere subir a la bbdd
   * @returns mensaje indicando si se ha almacenado en la bbdd o no
   */
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlBase}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  /**
   * Este método hace una petición GET a /files y sirve para obtener
   * todos los ficheros almacenados en la base de datos
   * @returns ficheros de la bbdd
   */
  getFiles(): Observable<any> {
    return this.http.get(`${this.urlBase}/files`);
  }

  //MÉTODO que hace una petición DELETE a /files pasándole el fichero y lo elimina de la base de datos
  deleteFile(file: File): Observable<HttpEvent<any>> {
    const url = `${this.urlBase}/files/${file}`;
    return this.http.delete<any>(url);
  }

  /**
   * A este método se accede para publicar una receta y sirve para obtener el fichero
   * que coincide con el nombre que se encuentra almacenado en el localStorage a
   * través de una petición GET a /files
   * @returns fichero que coincide con el nombre que se indica
   */
  getFileByName() {
    const name = localStorage.getItem('imgNAME');
    const url = `${this.urlBase}/files/${name}`;

    return this.http.get<FileDB>(url);
  }

  /**
   * Este método sirve para, a través de una petición GET, obtener el
   * fichero asociado a una receta
   * @param id de la receta de la que queremos el fichero
   * @returns fichero de la receta que coincide con el id que se le pasa por parámetro
   */
  getFileByRecipeID(id: number) {
    const url = `${this.urlBase}/file/${id}`;
    return this.http.get<FileDB>(url);
  }
}
