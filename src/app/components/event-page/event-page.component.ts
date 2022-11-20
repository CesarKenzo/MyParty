import { Component, Input, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';

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

  ticketList: Ticket[] = [];
  tempTicketList: Ticket[] = [];

  rating_comment1 = 4;
  rating_comment2 = 5;
  rating_comment3 = 4;

  constructor(
    private service: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.tempTicketList = []
    this.ticketList = []

    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((event) => {
      this.event = event
    })

    this.listTickets()
  }

  listTickets() {
    this.ticketService.listar().subscribe((ticketList) => {
      this.ticketList = ticketList

      const id = this.route.snapshot.paramMap.get('id')
      for(var i = 0; i < this.ticketList.length ; i++) {
        let t = this.ticketList[i]
        if(t.eventId == parseInt(id!)) {
          this.tempTicketList.push(t)
        }
      }

      this.ticketList = this.tempTicketList
    })
  }
}
