import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../models/Comment';
@Component({
  selector: 'app-commentaire-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './commentaire-item.component.html',
  styleUrl: './commentaire-item.component.css',
})
export class CommentaireItemComponent {
  @Input() comment!: Comment;
}
