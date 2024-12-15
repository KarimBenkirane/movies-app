import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Cast } from '../../models/Cast';

@Component({
  selector: 'app-acteur-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './acteur-item.component.html',
  styleUrl: './acteur-item.component.css',
})
export class ActeurItemComponent {
  @Input() acteur!: Cast;
  profileUrl: string = 'https://image.tmdb.org/t/p/w185/';
}
