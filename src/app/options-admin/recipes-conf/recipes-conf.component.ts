import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-conf',
  templateUrl: './recipes-conf.component.html',
  styleUrls: ['./recipes-conf.component.css'],
})
export class RecipesConfComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  back() {
    history.back();
  }
}
