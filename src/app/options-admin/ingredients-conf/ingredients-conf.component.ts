import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredients-conf',
  templateUrl: './ingredients-conf.component.html',
  styleUrls: ['./ingredients-conf.component.css'],
})
export class IngredientsConfComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  back() {
    history.back();
  }
}
