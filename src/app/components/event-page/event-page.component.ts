import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event-list/event-list.component';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'], 
})

export class EventPageComponent implements OnInit {

  @Input() event: Event = {
    name: 'Evento X',
    production: 'Produtor X',
    rating: 5,
    image: 'https://magaluteste.blob.core.windows.net/container-myparty/Festa1.jpg',
    description: 'Descrição do Evento',
    categories: ['Categoria X','Categoria Y'],
  }

  rating_comment1 = 4;
  rating_comment2 = 5;
  rating_comment3 = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
