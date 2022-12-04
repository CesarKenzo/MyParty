import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loggedUserId } from 'src/app/global-variables';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-favorite-categories',
  templateUrl: './favorite-categories.component.html',
  styleUrls: ['./favorite-categories.component.css']
})
export class FavoriteCategoriesComponent implements OnInit {
  user: User = {
    name: '',
    username: '',
    password: '', 
    description: '',
    profile: ''  
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.userService.usuarioLogado == null)
      this.router.navigate(['login'])

    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user
    })
  }

}
