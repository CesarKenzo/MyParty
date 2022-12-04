import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loggedUserId } from 'src/app/global-variables';
import { Event } from '../../model/event';
import { User } from '../../model/user';
import { EventService } from '../../service/event.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-favorite-events',
  templateUrl: './user-favorite-events.component.html',
  styleUrls: ['./user-favorite-events.component.css']
})
export class UserFavoriteEventsComponent implements OnInit {
  userFavoriteEvents: Event[] = []
  eventList: Event[] = []

  user: User = {
    name: '',
    username: '',
    password: '',
    profile: '', 
    description: '',
    favoriteCategories: [], 
    favoriteEvents: [] 
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
  
  constructor(
    private eventService: EventService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.userService.usuarioLogado == null)
      this.router.navigate(['login'])

    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user

      let tempList: Event[] = []
      for(let x = 0; x < this.user.favoriteEvents?.length!; x++) {
        let eventId = this.user.favoriteEvents?.at(x)?.valueOf()
        this.eventService.buscarPorId(eventId!).subscribe((event) => {
          this.event = event
          tempList.push(this.event)
        })
      }
      this.userFavoriteEvents = tempList
    })
  }
}
