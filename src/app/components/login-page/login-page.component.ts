import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { Login } from '../model/login';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  durationInSeconds = 5;

  login: Login = {
    login: '',
    password: ''
  }

  userList: User[] = [];

  user: User = {
    id: 0,
    name: '',
    username: '',
    password: '',
    profile: '',
    description: ''
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userService.list().subscribe((userList) => {
      this.userList = userList
    }) 
  }

  userLogin() {
    for(var x = 0; x < this.userList.length; x++) {
      let e = this.userList[x]
      if(this.login.login != null && this.login.login?.length != 0) {
        if(e.username == this.login.login && e.password == this.login.password) {
          this.router.navigate(['/event-list'])
          this.userService.usuarioLogado = this.user;
        } else {
          this.router.navigate(['/login'])
          this.openSnackBar()
        }
      }
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(LoginResponseComponent, {
      duration: this.durationInSeconds * 1000,
    });
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
