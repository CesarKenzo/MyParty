import { ThisReceiver } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { flLogged, loggedUserId } from 'src/app/global-variables';
import { Login } from '../model/login';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  hide = true;
  durationInSeconds = 3;

  login: Login = {
    login: '',
    password: ''
  }

  userList: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listUsers(); 
  }

  userLogin() {
    let flUser = false
    for(var x = 0; x < this.userList.length; x++) {
      let e = this.userList[x]
      if(this.login.login != null && this.login.login.length != 0) {
        if(e.username == this.login.login && e.password == this.login.password) {
          this.userService.usuarioLogado = e;
          sessionStorage.setItem(loggedUserId, e.id!.toString()) 
          flUser = true
          break
        } 
      }
    }

    if(flUser) {
      this.router.navigate(['/event-list'])
    } else {
      this.router.navigate(['/login'])
      this.openSnackBar()
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(LoginResponseComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  listUsers() {
    this.userService.list().subscribe((userList) => {
      this.userList = userList
    }) 
  }
}

@Component({
  selector: 'login-response',
  templateUrl: 'login-response.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .login-resp {
      color: white;
    }
  `,
  ],
})
export class LoginResponseComponent {
  snackBarRef = inject(MatSnackBarRef);
}
