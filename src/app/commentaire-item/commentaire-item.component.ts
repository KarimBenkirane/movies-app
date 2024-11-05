import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-commentaire-item',
  standalone: true,
  imports: [],
  templateUrl: './commentaire-item.component.html',
  styleUrl: './commentaire-item.component.css',
})
export class CommentaireItemComponent {
  @Input() comment!: { username: string; comment: string };
}
