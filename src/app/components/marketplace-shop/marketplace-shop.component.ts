import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/ticket';
import { User } from '../model/user';
import { UserTicket } from '../model/user-ticket';
import { Event } from '../model/event';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loggedUserId } from 'src/app/global-variables';
import { EventService } from '../service/event.service';
import { TicketService } from '../service/ticket.service';
import { UserTicketService } from '../service/user_ticket.service';
import { MktTicketService } from '../service/marketplace_ticket.service'
import { Marketplace_Ticket } from '../model/marketplace-ticket';

@Component({
  selector: 'app-marketplace-shop',
  templateUrl: './marketplace-shop.component.html',
  styleUrls: ['./marketplace-shop.component.css']
})
export class MarketplaceShopComponent implements OnInit {
  value = 0;

  ticket: Ticket = {
    name: '',
    eventId: 0,
    value: 0,
    type: '',
    available: 0
  }

  user: User = {
    name: '',
    username: '',
    password: ''
  }

  event: Event = {
    name: '',
    production: '',
    rating: 0,
    image: '',
    description: '',
    categories: [],
    features: '',
    date: new Date()
  }

  userTicket: UserTicket = {
    event: this.event,
    user: this.user,
    ticket: this.ticket
  }

  mktTicket: Marketplace_Ticket = {
    eventId: 0,
    eventName: '',
    userName: '',
    value: 0,
    ticketId: 0,
    ticketName: '',
    ticketType: '',
    flSold: false
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService, 
    private userService: UserService,
    private userTicketService: UserTicketService,
    private eventService: EventService,
    private marketplaceTicketService: MktTicketService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.userService.usuarioLogado == null)
      this.router.navigate(['login'])

    const mktTicketId = this.route.snapshot.paramMap.get('id')
    this.marketplaceTicketService.buscarPorId(parseInt(mktTicketId!)).subscribe((mktTicket) => {
      this.mktTicket = mktTicket

      this.getUser()
      this.getEvent()
      this.getTicket()
    })
  }

  getUser() {
    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user
    })
  }

  getEvent() {
    const eventId = this.mktTicket.eventId
    this.eventService.buscarPorId(eventId).subscribe((event) => {
      this.event = event
    })
  }

  getTicket() {
    const ticketId = this.mktTicket.ticketId
    this.ticketService.buscarPorId(ticketId).subscribe((ticket) => {
      this.ticket = ticket
    })
  }

  buyTicket() {
     this.userTicket.event = this.event
     this.userTicket.user = this.user
     this.ticket.value = this.mktTicket.value
     this.userTicket.ticket = this.ticket
     this.userTicketService.salvar(this.userTicket).subscribe((ticket) => {
       this.userTicket = ticket
       this.mktTicket.flSold = true
       this.marketplaceTicketService.editar(this.mktTicket).subscribe((mktTicket) => {
        this.mktTicket = mktTicket

        if(ticket && mktTicket) { 
          this.snackBar.open('Compra Finalizada!', '', {duration: 3000});
          this.router.navigate(['event-list'])
        }
        else this.onError();
       })

       
     })
   }
 
   public onError() {
     this.snackBar.open('Erro ao Realizar a Compra.', '', { duration: 3000 });
   }
}
