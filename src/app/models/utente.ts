export class Utente {
  public nome!: string;
  public cognome!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public biografia!: string;
  public immagineProfilo!: string;

  Utente(nome: string, cognome: string,
    username: string, email: string, password: string,
    biografia: string, immagineProfilo: string){
      this.nome = nome;
      this.cognome = cognome;
      this.username = username;
      this.email = email;
      this.password = password;
      this.biografia = biografia;
      this.immagineProfilo = immagineProfilo;
  }

  public constructor(init?: Partial<Utente>) {
    Object.assign(this, init);
  }

}
