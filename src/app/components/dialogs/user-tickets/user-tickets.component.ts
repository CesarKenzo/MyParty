import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loggedUserId } from 'src/app/global-variables';
import { User } from '../../model/user';
import { UserTicket } from '../../model/user-ticket';
import { UserService } from '../../service/user.service';
import { UserTicketService } from '../../service/user_ticket.service';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit {

  user: User = {
    name: '',
    username: '',
    password: '', 
    profile: '', 
    description: '',
    favoriteCategories: [] 
  }

  userTicketList: UserTicket[] = []
  
  constructor(
    private userService: UserService,
    private userTicketService: UserTicketService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.userService.usuarioLogado == null)
    this.router.navigate(['login'])
    
    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user

      this.userTicketService.listar().subscribe((userTickets) => {
        this.userTicketList = userTickets.filter(ut => ut.user.id == this.user.id)
      })
    })
    //this.getUser()
    //this.getUserTickets()
  }

  getUser() {
    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user
    })
  }

  getUserTickets() {
    this.userTicketService.listar().subscribe((userTickets) => {
      this.userTicketList = userTickets.filter(ut => ut.user.id == this.user.id)
    })
  }
}
