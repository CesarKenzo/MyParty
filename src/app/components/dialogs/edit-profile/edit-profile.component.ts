import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categorie } from '../../model/categorie';
import { User } from '../../model/user';
import { CategorieService } from '../../service/categorie.service';
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
    description: '',
    favoriteCategories: [] 
  }

  categorieList: Categorie[] = []

  constructor(
    private userService: UserService, 
    private categorieService: CategorieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.userService.usuarioLogado
    if(this.userService.usuarioLogado == null) this.router.navigate(['login'])

    this.listCategories()
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

  private listCategories() {
    this.categorieService.listar().subscribe((categorieList) => {
      this.categorieList = categorieList
    }) 
  }
}
