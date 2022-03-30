import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-recipe-from-admin',
  templateUrl: './details-recipe-from-admin.component.html',
  styleUrls: ['./details-recipe-from-admin.component.css'],
})
export class DetailsRecipeFromAdminComponent implements OnInit {
  id: any = localStorage.getItem('id');

  constructor() {}

  ngOnInit(): void {}
}
