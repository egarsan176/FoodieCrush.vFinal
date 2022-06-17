"use strict";(self.webpackChunkFoodieCrushFINAL=self.webpackChunkFoodieCrushFINAL||[]).push([[649],{9649:(x,s,n)=>{n.r(s),n.d(s,{ContactModule:()=>Z});var m=n(9808),c=n(592),a=n(2382),d=n(5226),u=n.n(d),o=n(7587),p=n(9103),g=n(8827);function f(t,i){if(1&t&&(o.TgZ(0,"span",26),o._uU(1),o.qZA()),2&t){const e=o.oxw();o.xp6(1),o.hij(" ",e.nameErrorMsg," ")}}function v(t,i){if(1&t&&(o.TgZ(0,"span",26),o._uU(1),o.qZA()),2&t){const e=o.oxw();o.xp6(1),o.hij(" ",e.emailErrorMsg," ")}}function C(t,i){if(1&t&&(o.TgZ(0,"span",26),o._uU(1),o.qZA()),2&t){const e=o.oxw();o.xp6(1),o.hij(" ",e.messageErrorMsg," ")}}const h=[{path:"",component:(()=>{class t{constructor(e,r,l){this.fb=e,this.validatorService=r,this.accesService=l,this.miFormulario=this.fb.group({fullName:["",[a.kI.required]],email:["",[a.kI.required,a.kI.pattern(this.validatorService.emailPattern)]],message:["",a.kI.required]})}ngOnInit(){this.miFormulario.reset()}get nameErrorMsg(){var e;return(null===(e=this.miFormulario.get("fullName"))||void 0===e?void 0:e.errors).required?"Este campo es obligatorio":""}get emailErrorMsg(){var e;const r=null===(e=this.miFormulario.get("email"))||void 0===e?void 0:e.errors;return r.required?"El email es obligatorio":r.pattern?"El valor ingresado no tiene formato de correo":""}get messageErrorMsg(){var e;return(null===(e=this.miFormulario.get("message"))||void 0===e?void 0:e.errors).required?"Este campo es obligatorio":""}campoNoValido(e){var r,l;return(null===(r=this.miFormulario.get(e))||void 0===r?void 0:r.invalid)&&(null===(l=this.miFormulario.get(e))||void 0===l?void 0:l.touched)}contactUs(){this.miFormulario.markAllAsTouched(),this.miFormulario.valid&&this.accesService.sendMessage(this.miFormulario.value).subscribe({next:r=>{this.miFormulario.reset(),u().fire({title:"Mensaje Enviado",text:"Le contestaremos lo antes posible.",icon:"success",confirmButtonText:"Aceptar"})},error:r=>{u().fire("Error",r.error.mensaje,"error")}})}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(a.qu),o.Y36(p.o),o.Y36(g.v))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-contact"]],decls:41,vars:5,consts:[[1,"row","p-1","my-3","justify-content-center"],["aria-label","breadcrumb"],[1,"breadcrumb"],["aria-current","page",1,"breadcrumb-item","active"],[1,"row"],[1,"col-12"],[1,"mx-5","mb-5"],[1,"card"],[1,"card-header","colorYellowP","m-2"],[1,"card-heading","text-center"],[1,"card-body"],[1,"mb-2","text-center"],[1,"text-muted","text-sm","mb-2","d-none","d-md-block","d-sm-block","text-center"],[1,"contact-form",3,"formGroup","ngSubmit"],[1,"col-md"],[1,"form-floating","mb-3"],["formControlName","fullName","id","floatingName","type","text","placeholder","Nombre",1,"form-control"],["class","form-text text-danger",4,"ngIf"],["for","floatingName"],["id","floatingInput","formControlName","email","type","email","placeholder","name@example.com",1,"form-control"],["for","floatingInput"],[1,"col"],["id","floatingInputMsg","formControlName","message","type","text","placeholder","Escribe aqu\xed tu consulta",1,"form-control"],["for","floatingInputMsg"],[1,"form-group","text-center"],["type","submit","type","submit",1,"btn","colorPurpleP",3,"disabled"],[1,"form-text","text-danger"]],template:function(e,r){1&e&&(o.TgZ(0,"div",0)(1,"nav",1)(2,"ol",2)(3,"li",3),o._uU(4,"CONTACTO"),o.qZA()()()(),o.TgZ(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7)(9,"div",8)(10,"div",9),o._uU(11,"Foodie Crush Contact"),o.qZA()(),o.TgZ(12,"div",10)(13,"h5",11),o._uU(14,"\xbfTe ayudamos?"),o.qZA(),o.TgZ(15,"p",12),o._uU(16," Si tienes dudas o alg\xfan problema, no dudes en ponerte en contacto. \xa1Intentaremos responder lo antes posible! "),o.qZA(),o.TgZ(17,"form",13),o.NdJ("ngSubmit",function(){return r.contactUs()}),o.TgZ(18,"div",4)(19,"div",14)(20,"div",15),o._UZ(21,"input",16),o.YNc(22,f,2,1,"span",17),o.TgZ(23,"label",18),o._uU(24,"Nombre"),o.qZA()()(),o.TgZ(25,"div",14)(26,"div",15),o._UZ(27,"input",19),o.YNc(28,v,2,1,"span",17),o.TgZ(29,"label",20),o._uU(30,"Email"),o.qZA()()()(),o.TgZ(31,"div",4)(32,"div",21)(33,"div",15),o._UZ(34,"input",22),o.YNc(35,C,2,1,"span",17),o.TgZ(36,"label",23),o._uU(37,"Mensaje"),o.qZA()()()(),o.TgZ(38,"div",24)(39,"button",25),o._uU(40," ENVIAR "),o.qZA()()()()()()()()),2&e&&(o.xp6(17),o.Q6J("formGroup",r.miFormulario),o.xp6(5),o.Q6J("ngIf",r.campoNoValido("fullName")),o.xp6(6),o.Q6J("ngIf",r.campoNoValido("email")),o.xp6(7),o.Q6J("ngIf",r.campoNoValido("message")),o.xp6(4),o.Q6J("disabled",r.miFormulario.invalid))},dependencies:[m.O5,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u]}),t})()}];let b=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[c.Bz.forChild(h),c.Bz]}),t})(),Z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[m.ez,b,a.u5,a.UX]}),t})()}}]);