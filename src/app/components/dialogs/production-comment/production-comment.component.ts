import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loggedUserId, loggedUsername, productionName } from 'src/app/global-variables';
import { ProductionComment } from '../../model/production-comment';
import { ProductionCommentService } from '../../service/production-comment.service';

@Component({
  selector: 'app-production-comment',
  templateUrl: './production-comment.component.html',
  styleUrls: ['./production-comment.component.css']
})
export class ProductionCommentComponent implements OnInit {

  productionComment: ProductionComment = {
    productionName: '',
    userId: '',
    username: '',
    content: '',
    score: 0
  }

  constructor(
    private productionCommentService: ProductionCommentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  publicar() {
    this.productionComment.productionName = sessionStorage.getItem(productionName)!
    this.productionComment.userId = sessionStorage.getItem(loggedUserId)!
    this.productionComment.username = sessionStorage.getItem(loggedUsername)!

    this.productionCommentService.salvar(this.productionComment).subscribe((retorno) => {
      if(retorno) {
        sessionStorage.removeItem(productionName)
        this.snackBar.open('Comentário Salvo com Sucesso!', '', {duration: 3000});
      }
      else this.onError();
    })
  }

  public onError() {
    this.snackBar.open('Erro ao Salvar o Comentário.', '', { duration: 3000 });
  }
}
