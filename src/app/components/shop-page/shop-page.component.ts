import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent implements OnInit {
  value = 0;
  ticketList: Ticket[] = [];
  tempTicketList: Ticket[] = [];
  typesOfTicket: string[] = ['Ingresso 1', 'Ingresso 2'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.tempTicketList = []
    this.ticketList = []

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
