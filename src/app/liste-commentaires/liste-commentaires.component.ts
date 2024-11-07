import { Component, inject, Input, OnInit } from '@angular/core';
import { FilmsHelperService } from '../films-helper.service';
import { CommentaireItemComponent } from '../commentaire-item/commentaire-item.component';
@Component({
  selector: 'app-liste-commentaires',
  standalone: true,
  imports: [CommentaireItemComponent],
  templateUrl: './liste-commentaires.component.html',
  styleUrl: './liste-commentaires.component.css',
})
export class ListeCommentairesComponent {
  @Input() comments:
    | Array<{ username: string; comment: string; date: Date }>
    | undefined = [];
}
