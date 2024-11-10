import { Component, Input } from '@angular/core';
import { ActeurItemComponent } from '../acteur-item/acteur-item.component';
import { Cast } from '../models/Cast';

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
