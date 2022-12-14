import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { EditProfileComponent } from '../dialogs/edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { loggedUserId } from 'src/app/global-variables';
import { UserTicket } from '../model/user-ticket';
import { Ticket } from '../model/ticket';
import { Event } from '../model/event';
import { UserTicketService } from '../service/user_ticket.service';
import { UserTicketsComponent } from '../dialogs/user-tickets/user-tickets.component';
import { UserFavoriteEventsComponent } from '../dialogs/user-favorite-events/user-favorite-events.component';
import { FavoriteCategoriesComponent } from '../dialogs/favorite-categories/favorite-categories.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User = {
    name: '',
    username: '',
    password: '', 
    description: '',
    profile: ''  
  }

  ticket: Ticket = {
    name: '',
    eventId: 0,
    value: 0,
    type: '',
    available: 0
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

  userTicketList: UserTicket[] = []

  constructor(
    private userService: UserService,
    private userTicketService: UserTicketService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.userService.usuarioLogado == null)
      this.router.navigate(['login'])

    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user

      this.userTicketService.listar().subscribe((userTickets) => {
        this.userTicketList = userTickets.filter(ut => ut.user.id == this.user.id)
        this.event = this.userTicketList[this.userTicketList.length-1].event
      })
    })
  }

  openEvents() {
    const dialogRef = this.dialog.open(UserFavoriteEventsComponent, {
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.usuarioLogado = this.user
      console.log('dialog fechado!' + result);
      this.router.navigate(['profile'])
    }); 
  }

  openCategories() {
    const dialogRef = this.dialog.open(FavoriteCategoriesComponent, {
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.usuarioLogado = this.user
      console.log('dialog fechado!' + result);
      this.router.navigate(['profile'])
    }); 
  }

  openTickets() {
    const dialogRef = this.dialog.open(UserTicketsComponent, {
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.usuarioLogado = this.user
      console.log('dialog fechado!' + result);
      this.router.navigate(['profile'])
    }); 
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '20vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userService.usuarioLogado = this.user
      console.log('dialog fechado!' + result);
      this.router.navigate(['profile'])
    }); 
  }
}
