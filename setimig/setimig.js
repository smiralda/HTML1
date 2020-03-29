//  Programa per jugar al set i mig

const prompt = require("prompt-sync")({ sigint: true });
const Baralla = require('./baralla.js');

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
let banca = jugadors[0];

//Es pregunta el nombre de rondes.
let numRondes = obteValor(`Quantes rondes vols jugar`, maxRondes);

// S'inicia el joc.
console.log(`Comença el joc.`);

// S'obté la baralla de cartes del set i mig.
let barallaSIM = new Baralla();
barallaSIM.tipus = "fra";
barallaSIM.valorCartes = [1, 2, 3, 4, 5, 6, 7, 0, 0, 0.5, 0.5, 0.5, 0.5];
barallaSIM = barallaSIM.generaCartes.seleccionaCartesPerValor;

// s'obtenen les cartes en joc mesclades.
let cartesEnJoc = barallaSIM.cartesEnJoc;

// Es juga cada una de les rondes.
for (let r = 1; r <= numRondes; r++) {
  console.log(`\n*** ${ordinalRondes[r]} ronda ***`);
  
  //Es juga per cada un dels jugadors.
  //Es comença per la posició 1 ja que la 0 és la banca.
  for (let i = 1; i < jugadors.length; i++) {
    //Primer juga el jugador
    let jugador = jugadors[i];
    if (jugador.saldo > 0) {
      console.log(`\n${jugador.nom}, et toca a tu.`);

      let aposta = 0;
      let esCanviAposta = false;
      let carta = {};
      let esSimSuperat = false;
      let esSimIgualat = false;
      let guanyaLaBanca = false;
      jugador.punts = 0;

      //Treu cartes fins que el jugador es planta o bé iguala o supera el set i mig.
      do {
        esCanviAposta = false;
        carta = cartesEnJoc.shift();
        jugador.punts += carta.valor;
        console.log(
          `  ${carta.nom} ${carta.prep}${carta.pal}. Punts: ${jugador.punts}. Aposta: ${aposta}`
        );
        if (jugador.punts > 7.5) {
          esSimSuperat = true;
        } else if (jugador.punts == 7.5) {
          esSimIgualat = true;
        } else {
          if (
            aposta == 0 ||
            prompt(`Vols canviar la teva aposta (Si:s No:Intro)? `) == "s"
          ) {
            esCanviAposta = aposta != 0;
            aposta = Number(
              obteValor("Quina és la teva aposta?", jugador.saldo)
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
            `T'has plantat a ${jugador.punts} punts, apostant ${aposta}€.`
          );
        }
        // Ara juga la banca.
        console.log(`\nAra juga la banca.`);

        banca.punts = 0;
        esSimSuperat = false;
        do {
          carta = cartesEnJoc.shift();
          banca.punts += carta.valor;
          console.log(
            `  ${carta.nom} ${carta.prep}${carta.pal}. Punts: ${banca.punts}`
          );
          if (banca.punts > 7.5) {
            esSimSuperat = true;
          } else if (banca.punts >= jugador.punts) {
            guanyaLaBanca = true;
          }
        } while (!esSimSuperat && !guanyaLaBanca);
        if (guanyaLaBanca) {
          console.log(`La banca s'ha plantat a ${banca.punts} punts.`);
        }
      }
      if (guanyaLaBanca) {
        banca.saldo += aposta;
        jugador.saldo -= aposta;
        console.log(
          `\nHa guanyat la banca. Has perdut ${aposta}€. El teu saldo és de ${jugador.saldo}€.`
        );
      } else {
        banca.saldo -= aposta;
        jugador.saldo += aposta;
        console.log(
          `\nHas guanyat la ronda. Has guanyat ${aposta}€. El teu saldo és de ${jugador.saldo}€.`
        );
      }
    } else {
      console.log(`\n${jugador.nom}, no tens saldo; no pots seguir jugant.`);
    }
  };
}

// Mostra el resultat de la partida.
console.log(`\nResulat final:`);
jugadors.forEach(jugador => {
  console.log(`  ${jugador.nom}: ${jugador.saldo}€.`);
});
