import { Injectable } from '@angular/core';
import { Film } from './models/Film';

@Injectable({
  providedIn: 'root',
})
export class FilmsHelperService {
  favoriteFilms: Film[] = [];

  getFavoriteCount(): number {
    return this.favoriteFilms.length;
  }

  addToFavorites(film: Film) {
    this.favoriteFilms.push(film);
  }

  getFilmByTitre(titre: string): Film | undefined {
    return this.getAllFilms().find((elt) => elt.titre === titre);
  }

  getAllFilms(): Film[] {
    return [
      new Film(
        'Les Évadés',
        2024,
        "Le banquier Andy Dufresne est arrêté pour avoir tué sa femme et son amant. Après une dure adaptation, il tente d'améliorer les conditions de la prison et de redonner de l'espoir à ses compagnons.",
        'https://fr.web.img2.acsta.net/r_1920_1080/pictures/22/06/02/09/19/1433868.jpg',
        [
          'Tim Robbins',
          'Morgan Freeman',
          'Bob Gunton',
          'William Sadler',
          'Clancy Brown',
        ]
      ),
      new Film(
        'Le Parrain',
        1972,
        "Le patriarche vieillissant d'une dynastie de la mafia New Yorkaise passe le flambeau de son empire clandestin à son fils réticent.",
        'http://www.cinemapassion.com/lesaffiches/Le_parrain-20090303031603.jpg',
        [
          'Marlon Brando',
          'Al Pacino',
          'James Caan',
          'Robert Duvall',
          'Diane Keaton',
        ]
      ),
      new Film(
        'The Dark Knight : Le Chevalier Noir',
        2008,
        "Lorsqu'une menace mieux connue sous le nom du Joker émerge de son passé mystérieux et déclenche le chaos sur la ville de Gotham, Batman doit faire face au plus grand des défis psychologique et physique afin de combattre l'injustice.",
        'https://m.media-amazon.com/images/S/pv-target-images/aeefe45eaed451ccb050204710f8c91d171dd8c6818529fc318630d28c68b611.jpg',
        [
          'Christian Bale',
          'Heath Ledger',
          'Aaron Eckhart',
          'Michael Caine',
          'Maggie Gyllenhaal',
          'Gary Oldman',
        ]
      ),
      new Film(
        'Fight Club',
        1999,
        'Un employé de bureau insomniaque et un fabriquant de savons forment un club de combat clandestin qui devient beaucoup plus que ça.',
        'https://m.media-amazon.com/images/I/61IgtYrLF5L._AC_SY550_.jpg',
        [
          'Brad Pitt',
          'Edward Norton',
          'Helena Bonham Carter',
          'Meat Loaf',
          'Jared Leto',
        ]
      ),
    ];
  }

  constructor() {}
}
