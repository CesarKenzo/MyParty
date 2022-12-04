import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { EditProfileComponent } from '../dialogs/edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { loggedUserId } from 'src/app/global-variables';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    var userId = sessionStorage.getItem(loggedUserId)
    this.userService.buscarPorId(Number.parseInt(userId!)).subscribe((user) => {
      this.user = user
    })
    if(this.userService.usuarioLogado == null)
      this.router.navigate(['login'])
  }

  openTranslation() {
  }

  openExplanation() {
  }

  openPosts() {
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
