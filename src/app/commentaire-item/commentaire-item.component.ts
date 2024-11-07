import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-commentaire-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './commentaire-item.component.html',
  styleUrl: './commentaire-item.component.css',
})
export class CommentaireItemComponent {
  @Input() comment!: { username: string; comment: string; date: Date };
}
