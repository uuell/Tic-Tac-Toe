let buttons = document.querySelectorAll(".button");
let player = true;

// adding the elements in the boxes
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", addGo);
}
function addGo(e) {
  let text = e.target.innerText;
  if (player && text == "") {
    e.target.childNodes[1].classList.add("cross");
    playersTurn();
    player = false;
  } else if (!player && text != "X") {
    e.target.childNodes[1].classList.add("circle");
    playersTurn();
    player = true;
  }
  e.target.removeEventListener("click", addGo);
  sequenceChecking();
}

// tic tac toe application
let winningSequences = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const tieSequences = [[0, 1, 2, 3, 4, 5, 6, 7, 8]];

let xScore = 0;
let oScore = 0;
let tiesScore = 0;

function sequenceChecking() {
  tieSequences.forEach((array) => {
    const ties = array.every(
      (cell) =>
        buttons[cell].childNodes[1].classList.contains("circle") ||
        buttons[cell].childNodes[1].classList.contains("cross")
    );

    if (ties) {
      document.getElementById("winner").removeAttribute("class");
      document.getElementById("round-winner").removeAttribute("class");
      document.getElementById("round-winner").classList.add("tied");
      document.getElementById("modal-header").innerText = "NO ONE WON";
      document.getElementById("round-winner").innerText = "";
      modal();
    }
  });
  winningSequences.forEach((array) => {
    let crossWins = array.every((cell) =>
      buttons[cell].childNodes[1].classList.contains("cross")
    );
    let circleWins = array.every((cell) =>
      buttons[cell].childNodes[1].classList.contains("circle")
    );
    if (crossWins) {
      document.getElementById("winner").removeAttribute("class");
      document.getElementById("round-winner").removeAttribute("class");
      document.getElementById("winner").classList.add("cross");
      document.getElementById("round-winner").classList.add("cross-wins");
      document.getElementById("modal-header").innerText = "YOU WON!";
      document.getElementById("round-winner").innerText = "TAKES THE ROUND";
      document.getElementById("x-current-score").innerText = ++xScore;
      modal();
    } else if (circleWins) {
      document.getElementById("winner").removeAttribute("class");
      document.getElementById("round-winner").removeAttribute("class");
      document.getElementById("winner").classList.add("circle");
      document.getElementById("round-winner").classList.add("circle-wins");
      document.getElementById("modal-header").innerText = "YOU WON!";
      document.getElementById("round-winner").innerText = "TAKES THE ROUND";
      document.getElementById("o-current-score").innerText = ++oScore;
      modal();
    }
  });
  tieScoring();
}

function tieScoring() {
  let roundWinnerText = document.getElementById("round-winner").innerText;
  if (roundWinnerText == "") {
    document.getElementById("ties-current-score").innerText = ++tiesScore;
    document.getElementById("round-winner").innerText = "IT'S A TIE!";
  }
}

// players turn
let turn = document.getElementById("players-turn").childNodes[1];

function playersTurn() {
  if (player) {
    removesAttributes(turn);
    turn.setAttribute("id", "small-circle");
    turn.setAttribute("class", "circle");
  } else if (!player) {
    removesAttributes(turn);
    turn.setAttribute("id", "small-cross");
    turn.setAttribute("class", "cross");
  }
}

// reset button
document.getElementById("reset-button").addEventListener("click", () => {
  document.getElementById("x-current-score").innerText = "0";
  document.getElementById("ties-current-score").innerText = "0";
  document.getElementById("o-current-score").innerText = "0";
  xScore = 0;
  oScore = 0;
  tiesScore = 0;
  removesAttributes(turn);
  turn.setAttribute("id", "small-cross");
  turn.setAttribute("class", "cross");
  player = true;
  buttons.forEach((element, index, array) => {
    document.getElementById(index).childNodes[1].removeAttribute("class");
    document.getElementById(index).addEventListener("click", addGo);
  });
});

// modal
const quitBtn = document.getElementById("quit-btn");
const nextRoundBtn = document.getElementById("next-round-btn");
const modalDisplay = document.getElementById("modal");

function modal() {
  document.getElementById("modal").style.display = "block";

  // Next Round button
  nextRoundBtn.addEventListener("click", () => {
    buttons.forEach((element, index, array) => {
      document.getElementById(index).childNodes[1].removeAttribute("class");
      modalDisplay.style.display = "none";
      document.getElementById(index).addEventListener("click", addGo);
    });
  });
  // Quit button
  quitBtn.addEventListener("click", () => {
    modalDisplay.style.display = "none";
  });
}

function removesAttributes(toremove) {
  toremove.removeAttribute("id");
  toremove.removeAttribute("class");
}
