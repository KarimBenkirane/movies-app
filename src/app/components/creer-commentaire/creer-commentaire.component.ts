import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { FilmsHelperService } from '../../services/films-helper.service';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-creer-commentaire',
  standalone: true,
  imports: [FontAwesomeModule, FontAwesomeModule, FormsModule],
  templateUrl: './creer-commentaire.component.html',
  styleUrl: './creer-commentaire.component.css',
})
export class CreerCommentaireComponent {
  faPaperPlane = faPaperPlane;
  authService = inject(AuthService);
  email: string = this.authService.email;
  comment: string = '';
  filmsHelper = inject(FilmsHelperService);
  @Input() filmId!: number;

  @Output() onSendComment = new EventEmitter<Comment>();

  onSubmit() {
    if (!this.comment) {
      this.filmsHelper.openSnackBar('Veuillez saisir votre commentaire.');
      return;
    }

    if (this.comment.length > 300) {
      this.filmsHelper.openSnackBar(
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

    this.onSendComment.emit(comment);

    // Réinitialisation des champs
    this.comment = '';
  }
}
