import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';
import { Router , ActivatedRoute} from '@angular/router';
import { UserService } from '../service/user.service';
import { UserTicketService } from '../service/user_ticket.service';
import { UserTicket } from '../model/user-ticket';
import { User } from '../model/user';
import { Event } from '../model/event';
import { loggedUserId } from 'src/app/global-variables';
import { EventService } from '../service/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent implements OnInit {
  value = 0;
  ticketList: Ticket[] = [];
  tempTicketList: Ticket[] = [];

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
    features: ''
  }

  userTicket: UserTicket = {
    event: this.event,
    user: this.user,
    ticket: this.ticket
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService, 
    private userService: UserService,
    private userTicketService: UserTicketService,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tempTicketList = []
    this.ticketList = []

    if(this.userService.usuarioLogado == null)
      this.router.navigate(['login'])

    this.getUser()
    this.getEvent()
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

  getUser() {
    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user
    })
  }

  getEvent() {
    const eventId = this.route.snapshot.paramMap.get('id')
    this.eventService.buscarPorId(Number.parseInt(eventId!)).subscribe((event) => {
      this.event = event
    })
  }

  buyTicket() {
   /*  this.eventService.buscarPorId(this.userTicket.ticket.eventId).subscribe((event) => {
      this.event = event
    }) */
    this.userTicket.event = this.event
    this.userTicket.user = this.user
    this.userTicketService.salvar(this.userTicket).subscribe((ticket) => {
      this.userTicket = ticket
      if(ticket) { 
        this.snackBar.open('Compra Finalizada!', '', {duration: 3000});
        this.router.navigate(['event-list'])
      }
      else this.onError();
    })
  }

  public onError() {
    this.snackBar.open('Erro ao Realizar a Compra.', '', { duration: 3000 });
  }
}
