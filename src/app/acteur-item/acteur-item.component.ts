import { Component, Input } from '@angular/core';
import { Cast } from '../models/Cast';
import { MatCardModule } from '@angular/material/card';

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
