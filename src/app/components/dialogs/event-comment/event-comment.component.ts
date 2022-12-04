import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { eventId, eventName, loggedUserId, loggedUsername } from 'src/app/global-variables';
import { EventComment } from '../../model/event-comment';
import { EventCommentService } from '../../service/event-comment.service';

@Component({
  selector: 'app-event-comment',
  templateUrl: './event-comment.component.html',
  styleUrls: ['./event-comment.component.css']
})
export class EventCommentComponent implements OnInit {

  eventComment: EventComment = {
    eventId: 0,
    eventName: '',
    userId: '',
    username: '',
    content: '',
    score: 0
  }
  
  constructor(
    private eventCommentService: EventCommentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  publicar() {
    this.eventComment.eventId = Number.parseInt(sessionStorage.getItem(eventId)!)
    this.eventComment.eventName = sessionStorage.getItem(eventName)!
    this.eventComment.userId = sessionStorage.getItem(loggedUserId)!
    this.eventComment.username = sessionStorage.getItem(loggedUsername)!

    this.eventCommentService.salvar(this.eventComment).subscribe((retorno) => {
      if(retorno) this.snackBar.open('Comentário Salvo com Sucesso!', '', {duration: 3000});
      else this.onError();
    })
  }

  public onError() {
    this.snackBar.open('Erro ao Salvar o Comentário.', '', { duration: 3000 });
  }
}
