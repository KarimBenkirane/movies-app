import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CommentaireItemComponent } from '../commentaire-item/commentaire-item.component';
import { Comment } from '../models/Comment';
@Component({
  selector: 'app-liste-commentaires',
  standalone: true,
  imports: [CommentaireItemComponent, MatDividerModule],
  templateUrl: './liste-commentaires.component.html',
  styleUrl: './liste-commentaires.component.css',
})
export class ListeCommentairesComponent {
  @Input() comments: Comment[] | undefined = [];
}
