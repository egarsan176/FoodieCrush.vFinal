"use strict";(self.webpackChunkFoodieCrushFINAL=self.webpackChunkFoodieCrushFINAL||[]).push([[659],{7659:(S,s,r)=>{r.r(s),r.d(s,{ApprovedCommentsModule:()=>O});var a=r(9808),p=r(592),c=r(5226),d=r.n(c),e=r(7587),l=r(7501),u=r(4984),m=r(3495),v=r(9783);function A(t,n){1&t&&(e.TgZ(0,"div"),e._UZ(1,"app-spinner"),e.qZA())}function C(t,n){1&t&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"\xa1Vaya! A\xfan no has aprobado ning\xfan comentario. !Date prisa!"),e.qZA()())}function g(t,n){1&t&&(e.TgZ(0,"p"),e._uU(1," Solo existe 1 comentario aprobado. "),e.qZA())}function f(t,n){if(1&t&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&t){const o=e.oxw(3);e.xp6(1),e.hij(" Existen un total de ",o.commentsApproved.length," comentarios aprobados. ")}}function Z(t,n){1&t&&(e.TgZ(0,"tr",15)(1,"th",16),e._uU(2," ID "),e._UZ(3,"p-sortIcon",17),e.qZA(),e.TgZ(4,"th",18),e._uU(5," PUBLICADO POR "),e._UZ(6,"p-sortIcon",19),e.qZA(),e.TgZ(7,"th",20),e._uU(8," RECETA "),e._UZ(9,"p-sortIcon",21),e.qZA(),e.TgZ(10,"th",22),e._uU(11," FECHA PUBLICACI\xd3N "),e._UZ(12,"p-sortIcon",23),e.qZA(),e.TgZ(13,"th",24),e._uU(14,"VER"),e.qZA()())}function T(t,n){if(1&t){const o=e.EpF();e.TgZ(0,"tr",25)(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td")(10,"button",26),e.NdJ("click",function(){const P=e.CHM(o).$implicit,M=e.oxw(3);return e.KtG(M.showComment(P))}),e._UZ(11,"i",27),e.qZA()()()}if(2&t){const o=n.$implicit;e.xp6(2),e.Oqu(o.id),e.xp6(2),e.Oqu(o.username.toUpperCase()),e.xp6(2),e.Oqu(o.recipeName.toUpperCase()),e.xp6(2),e.Oqu(o.fechaBonita)}}const h=function(){return[10,25,50]};function _(t,n){if(1&t&&(e.TgZ(0,"div"),e.YNc(1,g,2,0,"p",8),e.YNc(2,f,2,1,"p",8),e.TgZ(3,"p-table",12),e.YNc(4,Z,15,0,"ng-template",13),e.YNc(5,T,12,4,"ng-template",14),e.qZA()()),2&t){const o=e.oxw(2);e.xp6(1),e.Q6J("ngIf",1==o.commentsApproved.length),e.xp6(1),e.Q6J("ngIf",o.commentsApproved.length>1),e.xp6(1),e.Q6J("value",o.commentsApproved)("paginator",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",e.DdM(7,h))}}function x(t,n){if(1&t&&(e.TgZ(0,"div")(1,"div",11),e.YNc(2,C,3,0,"div",8),e.YNc(3,_,6,8,"div",8),e.qZA()()),2&t){const o=e.oxw();e.xp6(2),e.Q6J("ngIf",null==o.commentsApproved),e.xp6(1),e.Q6J("ngIf",null!=o.commentsApproved)}}const U=[{path:"",component:(()=>{class t{constructor(o){this.adminService=o,this.first=0,this.rows=10,this.pending=!0,this.commentsApproved=[]}ngOnInit(){this.getCommentsApproved()}getCommentsApproved(){this.adminService.getCommentsApproved().subscribe({next:o=>{this.commentsApproved=o,this.pending=!1},error:o=>{d().fire("Error",o.error.mensaje,"error")}})}showComment(o){d().fire("Contenido del comentario con id: "+o.id,o.message,"info")}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(l.l))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-approved-comments"]],decls:17,vars:2,consts:[[1,"row","p-1","my-3","justify-content-center"],["aria-label","breadcrumb"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","/optionsADMIN"],[1,"breadcrumb-item","active"],["routerLink","/optionsADMIN/commentsConf"],["aria-current","page",1,"breadcrumb-item","active"],[4,"ngIf"],[1,"text-center","mb-2"],["routerLink","/optionsADMIN/commentsConf",1,"btn","colorPurpleP"],[1,"p-3","text-center","my-3"],["styleClass","p-datatable-striped","responsiveLayout","scroll","currentPageReportTemplate","Mostrando {first} de {last} de un total de {totalRecords} entradas",3,"value","paginator","rows","showCurrentPageReport","rowsPerPageOptions"],["pTemplate","header"],["pTemplate","body"],[1,"colorGreenP","text-center"],["pSortableColumn","id",1,"encab"],["field","id"],["pSortableColumn","username",1,"encab"],["field","username"],["pSortableColumn","category.name",1,"encab"],["field","category.name"],["pSortableColumn","fechaBonita",1,"encab"],["field","fechaBonita"],[1,"encab"],[1,"text-center"],[1,"btn","colorYellowP",3,"click"],[1,"fa","fa-search"]],template:function(o,i){1&o&&(e.TgZ(0,"div",0)(1,"nav",1)(2,"ol",2)(3,"li",3)(4,"a",4),e._uU(5,"GESTI\xd3N"),e.qZA()(),e.TgZ(6,"li",5)(7,"a",6),e._uU(8," COMENTARIOS "),e.qZA()(),e.TgZ(9,"li",7),e._uU(10,"APROBADOS"),e.qZA()()()(),e.YNc(11,A,2,0,"div",8),e.YNc(12,x,4,2,"div",8),e.TgZ(13,"div",0)(14,"div",9)(15,"button",10),e._uU(16," ATR\xc1S "),e.qZA()()()),2&o&&(e.xp6(11),e.Q6J("ngIf",i.pending),e.xp6(1),e.Q6J("ngIf",!i.pending))},dependencies:[a.O5,p.rH,p.yS,u.O,m.iA,v.jx,m.lQ,m.fz]}),t})()}];let b=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[p.Bz.forChild(U),p.Bz]}),t})();var I=r(845),N=r(4132),y=r(4466);let O=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[a.ez,b,y.m,m.U$,I.hJ,N.U]}),t})()}}]);