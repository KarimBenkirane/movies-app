import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
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

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  @Output() onSendComment = new EventEmitter<Comment>();

  onSubmit() {
    if (!this.comment) {
      alert('Veuillez saisir votre commentaire.');
      return;
    }

    if (this.comment.length > 300) {
      alert('Veuillez saisir un commentaire de moins de 300 caractères.');
      return;
    }

    const comment: Comment = {
      username: this.email.trim(),
      comment: this.comment.trim(),
      rating: 2,
      date: new Date(),
    };

    this.onSendComment.emit(comment);

    this.openSnackBar('Commentaire ajouté avec succès !', 'OK !');

    // Réinitialisation des champs
    this.comment = '';
  }
}
