import { Component, Input } from '@angular/core';
import { Cast } from '../models/Cast';
import { ActeurItemComponent } from '../acteur-item/acteur-item.component';

@Component({
  selector: 'app-liste-acteurs',
  standalone: true,
  imports: [ActeurItemComponent],
  templateUrl: './liste-acteurs.component.html',
  styleUrl: './liste-acteurs.component.css',
})
export class ListeActeursComponent {
  @Input() acteurs: Cast[] = [];
}
