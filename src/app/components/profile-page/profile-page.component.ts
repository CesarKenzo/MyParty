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
    features: ''
  }

  userTickets: UserTicket[] = []

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

  openExplanation() {
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
