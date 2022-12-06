import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { eventId } from 'src/app/global-variables';
import { Ticket } from '../../model/ticket';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-event-tickets',
  templateUrl: './event-tickets.component.html',
  styleUrls: ['./event-tickets.component.css']
})
export class EventTicketsComponent implements OnInit {

  ticketList: Ticket[] = [];
  eventId: number = 0

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.eventId = parseInt(sessionStorage.getItem(eventId)!)
    this.ticketService.listar().subscribe((ticketList) => {
      this.ticketList = ticketList.filter(t => t.eventId == this.eventId )
    })
  }
}
