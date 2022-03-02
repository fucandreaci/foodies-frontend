import { Utente } from "./utente";

export class Post{
  public id!: number;

  public titolo!: string;
  public descrizione!: string;
  public dataPubblicazione!: string;
  public immagine!: string;

  public likes!: Utente[];
  public unlikes!: Utente[];

  public utente!: Utente;

  public errore!: string;

  Post(titolo: string, descrizione: string,
    dataPubblicazione: string, immagine: string,
    id: number, _likes: Utente[],
    unlikes: Utente[], utente: Utente){
      this.id = id;
      this.titolo = titolo;
      this.descrizione = descrizione;
      this.dataPubblicazione = dataPubblicazione;
      this.immagine = immagine;
      this.likes = _likes;
      this.unlikes = unlikes;
      this.utente = utente
  }

  public constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}
