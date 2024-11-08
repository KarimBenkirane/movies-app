import { Component, EventEmitter, Output } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

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

    // Réinitialisation des champs
    this.username = '';
    this.comment = '';
  }
}
