import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../../models/Comment';
import { AuthService } from '../../services/auth.service';
import { CommentsService } from '../../services/comments.service';
import { FilmsHelperService } from '../../services/films-helper.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-creer-commentaire',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './creer-commentaire.component.html',
  styleUrl: './creer-commentaire.component.css',
})
export class CreerCommentaireComponent {
  faPaperPlane = faPaperPlane;
  authService = inject(AuthService);
  email: string = this.authService.email;
  comment: string = '';
  filmsHelper = inject(FilmsHelperService);
  uiService = inject(UiService);
  commentsService = inject(CommentsService);
  @Input() filmId!: number;

  onSubmit() {
    if (!this.comment) {
      this.uiService.openSnackBar('Veuillez saisir votre commentaire.');
      return;
    }

    if (this.comment.length > 300) {
      this.uiService.openSnackBar(
        'Veuillez saisir un commentaire de moins de 300 caractères.'
      );
      return;
    }

    const comment: Comment = {
      author: this.email.trim(),
      content: this.comment.trim(),
      date: new Date(),
      film_id: this.filmId,
    };
    this.commentsService.postCommSubject.next(comment);
    // Réinitialisation des champs
    this.comment = '';
  }
}
