import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = {
    name: '',
    username: '',
    password: '', 
    profile: '', 
    description: '' 
  }

  constructor(
    private userService: UserService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.userService.usuarioLogado
    if(this.userService.usuarioLogado == null) this.router.navigate(['login'])
  }

  public onSuccess() {
    this.userService.editarUsuario(this.user).subscribe(retorno => {
      if(retorno) this.snackBar.open('Descrição Salva com Sucesso!', '', {duration: 3000});
      else this.onError();
    });
    console.log(this.user.description);
  }

  public onError() {
    this.snackBar.open('Erro ao Adicionar Descrição.', '', { duration: 3000 });
  }
}
