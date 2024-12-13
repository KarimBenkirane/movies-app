import { Component, inject, Input, OnInit } from '@angular/core';
import { CastService } from '../../services/cast.service';
import { ActeurItemComponent } from '../acteur-item/acteur-item.component';
import { Cast } from '../models/Cast';

@Component({
  selector: 'app-liste-acteurs',
  standalone: true,
  imports: [ActeurItemComponent],
  templateUrl: './liste-acteurs.component.html',
  styleUrl: './liste-acteurs.component.css',
})
export class ListeActeursComponent implements OnInit {
  acteurs: Cast[] = [];
  castService = inject(CastService);
  @Input() filmId!: number;

  ngOnInit(): void {
    this.castService
      .getFilmCreditsById(this.filmId)
      .subscribe((credits: any) => {
        this.acteurs = credits.cast.filter(
          (elt: any) => elt.known_for_department === 'Acting'
        );
      });
  }
}
