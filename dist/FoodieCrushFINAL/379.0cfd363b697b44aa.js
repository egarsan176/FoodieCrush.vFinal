"use strict";(self.webpackChunkFoodieCrushFINAL=self.webpackChunkFoodieCrushFINAL||[]).push([[379],{9379:(I,_,o)=>{o.r(_),o.d(_,{SearchByIngredientsModule:()=>x});var c=o(6895),g=o(1948),m=o(5226),C=o.n(m),e=o(8274),f=o(5800),p=o(433),B=o(4984);function n(t,a){1&t&&(e.TgZ(0,"div"),e._UZ(1,"app-spinner"),e.qZA())}function r(t,a){1&t&&(e.TgZ(0,"div"),e._UZ(1,"img",28),e.qZA())}function s(t,a){if(1&t&&(e.TgZ(0,"div"),e._UZ(1,"img",29),e.qZA()),2&t){const i=e.oxw().$implicit,d=e.oxw(3);e.xp6(1),e.s9C("src",d.obtenerImagenReceta(i.file),e.LSH),e.s9C("alt",i.recipeName)}}function l(t,a){if(1&t&&(e.TgZ(0,"h5",30),e._uU(1),e.qZA()),2&t){const i=e.oxw().$implicit;e.xp6(1),e.hij(" ",i.recipeName.toUpperCase()," ")}}function u(t,a){if(1&t&&(e.TgZ(0,"h5",31),e._uU(1),e.qZA()),2&t){const i=e.oxw().$implicit;e.s9C("title",i.recipeName.toUpperCase()),e.xp6(1),e.hij(" ",i.recipeName.toUpperCase().substr(0,20)+" ..."," ")}}const h=function(t){return["/recipes/details",t]};function y(t,a){if(1&t&&(e.TgZ(0,"div",21)(1,"div",22),e.YNc(2,r,2,0,"div",13),e.YNc(3,s,2,2,"div",13),e.TgZ(4,"div",23),e.YNc(5,l,2,1,"h5",24),e.YNc(6,u,2,2,"h5",25),e.qZA(),e.TgZ(7,"div",26)(8,"a",27),e._uU(9,"Ver m\xe1s"),e.qZA()()()()),2&t){const i=a.$implicit;e.xp6(2),e.Q6J("ngIf",null==i.file),e.xp6(1),e.Q6J("ngIf",null!=i.file),e.xp6(2),e.Q6J("ngIf",i.recipeName.length<=25),e.xp6(1),e.Q6J("ngIf",i.recipeName.length>25),e.xp6(2),e.Q6J("routerLink",e.VKq(5,h,i.id))}}function T(t,a){if(1&t&&(e.TgZ(0,"div",18)(1,"p"),e._uU(2," Mostrando recetas con los ingredientes: "),e.TgZ(3,"b"),e._uU(4),e.qZA(),e._uU(5,". "),e.qZA(),e.TgZ(6,"div",19),e.YNc(7,y,10,7,"div",20),e.qZA()()),2&t){const i=e.oxw(2);e.xp6(4),e.Oqu(i.search),e.xp6(3),e.Q6J("ngForOf",i.recipes)}}function S(t,a){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,T,8,2,"div",17),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.recipes.length>0)}}function A(t,a){if(1&t&&(e.TgZ(0,"div",32)(1,"p"),e._uU(2," \xa1Vaya !No tenemos recetas que contengan exactamente los ingredientes: "),e.TgZ(3,"b"),e._uU(4),e.qZA(),e._uU(5,". "),e.qZA(),e._UZ(6,"img",33),e.qZA()),2&t){const i=e.oxw();e.xp6(4),e.Oqu(i.search)}}const Z=[{path:"",component:(()=>{class t{constructor(i){this.recipeService=i,this.search="",this.recipes=[]}ngOnInit(){}obtenerImagenReceta(i){return this.recipeService.getImage(i)}getRecipe(i){this.pending=!0;let d=i.split(",");this.recipeService.getRecipesFromIngredients(JSON.parse(JSON.stringify(d))).subscribe({next:v=>{this.recipes=v,this.pending=!1},error:v=>{C().fire("Error",v.error.mensaje,"error")}})}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(f.v))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-search-by-ingredients"]],decls:30,vars:4,consts:[[1,"row","p-1","my-3","justify-content-center"],["aria-label","breadcrumb"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","/search"],["aria-current","page",1,"breadcrumb-item","active"],[1,"row","m-3"],[1,"col","text-center"],[1,"col"],[1,"form-floating","mb-3"],["id","floatingInput","type","text","placeholder","Nombre","name","Nombre","email","","aria-required","true",1,"form-control",3,"ngModel","ngModelChange"],["for","floatingInput"],[1,"btn","colorYellowP","m-1",3,"click"],[4,"ngIf"],["class","m-4 text-center",4,"ngIf"],[1,"text-center","mb-2"],["routerLink","/search",1,"btn","colorPurpleP"],["class","m-3",4,"ngIf"],[1,"m-3"],[1,"row","row-cols-1","row-cols-sm-3","row-cols-lg-4","justify-content-center"],["class","col mb-2",4,"ngFor","ngForOf"],[1,"col","mb-2"],[1,"card","text-center","h-100","my-2"],[1,"card-body"],["class","card-title",4,"ngIf"],["class","card-title","data-bs-toggle","tooltip",3,"title",4,"ngIf"],[1,"card-footer"],[1,"btn","colorGreenP",3,"routerLink"],["src","assets/img/logo.svg","id","fileNotFound","alt","Imagen no encontrada",1,"card-img-top"],[1,"card-img-top","pic",3,"src","alt"],[1,"card-title"],["data-bs-toggle","tooltip",1,"card-title",3,"title"],[1,"m-4","text-center"],["src","assets/img/404-error.png","alt","No se encuentran resultados","id","notFound"]],template:function(i,d){1&i&&(e.TgZ(0,"div",0)(1,"nav",1)(2,"ol",2)(3,"li",3)(4,"a",4),e._uU(5,"BUSCADOR"),e.qZA()(),e.TgZ(6,"li",5),e._uU(7," BUSCAR RECETA POR INGREDIENTES "),e.qZA()()()(),e.TgZ(8,"div",6)(9,"div",7)(10,"p"),e._uU(11," Aqu\xed podr\xe1s encontrar recetas para esos ingredientes que te miran desde hace semanas en la nevera. "),e.qZA(),e.TgZ(12,"p"),e._uU(13," Escribe aqu\xed abajo tantos ingredientes como quieras separados por comas < , >. "),e.qZA()()(),e.TgZ(14,"div")(15,"div",6)(16,"div",8)(17,"div",9)(18,"input",10),e.NdJ("ngModelChange",function(N){return d.search=N}),e.qZA(),e.TgZ(19,"label",11),e._uU(20,"Ingrediente/s: "),e.qZA(),e.TgZ(21,"button",12),e.NdJ("click",function(){return d.getRecipe(d.search)}),e._uU(22," BUSCAR "),e.qZA()()()()(),e.YNc(23,n,2,0,"div",13),e.YNc(24,S,2,1,"div",13),e.YNc(25,A,7,1,"div",14),e.TgZ(26,"div",0)(27,"div",15)(28,"button",16),e._uU(29," VOLVER AL BUSCADOR "),e.qZA()()()),2&i&&(e.xp6(18),e.Q6J("ngModel",d.search),e.xp6(5),e.Q6J("ngIf",d.pending),e.xp6(1),e.Q6J("ngIf",null!=d.recipes),e.xp6(1),e.Q6J("ngIf",null==d.recipes))},dependencies:[c.sg,c.O5,g.rH,g.yS,p.Fj,p.JJ,p.on,p.On,B.O]}),t})()}];let $=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[g.Bz.forChild(Z),g.Bz]}),t})();var R=o(4466);let x=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[c.ez,$,p.u5,R.m]}),t})()},5800:(I,_,o)=>{o.d(_,{v:()=>f});var c=o(529),g=o(2340),m=o(8274),C=o(1948),e=o(8827);let f=(()=>{class p{constructor(n,r,s){this.httpClient=n,this.router=r,this.accessService=s,this.urlBase=g.N.urlBase}publicar(n){let r=this.accessService.getToken();const s=`${this.urlBase}/recipes`,l=n,u=new c.WM({"Content-Type":"application/json",Authorization:`Bearer ${r}`});return this.httpClient.post(s,l,{headers:u})}getRecipesFromUser(n){let r=this.accessService.getToken();const s=(new c.LE).set("userID",n.id),l=new c.WM({"Content-Type":"application/json",Authorization:`Bearer ${r}`});return this.httpClient.get(`${this.urlBase}/recipes?${s}`,{headers:l})}getRecipesByCategory(n){const r=(new c.LE).set("categoryID",n);return this.httpClient.get(`${this.urlBase}/mostrar?${r}`)}showRecipe(n){return this.httpClient.get(`${this.urlBase}/mostrar/${n}`)}getUserByRecipe(n){return this.httpClient.get(`${this.urlBase}/mostrar/recipe/${n}`)}getCategory(n){return this.httpClient.get(`${this.urlBase}/category/${n}`)}getImage(n){return`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(n.data)))}`+n.data}getAllRecipes(){let n=this.accessService.getToken();const r=new c.WM({"Content-Type":"application/json",Authorization:`Bearer ${n}`});return this.httpClient.get(`${this.urlBase}/recipes`,{headers:r})}deleteRecipe(n){let r=this.accessService.getToken();const s=new c.WM({"Content-Type":"application/json",Authorization:`Bearer ${r}`});return this.httpClient.delete(`${this.urlBase}/recipes/${n}`,{headers:s})}editRecipe(n,r){let s=this.accessService.getToken();const l=new c.WM({"Content-Type":"application/json",Authorization:`Bearer ${s}`});return this.httpClient.put(`${this.urlBase}/recipes/${n}`,r,{headers:l})}addCommentToRecipe(n,r){let s=this.accessService.getToken();const l=new c.WM({"Content-Type":"application/json",Authorization:`Bearer ${s}`});return this.httpClient.post(`${this.urlBase}/recipes/${n}/comments`,r,{headers:l})}getCommentsNotPendingFromRecipe(n){return this.httpClient.get(`${this.urlBase}/mostrar/recipe/${n}/comments`)}deleteComment(n){let r=this.accessService.getToken();const s=new c.WM({"Content-Type":"application/json",Authorization:`Bearer ${r}`});return this.httpClient.delete(`${this.urlBase}/recipes/comments/${n}`,{headers:s})}getRecipeByName(n){const r=(new c.LE).set("recipeName",n);return this.httpClient.get(`${this.urlBase}/mostrar/recipes/name?${r}`)}getRecipeBySimilarName(n){const r=(new c.LE).set("recipeName",n);return this.httpClient.get(`${this.urlBase}/mostrar/recipes/similar?${r}`)}getRecipesFromIngredients(n){let r=new c.LE;return r=r.append("ingredientList",n),this.httpClient.get(`${this.urlBase}/mostrar/recipes/ingredients`,{params:r})}getIngredientsFromBD(){return this.httpClient.get(`${this.urlBase}/mostrar/ingredients`)}}return p.\u0275fac=function(n){return new(n||p)(m.LFG(c.eN),m.LFG(C.F0),m.LFG(e.v))},p.\u0275prov=m.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()}}]);