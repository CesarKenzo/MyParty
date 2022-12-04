import { Component, Input, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { eventId, eventName, loggedUserId, loggedUsername, productionName } from 'src/app/global-variables';
import { MatDialog } from '@angular/material/dialog';
import { EventCommentComponent } from '../dialogs/event-comment/event-comment.component';
import { EventCommentService } from '../service/event-comment.service';
import { EventComment } from '../model/event-comment';
import { ProductionCommentService } from '../service/production-comment.service';
import { ProductionCommentComponent } from '../dialogs/production-comment/production-comment.component';
import { ProductionComment } from '../model/production-comment';

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
    features: '',
    date: new Date()
  }

  ticketList: Ticket[] = [];
  tempTicketList: Ticket[] = [];
  eventCommentList: EventComment[] = [];
  productionCommentList: ProductionComment[] = [];

  rating_comment1 = 4;
  rating_comment2 = 5;
  rating_comment3 = 4;

  constructor(
    private service: EventService,
    private userService: UserService,
    private ticketService: TicketService,
    private eventCommentService: EventCommentService,
    private productionCommentService: ProductionCommentService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tempTicketList = []
    this.ticketList = []

    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((event) => {
      this.event = event

      this.eventCommentService.listar().subscribe((eventCommentList) => {
        this.eventCommentList = eventCommentList.filter(ec => ec.eventId == this.event.id)
      })

      this.productionCommentService.listar().subscribe((productionCommentList) => {
        this.productionCommentList = productionCommentList.filter(pc => pc.productionName = this.event.production)
      })

      var userId = sessionStorage.getItem(loggedUserId)
      if(userId != null) {
        this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
          this.user = user
  
          if(this.user.favoriteEvents?.includes(this.event.id!)) {
            this.flFavoriteAdd = false
          }
        })
      }
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

  setFavorite() {
    if(this.user.id != 0) {
      var favoriteEvents:number[] = this.user.favoriteEvents!
      if(this.user.favoriteEvents?.includes(this.event.id!)) {
        favoriteEvents = this.user.favoriteEvents.filter(fe => fe != this.event.id)
        this.flFavoriteAdd = false
      } else {
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

  public openEventCommentDialog() {
    sessionStorage.setItem(eventId, this.event.id?.toString()!)
    sessionStorage.setItem(eventName, this.event.name)
    sessionStorage.setItem(loggedUsername, this.user.username)

    const MatdialogRef = this.dialog.open(EventCommentComponent, {
      width: '500px',
    });

    MatdialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openProductionCommentDialog() {
    sessionStorage.setItem(productionName, this.event.production)
    sessionStorage.setItem(loggedUsername, this.user.username)

    const MatdialogRef = this.dialog.open(ProductionCommentComponent, {
      width: '500px',
    });

    MatdialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
