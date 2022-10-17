import { Component, Input, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Event } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'], 
})

export class EventPageComponent implements OnInit {

  event: Event = {
    id: 0,
    name: '',
    production: '',
    rating: 0,
    image: '',
    description: '',
    categories: [],
    features: ''
  }

  rating_comment1 = 4;
  rating_comment2 = 5;
  rating_comment3 = 4;

  constructor(
    private service: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((event) => {
      this.event = event
    })
  }

}
