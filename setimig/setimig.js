//  Programa per jugar al set i mig

/*  Crearem la baralla de cartes a partir de la baralla espanyola.
    Tenim 48 cartes del 1 al 12 dels 4 pals oros, copes, espases i bastos.
    Crearem una baralla barrejada que tindrà les cartes del 1 al 7 i les cartes del 10 al 12 amb el valor de 0.5
*/

// Definim i creem la baralla espanyola com un array de cartes.
// Cada carta és un objecte amb 3 propietats: el pal, el número i el valor en el set i mig.
// El valor 0 indica que la carta no s'tutilitza.

const barallaEsp = [];
const palsBarallaEsp = ["Oros", "Copes", "Espases", "Bastos"];
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

let cartaEsp;
for (let p = 0; p < 4; p++) {
  for (let n = 0; n < 12; n++) {
    cartaEsp = {
      palCarta: palsBarallaEsp[p],
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

console.log(barallaSIM);

/*  Desenvolupament del joc:
    Hi ha un nombre de jugadors i la banca.
    La banca reparteix les cartes.
*/

const numJugadors = 1;


const prompt = require('prompt-sync')({sigint: true});

// Random number from 1 - 10
const numberToGuess = Math.floor(Math.random() * 10) + 1;
// This variable is used to determine if the app should continue prompting the user for input
let foundCorrectNumber = false;

while (!foundCorrectNumber) {
  // Get user input
  let guess = prompt('Guess a number from 1 to 10: ');
  // Convert the string input to a number
  guess = Number(guess);

  // Compare the guess to the secret answer and let the user know.
  if (guess === numberToGuess) {
    console.log('Congrats, you got it!');
    foundCorrectNumber = true;
  } else {
    console.log('Sorry, guess again!');
  }
}


// Funcions

// Funció que barreja una baralla amb el mètode 'Fisher-Yates'
function barrejaBaralla(baralla) {
  for (let i = baralla.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [baralla[i], baralla[j]] = [baralla[j], baralla[i]];
  }
}
