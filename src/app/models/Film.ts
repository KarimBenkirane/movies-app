export class Film {
  titre: string;
  annee: number;
  description: string;
  imageURL: string;

  constructor(
    titre: string,
    annee: number,
    description: string,
    imageURL: string
  ) {
    this.titre = titre;
    this.annee = annee;
    this.description = description;
    this.imageURL = imageURL;
  }
}
