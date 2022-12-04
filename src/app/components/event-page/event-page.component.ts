import { Component, Input, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loggedUserId } from 'src/app/global-variables';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'], 
})

export class EventPageComponent implements OnInit {
  flFavoriteAdd = false

  user: User = {
    id: 0,
    name: '',
    username: '',
    password: '',
    profile: '',
    description: '',
    favoriteEvents: [],
  }
  
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
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tempTicketList = []
    this.ticketList = []

    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((event) => {
      this.event = event
    })
    this.listTickets()

    if(this.userService.usuarioLogado.id != null) {
      var userId = sessionStorage.getItem(loggedUserId)
      this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
        this.user = user

        var favoriteEvents:number[] = []
        if(this.user.favoriteEvents?.includes(this.event.id!)) {
          favoriteEvents = this.user.favoriteEvents.filter( fe => fe != this.event.id)
          this.user.favoriteEvents = favoriteEvents
          this.flFavoriteAdd = false
        }
      })
    }
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

  setFavorite() {
    if(this.user.id != 0) {
      var favoriteEvents:number[] = this.user.favoriteEvents!
      if(this.user.favoriteEvents?.includes(this.event.id!)) {
        favoriteEvents = this.user.favoriteEvents.filter(fe => fe != this.event.id)
        this.user.favoriteEvents = favoriteEvents
        this.flFavoriteAdd = false
      } else {
        this.user.favoriteEvents = favoriteEvents
        favoriteEvents.push(this.event.id!)
        this.flFavoriteAdd = true
      }
      
      this.user.favoriteEvents = favoriteEvents
      this.userService.editarUsuario(this.user).subscribe((user) => {
        this.user = user
        if(user != null && this.flFavoriteAdd) this.snackBar.open('Evento Favoritado!', '', {duration: 3000});
        else if(user != null && !this.flFavoriteAdd) this.snackBar.open('Evento removido dos Favoritos.', '', {duration: 3000})
        else this.onError();  
      })
    } else {
      this.favoriteNotLogged()
    }
  }

  public onError() {
    this.snackBar.open('Erro ao Adicionar aos Favoritos.', '', { duration: 3000 });
  }

  public favoriteNotLogged() {
    this.snackBar.open('Crie uma conta ou faça o Login para utilizar os Favoritos.', '', { duration: 3000 });
  }
}
