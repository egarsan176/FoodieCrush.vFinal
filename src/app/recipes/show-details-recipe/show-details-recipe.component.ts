import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileDB, RecipeComment, User } from 'src/app/interfaces/interface';
import { AccessService } from 'src/app/services/access.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RecipesService } from 'src/app/services/Recipes.service';
import Swal from 'sweetalert2';
/**
 * Componente ShowDetailsComponent
 * Este componente nos sirve para mostrar una receta en sí (sus detalles)
 */
@Component({
  selector: 'app-show-details-recipe',
  templateUrl: './show-details-recipe.component.html',
  styleUrls: ['./show-details-recipe.component.css'],
})
export class ShowDetailsRecipeComponent implements OnInit {
  /**
   * PROPIEDADES
   */
  @Input() id: number = 0;
  recipe: any; //dejo tipo any porque al no estar la categoría definida en receta como una interfaz aparte no me deja obtener el nombre
  ruta: string = '';
  user!: User;
  file!: FileDB;
  img: string = '';
  mostrar: boolean = false;
  comments!: any[]; //dejo any porque la clase comment del back es diferente a la del front y no puedo recuperar el usuario que en el front no existe
  showComments: boolean = false;
  texto: string = '';
  commentRecipe: RecipeComment = {
    message: '',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private fileService: FileUploadService,
    private accessService: AccessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showRecipeDetails(); //para que la receta se muestre al cargar la página
  }

  /**
   * Este método sirve para obtener una receta completa a través del servicio recipeService, al cual se suscribe
   * si la suscripción tiene éxito nos devuelve los detalles de la receta que coincide con el id que indicamos
   * si no es correcta nos devuelve el mensaje de error de la API
   */
  showRecipeDetails() {
    this.recipeService
      .showRecipe(this.activeRoute.snapshot.params['id'])
      .subscribe({
        next: (data) => {
          this.getUserByRecipe(data.id); //para obtener al usuario asociado a esa receta
          this.getFileByRecipe(data.id); //para obtener la imagen asociada a esa receta
          this.getCommentsFromRecipe(data.id); //para obtener los comentarios de la receta

          this.recipe = data;
          this.mostrar = true;
          //console.log(this.recipe);
          localStorage.removeItem('cIDr');
        },
        error: (e) => {
          Swal.fire('Error', e.error.mensaje, 'error');
        },
      });
  }

  /**
   * Este método nos sirve para obtener el autor que ha publicado una receta
   * A través del servicio recipeService, si la suscripción tiene éxito nos
   * devuelve el usuario asociado a la receta que coincide con el id que le pasamos,
   * si no es correcta, error
   * @param id de la receta de la que queremos saber su autor
   */
  getUserByRecipe(id: number) {
    this.recipeService.getUserByRecipe(id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método nos sirve para obtener el fichero asociado a una receta
   * A través del servicio recipeService, si la suscripción tiene éxito nos
   * devuelve el fichero asociado a la receta que coincide con el id que le pasamos,
   * si no, devuelve error
   * @param id de la receta de la que queremos obtener su fichero
   */
  getFileByRecipe(id: number) {
    this.fileService.getFileByRecipeID(id).subscribe({
      next: (data) => {
        if (data != null) {
          this.img = this.recipeService.getImage(data);
        }
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para obtener los comentarios de una receta y que se muestren en la pestaña comentarios de la receta
   * @param id de la receta
   */
  getCommentsFromRecipe(id: number) {
    //se muestran los comentarios que ya han sido aprobados por el admin
    this.recipeService.getCommentsNotPendingFromRecipe(id).subscribe({
      next: (data) => {
        this.comments = data;
        this.showComments = true;
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para publicar un comentario en la receta
   * @param id
   */
  addComment(id: number) {
    this.commentRecipe.message = this.texto;
    this.recipeService.addCommentToRecipe(id, this.commentRecipe).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Comentario publicado',
          text: 'Su comentario se ha publicado con éxito. Estará visible cuando el administrador lo confirme.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.texto = '';
      },
      error: (e) => {
        Swal.fire('Error', e.error.mensaje, 'error');
      },
    });
  }

  /**
   * Este método sirve para volver a la página anterior de la vista
   * Se hace de esta forma y no con un router-link en la vista porque este componente es reutilizable
   */
  back() {
    history.back();
  }

  /**
   * Este método sirve para que no se puedan escribir comentarios si no hay usuario en la sesión en ese momento
   * @returns token o null
   */
  showPostComment() {
    return this.accessService.getToken();
  }

  /**
   * Este método guarda en el localStorage el id de la receta cuando se quiere publicar un comentario y no se ha iniciado sesión.
   * Te dirije al login
   */
  saveIDtoComment() {
    let idRecipe = this.activeRoute.snapshot.params['id'];

    localStorage.setItem('cIDr', idRecipe);
    this.router.navigateByUrl('/login');
  }
}
