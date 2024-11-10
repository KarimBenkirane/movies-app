import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-creer-commentaire',
  standalone: true,
  imports: [FontAwesomeModule, FontAwesomeModule, FormsModule],
  templateUrl: './creer-commentaire.component.html',
  styleUrl: './creer-commentaire.component.css',
})
export class CreerCommentaireComponent {
  faPaperPlane = faPaperPlane;
  username: string = '';
  comment: string = '';

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  @Output() onSendComment = new EventEmitter<{
    username: string;
    comment: string;
    date: Date;
  }>();

  onSubmit() {
    if (!this.username || !this.comment) {
      alert('Veuillez ne laisser aucun champ vide.');
      return;
    }

    if (this.username.length < 3 || this.username.length > 20) {
      alert("Le nom d'utilisateur doit comporter entre 3 et 20 caractères.");
      return;
    }

    if (this.comment.length > 300) {
      alert('Veuillez saisir un commentaire de moins de 300 caractères.');
      return;
    }

    const comment = {
      username: this.username.trim(),
      comment: this.comment.trim(),
      date: new Date(),
    };

    this.onSendComment.emit(comment);

    this.openSnackBar('Commentaire ajouté avec succès !', 'OK !');

    // Réinitialisation des champs
    this.username = '';
    this.comment = '';
  }
}
