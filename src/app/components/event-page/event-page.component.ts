import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'], 
})

export class EventPageComponent implements OnInit {
  
  rating = 5;
  rating_comment1 = 4;
  rating_comment2 = 5;
  rating_comment3 = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
