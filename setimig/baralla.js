module.exports = class Baralla {
  constructor() {
    this._tipus = ""; //tipus és un string "esp" o "fra"
    this.pals = [];
    this.prepPals = [];
    this.numCartes = 13;
    this.NomCartes = [];
    this._valorCartes = [];
    this.cartes = [];
    this._cartesEnJoc = [];
    this.generada = false;
    this.barrejada = false;
  }

  set tipus(tipus) {
    this._tipus = tipus;
    if (tipus == "esp") {
      this._tipus = tipus;
      this.pals = ["Oros", "Copes", "Espases", "Bastos"];
      this.prepPals = ["d'", "de ", "d'", "de "];
      this.numCartes = 12;
      this.nomCartes = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];
    } else if (tipus == "fra") {
      this._tipus = tipus;
      this.pals = ["Cors", "Diamants", "Trèvols", "Piques"];
      this.prepPals = ["de ", "de ", "de ", "de "];
      this.numCartes = 13;
      this.nomCartes = [
        "As",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K"
      ];
    } else {
      this._tipus = "";
      this.pals = [];
      this.prepPals = [];
      this.numCartes = 0;
      this.nomCartes = [];
    }
  }

  set valorCartes(valors) {
    this._valorCartes = [...valors]; //S'espera un array amb el valor de les cartes
  }

  get generaCartes() {
    for (let p = 0; p < 4; p++) {
      for (let n = 0; n < this.numCartes; n++) {
        this.cartes.push({
          num: String(n + 1),
          pal: this.pals[p],
          prep: this.prepPals[p],
          nom: this.nomCartes[n],
          valor: this._valorCartes[n]
        });
      }
    }
    this.generada = true;
    return this;
  }

  get seleccionaCartesPerValor() {
    this.cartes = this.cartes.filter(carta => carta.valor != 0);
    return this;
  }
  // Mètode que barreja una baralla amb el mètode 'Fisher-Yates'
  get cartesEnJoc() {
    this._cartesEnJoc = [...this.cartes];
    for (let i = this._cartesEnJoc.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this._cartesEnJoc[i], this._cartesEnJoc[j]] = [this._cartesEnJoc[j], this._cartesEnJoc[i]];
    }
    this.barrejada = true;
    return this._cartesEnJoc;
  }

  get treuCarta() {
      let carta = this._cartesEnJoc.shift();
      return carta;
  }
}

