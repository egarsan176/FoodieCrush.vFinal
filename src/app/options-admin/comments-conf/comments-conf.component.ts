import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-conf',
  templateUrl: './comments-conf.component.html',
  styleUrls: ['./comments-conf.component.css'],
})
export class CommentsConfComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  back() {
    history.back();
  }
}
