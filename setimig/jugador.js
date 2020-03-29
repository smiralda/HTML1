class Jugador {
  constructor(nom, cognoms, dataNaixement) {
    this.nom = nom;
    this.cognoms = cognoms;
    this._dataNaixement = new Date(dataNaixement);
  }
  get nomCognoms() {
    return this.nom + " " + this.cognoms;
  }

  set dataNaixement(dataNaixement) {
    this._dataNaixement = new Date(dataNaixement);
  }
  get dataNaixement() {
    return this._dataNaixement.toLocaleDateString();
  }
  get edat() {
    let ara = new Date();
    let dataEdat = new Date(
      ara.getTime() - this._dataNaixement.getTime() - 1000 * 60 * 60 * 24
    );
    return dataEdat.getUTCFullYear() - 1970;
  }
  
  set nif(nif) {
    this._nif = nif;
  }
}

let persona = new Persona("Santi", "Miralda");
persona.dataNaixement = "2007-03-30";
persona.nif = "45463746Z";
console.log(persona.edat);
console.log(persona);
