import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  durationInSeconds = 5;

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
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SignUpResponseComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  createUser() {
    if(this.user.name != null && this.user.name != '' && this.user.password != null && this.user.password != '' && this.user.username != null && this.user.username != '') {
      this.userService.save(this.user).subscribe(() => {
        this.router.navigate(['/login'])
      })
    } else {
      this.router.navigate(['/signup'])
        this.openSnackBar()
    }
  }
}

@Component({
  selector: 'signup-response',
  templateUrl: 'signup-response.html',
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
export class SignUpResponseComponent {
  snackBarRef = inject(MatSnackBarRef);
}

