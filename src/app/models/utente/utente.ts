export class Utente {
  private nome!: string;
  private cognome!: string;
  private username!: string;
  private email!: string;
  private password!: string;
  private biografia!: string;
  private immagineProfilo!: string;

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


  getUsername(): string {
    return this.username;
  }

  setUsername(username: string) {
    this.username = username;
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string) {
    this.nome = nome;
  }

  getCognome(): string {
    return this.cognome;
  }

  setCognome(cognome: string) {
    this.cognome = cognome;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getBiografia(): string {
    return this.biografia;
  }

  setBiografia(biografia: string) {
    this.biografia = biografia;
  }

  getImmagineProfilo(): string {
    return this.immagineProfilo;
  }

  setImmagineProfilo(immagineProfilo: string) {
    this.immagineProfilo = immagineProfilo;
  }

}
