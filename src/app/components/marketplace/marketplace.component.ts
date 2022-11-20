import { Component, OnInit } from '@angular/core';
import { Marketplace_Ticket } from '../model/marketplace-ticket';
import { MktTicketService } from '../service/marketplace_ticket.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  ticketList: Marketplace_Ticket[] = [];

  pageSize = 10;

  constructor(
    private service: MktTicketService
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((ticketList) => {
      this.ticketList = ticketList
    }) 
  }

}
