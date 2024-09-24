import { Component } from '@angular/core';
import { Film } from '../models/Film';

@Component({
  selector: 'app-liste-films',
  standalone: true,
  imports: [],
  templateUrl: './liste-films.component.html',
  styleUrl: './liste-films.component.css',
})
export class ListeFilmsComponent {
  films: Film[] = [
    new Film(
      'Les Évadés',
      1994,
      "Le banquier Andy Dufresne est arrêté pour avoir tué sa femme et son amant. Après une dure adaptation, il tente d'améliorer les conditions de la prison et de redonner de l'espoir à ses compagnons.",
      'https://fr.web.img2.acsta.net/r_1920_1080/pictures/22/06/02/09/19/1433868.jpg'
    ),
    new Film(
      'Le Parrain',
      1972,
      "Le patriarche vieillissant d'une dynastie de la mafia New Yorkaise passe le flambeau de son empire clandestin à son fils réticent.",
      'http://www.cinemapassion.com/lesaffiches/Le_parrain-20090303031603.jpg'
    ),
    new Film(
      'The Dark Knight : Le Chevalier Noir',
      2008,
      "Lorsqu'une menace mieux connue sous le nom du Joker émerge de son passé mystérieux et déclenche le chaos sur la ville de Gotham, Batman doit faire face au plus grand des défis psychologique et physique afin de combattre l'injustice.",
      'https://m.media-amazon.com/images/S/pv-target-images/aeefe45eaed451ccb050204710f8c91d171dd8c6818529fc318630d28c68b611.jpg'
    ),
    new Film(
      'Fight Club',
      1999,
      'Un employé de bureau insomniaque et un fabriquant de savons forment un club de combat clandestin qui devient beaucoup plus que ça.',
      'https://m.media-amazon.com/images/I/61IgtYrLF5L._AC_SY550_.jpg'
    ),
  ];
}
