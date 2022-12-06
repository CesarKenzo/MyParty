import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { eventId } from 'src/app/global-variables';
import { Marketplace_Ticket } from '../../model/marketplace-ticket';
import { Ticket } from '../../model/ticket';
import { MktTicketService } from '../../service/marketplace_ticket.service';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-marketplace-tickets',
  templateUrl: './marketplace-tickets.component.html',
  styleUrls: ['./marketplace-tickets.component.css']
})
export class MarketplaceTicketsComponent implements OnInit {

  ticketList: Ticket[] = [];
  mktTicketList: Marketplace_Ticket[] = []
  eventId: number = 0;

  constructor(
    private ticketService: TicketService,
    private mktTicketService: MktTicketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.mktTicketList = []
    this.eventId = parseInt(sessionStorage.getItem(eventId)!)
    this.mktTicketService.listar().subscribe((mktTicketList) => {
      this.mktTicketList = mktTicketList.filter(mt => mt.eventId == this.eventId)
    })
  }
}
