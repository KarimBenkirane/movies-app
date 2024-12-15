import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { Comment } from '../../models/Comment';
import { CommentsService } from '../../services/comments.service';
import { FilmsHelperService } from '../../services/films-helper.service';
import { UiService } from '../../services/ui.service';
import { CommentaireItemComponent } from '../commentaire-item/commentaire-item.component';
@Component({
  selector: 'app-liste-commentaires',
  standalone: true,
  imports: [CommentaireItemComponent, MatDividerModule],
  templateUrl: './liste-commentaires.component.html',
  styleUrl: './liste-commentaires.component.css',
})
export class ListeCommentairesComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  @Input() filmId!: number;
  filmsHelper = inject(FilmsHelperService);
  uiService = inject(UiService);
  commentsService = inject(CommentsService);
  postCommSubscripiton!: Subscription;

  ngOnInit(): void {
    this.commentsService
      .getCommentsByFilmId(this.filmId)
      .subscribe((comms) => (this.comments = comms));
    this.postCommSubscripiton = this.commentsService.postComm$.subscribe(
      (comm) => {
        this.commentsService.postComment(this.filmId, comm).subscribe({
          next: () => {
            this.comments.unshift(comm);
          },
          error: () => {
            this.uiService.openSnackBar(
              "Une erreur s'est produite lors de la publication du commentaire."
            );
          },
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.postCommSubscripiton.unsubscribe();
  }
}
