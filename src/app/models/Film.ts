export class Film {
  titre: string;
  annee: number;
  description: string;
  imageURL: string;
  acteurs: string[];

  constructor(
    titre: string,
    annee: number,
    description: string,
    imageURL: string,
    acteurs: string[]
  ) {
    this.titre = titre;
    this.annee = annee;
    this.description = description;
    this.imageURL = imageURL;
    this.acteurs = acteurs;
  }
}
