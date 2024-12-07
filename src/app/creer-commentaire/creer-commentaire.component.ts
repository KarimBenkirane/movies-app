import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { FilmsHelperService } from '../films-helper.service';
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

  @Output() onSendComment = new EventEmitter<Comment>();

  onSubmit() {
    if (!this.comment) {
      this.filmsHelper.openSnackBar(
        'Veuillez saisir votre commentaire.',
        'OK !'
      );
      return;
    }

    if (this.comment.length > 300) {
      this.filmsHelper.openSnackBar(
        'Veuillez saisir un commentaire de moins de 300 caractères.',
        'OK !'
      );
      return;
    }

    const comment: Comment = {
      username: this.email.trim(),
      comment: this.comment.trim(),
      rating: 2,
      date: new Date(),
    };

    this.onSendComment.emit(comment);

    this.filmsHelper.openSnackBar('Commentaire ajouté avec succès !', 'OK !');

    // Réinitialisation des champs
    this.comment = '';
  }
}
