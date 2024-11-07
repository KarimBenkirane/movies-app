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
      alert('Veuillez ne laisser aucun champ vide svp !');
      return;
    }

    const comment = {
      username: this.username,
      comment: this.comment,
      date: new Date(),
    };

    this.onSendComment.emit(comment);

    this.username = '';
    this.comment = '';
  }
}
