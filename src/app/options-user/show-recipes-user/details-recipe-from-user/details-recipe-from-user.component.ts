import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-recipe-from-user',
  templateUrl: './details-recipe-from-user.component.html',
  styleUrls: ['./details-recipe-from-user.component.css'],
})
export class DetailsRecipeFromUserComponent implements OnInit {
  id: any = localStorage.getItem('id');

  constructor() {}

  ngOnInit(): void {}
}
