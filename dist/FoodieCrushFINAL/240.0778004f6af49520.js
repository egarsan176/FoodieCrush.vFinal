"use strict";(self.webpackChunkFoodieCrushFINAL=self.webpackChunkFoodieCrushFINAL||[]).push([[240],{4240:(f,r,n)=>{n.r(r),n.d(r,{OptionsUserModule:()=>h});var l=n(9808),i=n(592),c=n(5748),d=n(5226),a=n.n(d),t=n(7587),u=n(8827);function m(o,e){1&o&&(t.TgZ(0,"div"),t._UZ(1,"img",19),t.qZA())}function p(o,e){1&o&&(t.TgZ(0,"div"),t._UZ(1,"img",20),t.qZA())}function v(o,e){if(1&o&&(t.TgZ(0,"div")(1,"div",5)(2,"div",6)(3,"h4"),t._uU(4),t.qZA()()(),t.TgZ(5,"div",7)(6,"div",8)(7,"div",9),t._UZ(8,"div",10),t.TgZ(9,"div",11),t._UZ(10,"img",12),t.TgZ(11,"h5",13),t._uU(12,"PUBLICAR"),t.qZA(),t.TgZ(13,"button",14),t._uU(14," M\xc1S "),t.qZA()(),t._UZ(15,"div",15),t.qZA()(),t.TgZ(16,"div",8)(17,"div",9),t._UZ(18,"div",10),t.TgZ(19,"div",11),t._UZ(20,"img",16),t.TgZ(21,"h5",13),t._uU(22,"MIS RECETAS"),t.qZA(),t.TgZ(23,"button",17),t._uU(24," M\xc1S "),t.qZA()(),t._UZ(25,"div",15),t.qZA()(),t.TgZ(26,"div",8)(27,"div",9),t._UZ(28,"div",10),t.TgZ(29,"div",11),t.YNc(30,m,2,0,"div",4),t.YNc(31,p,2,0,"div",4),t.TgZ(32,"h5",13),t._uU(33,"NOTIFICACIONES"),t.qZA(),t.TgZ(34,"button",18),t._uU(35," M\xc1S "),t.qZA()(),t._UZ(36,"div",15),t.qZA()()()()),2&o){const s=t.oxw();t.xp6(4),t.hij("Hola ",s.user.username,", \xbfqu\xe9 quieres hacer?"),t.xp6(26),t.Q6J("ngIf",0==s.notifications.length),t.xp6(1),t.Q6J("ngIf",0!=s.notifications.length)}}const U=[{path:"",component:(()=>{class o{constructor(s){this.accessService=s,this.notifications=[],this.mostrar=!1}ngOnInit(){this.getUser()}getUser(){this.accessService.getUsuario().subscribe({next:s=>{this.user=s,this.notifications=s.notifications,this.mostrar=!0},error:s=>{a().fire("Error",s.error.mensaje,"error")}})}}return o.\u0275fac=function(s){return new(s||o)(t.Y36(u.v))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-options-user"]],decls:6,vars:1,consts:[[1,"row","p-1","my-3","justify-content-center"],["aria-label","breadcrumb"],[1,"breadcrumb"],["aria-current","page",1,"breadcrumb-item","active"],[4,"ngIf"],[1,"row","p-1","mt-2","justify-content-center"],[1,"text-center"],[1,"row","m-2"],[1,"col-lg-4","col-xl-4","col-md-4","col-sm-4","col-xs-12"],[1,"card","mb-4"],[1,"card-header","colorYellowP"],[1,"card-body","text-center"],["src","assets/img/icons/notebook.png","alt",""],[1,"my-2"],["routerLink","/optionsUser/uploadRecipe",1,"btn","colorGreenP"],[1,"card-footer","colorYellowP"],["src","assets/img/icons/recipe-book.png","alt",""],["routerLink","/optionsUser/myRecipes",1,"btn","colorGreenP"],["routerLink","/optionsUser/notifUser",1,"btn","colorGreenP"],["src","assets/img/icons/bell.png","alt",""],["src","assets/img/icons/notification.png","alt",""]],template:function(s,Z){1&s&&(t.TgZ(0,"div",0)(1,"nav",1)(2,"ol",2)(3,"li",3),t._uU(4," \xc1REA DE FOODIES "),t.qZA()()()(),t.YNc(5,v,37,3,"div",4)),2&s&&(t.xp6(5),t.Q6J("ngIf",Z.mostrar))},dependencies:[l.O5,i.rH]}),o})(),canActivate:[c.a]},{path:"myRecipes",loadChildren:()=>Promise.all([n.e(495),n.e(263),n.e(592),n.e(190)]).then(n.bind(n,9190)).then(o=>o.ShowRecipesUserModule)},{path:"uploadRecipe",loadChildren:()=>Promise.all([n.e(505),n.e(550)]).then(n.bind(n,8458)).then(o=>o.UploadRecipeFormModule)},{path:"notifUser",loadChildren:()=>Promise.all([n.e(495),n.e(592),n.e(296)]).then(n.bind(n,9296)).then(o=>o.ShowNotificationsUserModule)}];let g=(()=>{class o{}return o.\u0275fac=function(s){return new(s||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[i.Bz.forChild(U),i.Bz]}),o})(),h=(()=>{class o{}return o.\u0275fac=function(s){return new(s||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[l.ez,g]}),o})()}}]);