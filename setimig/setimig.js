//  Programa per jugar al set i mig

const prompt = require("prompt-sync")({ sigint: true });

/*  Crearem la baralla de cartes a partir de la baralla espanyola.
    Tenim 48 cartes del 1 al 12 dels 4 pals oros, copes, espases i bastos.
    Crearem una baralla barrejada que tindrà les cartes del 1 al 7 i les cartes del 10 al 12 amb el valor de 0.5
*/

// Definim i creem la baralla espanyola com un array de cartes.
// Cada carta és un objecte amb 4 camps: el pal, la preposició, el número i el valor en el set i mig.
// El valor 0 indica que la carta no s'utilitza.

const palsBarallaEsp = ["Oros", "Copes", "Espases", "Bastos"];
const preposPals = ["d'", "de ", "d'", "de "];

const numsBarallaEsp = [
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
const valorsSIM = [1, 2, 3, 4, 5, 6, 7, 0, 0, 0.5, 0.5, 0.5];

const nomBanca = "Banca";
const saldoBanca = 500;
const maxSaldoInicial = 50;

const maxRondes = 10;
const ordinalRondes = [
  null,
  "Primera",
  "Segona",
  "Tercera",
  "Quarta",
  "Cinquena",
  "Sisena",
  "Setena",
  "Vuitena",
  "Novena",
  "Desena"
];

const maxJugadors = 5;
const ordinalJugadors = [null, "Primer", "Segon", "Tercer", "Quart", "Cinquè"];

//Creen la baralla espanyola sencera.
const barallaEsp = [];
let cartaEsp;
for (let p = 0; p < 4; p++) {
  for (let n = 0; n < 12; n++) {
    cartaEsp = {
      palCarta: palsBarallaEsp[p],
      preposPal: preposPals[p],
      numCarta: numsBarallaEsp[n],
      valorSIM: valorsSIM[n]
    };
    barallaEsp.push(cartaEsp);
  }
}

// Obtenim una baralla amb només les cartes del set i mig i barregem la baralla.
const barallaSIM = barrejaBaralla(
  barallaEsp.filter(carta => carta.valorSIM != 0)
);

// Funció que barreja una baralla amb el mètode 'Fisher-Yates'
function barrejaBaralla(baralla) {
  for (let i = baralla.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [baralla[i], baralla[j]] = [baralla[j], baralla[i]];
  }
  return baralla;
}

//  Desenvolupament del joc:

//Funció que pregunta un valor a l'usuari a través de la consola.
function obteValor(pregunta, maxValor) {
  let esRespostaCorrecta = false;
  let valor = 0;
  while (!esRespostaCorrecta) {
    valor = prompt(`${pregunta} (max: ${maxValor})? `);
    if (valor > 0 && valor <= maxValor) {
      esRespostaCorrecta = true;
    } else {
      console.log("Resposta incorrecta!");
    }
  }
  return valor;
}

//Es pregunta el saldo inicial dels jugadors i el nombre de jugadors.
let saldoInicial = obteValor(
  `Amb quin saldo inicial comencen els jugadors (€)`,
  maxSaldoInicial
);
let numJugadors = obteValor(`Quants jugadors participen`, maxJugadors);

//Funció que crea un array amb la banca i els jugadors
//Cada jugador té 3 camps: el nom, els punts d'una jugada i el saldo.
function obteJugadors(numJugadors) {
  let jugadors = [{ nom: nomBanca, punts: 0, saldo: saldoBanca }];
  let esRespostaCorrecta = false;
  let nomJugador = "";
  for (let i = 1; i <= numJugadors; i++) {
    esRespostaCorrecta = false;
    while (!esRespostaCorrecta) {
      nomJugador = prompt(
        `Escriu el nom del ${ordinalJugadors[i].toLowerCase()} jugador: `
      );
      if (nomJugador != "") {
        esRespostaCorrecta = true;
        jugadors.push({
          nom: nomJugador,
          punts: 0,
          saldo: Number(saldoInicial)
        });
      } else {
        console.log("Resposta incorrecta!");
      }
    }
  }
  return jugadors;
}

let jugadors = obteJugadors(numJugadors);

//Es pregunta el nombre de rondes.
let numRondes = obteValor(`Quantes rondes vols jugar`, maxRondes);

// S'inicia el joc.
console.log(`Comença el joc.`);

// Es juga cada una de les rondes.
for (let r = 1; r <= numRondes; r++) {
  console.log(`\n*** ${ordinalRondes[r]} ronda ***`);

  //Es juga per cada un dels jugadors.
  for (let i = 1; i <= jugadors.length - 1; i++) {
    //Primer juga el jugador
    console.log(`\n${jugadors[i].nom}, et toca a tu.`);

    if (jugadors[i].saldo == 0) {
      console.log("No tens saldo. No pots seguir jugant.");
      break;
    }

    let aposta = 0;
    let esCanviAposta = false;
    let carta = {};
    let esSimSuperat = false;
    let esSimIgualat = false;
    let guanyaLaBanca = false;
    let puntsJugador = jugadors[i].punts;

    //Treu cartes fins que el jugador es planta o bé iguala o supera el set i mig.
    do {
      esCanviAposta = false;
      carta = barallaSIM.shift();
      puntsJugador += carta.valorSIM;
      console.log(
        `  ${carta.numCarta} ${carta.preposPal}${carta.palCarta}. Punts: ${puntsJugador}. Aposta: ${aposta}`
      );
      if (puntsJugador > 7.5) {
        esSimSuperat = true;
      } else if (puntsJugador == 7.5) {
        esSimIgualat = true;
      } else {
        if (
          aposta == 0 ||
          prompt(`Vols canviar la teva aposta (Si:s No:Intro)? `) == "s"
        ) {
          esCanviAposta = aposta != 0;
          aposta = Number(
            obteValor("Quina és la teva aposta?", jugadors[i].saldo)
          );
        }
      }
    } while (
      esCanviAposta ||
      (!esSimSuperat &&
        !esSimIgualat &&
        prompt(`Et vols plantar (Si:s No:Intro)? `) != "s")
    );
    if (esSimSuperat) {
      console.log(`Has superat el límit!`);
      guanyaLaBanca = true;
    } else {
      if (esSimIgualat) {
        console.log(
          `Ets un crack! Has igualat el set i mig, apostant ${aposta}€.`
        );
      } else {
        console.log(
          `T'has plantat a ${puntsJugador} punts, apostant ${aposta}€.`
        );
      }
      // Ara juga la banca.
      console.log(`\nAra juga la banca.`);

      esSimSuperat = false;
      let puntsBanca = jugadors[0].punts;
      do {
        carta = barallaSIM.shift();
        puntsBanca += carta.valorSIM;
        console.log(
          `  ${carta.numCarta} ${carta.preposPal}${carta.palCarta}. Punts: ${puntsBanca}`
        );
        if (puntsBanca > 7.5) {
          esSimSuperat = true;
        } else if (puntsBanca >= puntsJugador) {
          guanyaLaBanca = true;
        }
      } while (!esSimSuperat && !guanyaLaBanca);
      if (guanyaLaBanca) {
        console.log(`La banca s'ha plantat a ${puntsBanca} punts.`);
      }
    }
    if (guanyaLaBanca) {
      jugadors[0].saldo += aposta;
      jugadors[i].saldo -= aposta;
      console.log(
        `\nHa guanyat la banca. Has perdut ${aposta}€. El teu saldo és de ${jugadors[i].saldo}€.`
      );
    } else {
      jugadors[0].saldo -= aposta;
      jugadors[i].saldo += aposta;
      console.log(
        `\nHas guanyat la ronda. Has guanyat ${aposta}€. El teu saldo és de ${jugadors[i].saldo}€.`
      );
    }
  }
}

// Mostra el resultat de la partida.
console.log(`\nResulat final:`);
for (let i = 0; i < jugadors.length; i++) {
  console.log(`  ${jugadors[i].nom}: ${jugadors[i].saldo}€.`);
}
