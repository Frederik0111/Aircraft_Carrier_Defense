"use strict";
window.addEventListener("load", ready);

// globale variabler
let points = 0;
let lives = 0;
let isGameRunning = false;

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("click", showStartScreen);
}

function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerter vi ser)
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("full_heart");
  document.querySelector("#heart2").classList.add("full_heart");
  document.querySelector("#heart3").classList.add("full_heart");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
}

function startGame() {
  isGameRunning = true;

  resetLives();
  resetPoints();
  showGameScreen();

  // Start baggrundsmusik
  document.querySelector("#sound_battle").play();
  // start alle animationer
  startAllAnimations();
  // tilføjer tilfældige positions
  addPositions();
  // gør det muligt at klikke på planes
  clickPlanes();
  // start timer
  startTimer();
}

function startAllAnimations() {
  // Start flying animationer
  document.querySelector("#japfighter_container").classList.add("flying");
  document.querySelector("#japfighter2_container").classList.add("flying");
  document.querySelector("#japfighter3_container").classList.add("flying");
  document.querySelector("#japfighter4_container").classList.add("flying");
  document.querySelector("#usfighter_container").classList.add("flying");
}

function addPositions() {
  // Sæt position klasser
  // tilfældige positioner virker ikke
  document
    .querySelector("#japfighter_container")
    .classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document
    .querySelector("#japfighter2_container")
    .classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document
    .querySelector("#japfighter3_container")
    .classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document
    .querySelector("#japfighter4_container")
    .classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document
    .querySelector("#usfighter_container")
    .classList.add("position" + (Math.floor(Math.random() * 5) + 1));
}

function clickPlanes() {
  // Registrer mousedown
  document
    .querySelector("#japfighter_container")
    .addEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#japfighter2_container")
    .addEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#japfighter3_container")
    .addEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#japfighter4_container")
    .addEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#usfighter_container")
    .addEventListener("mousedown", mousedownAlly);

  // Registrer når flyene rammer højre side
  document
    .querySelector("#japfighter_container")
    .addEventListener("animationiteration", planeRestart);
  document
    .querySelector("#japfighter2_container")
    .addEventListener("animationiteration", planeRestart);
  document
    .querySelector("#japfighter3_container")
    .addEventListener("animationiteration", planeRestart);
  document
    .querySelector("#japfighter4_container")
    .addEventListener("animationiteration", planeRestart);
}

function mousedownPlane() {
  console.log("mousedown plane");
  // Brug en plane variabel i stedet for gentagne querySelectors
  const plane = this; // document.querySelector("#japfighter_container");

  // Forhindr gentagne mousedowns
  plane.removeEventListener("mousedown", mousedownPlane);

  // Stop plane container
  plane.classList.add("paused");

  // sæt forsvind-animation på sprite
  plane.querySelector("img").classList.add("spiral");

  // når forsvind-animation er færdig: planeGone
  plane.addEventListener("animationend", planeGone);

  // Genstart nedskydning-lyd
  document.querySelector("#sound_gunShot").currentTime = 0;
  // Afspil nedskydning-lyd
  document.querySelector("#sound_gunShot").play();

  // Giv point
  incrementPoints();
}

function planeGone() {
  console.log("plane gone");
  // Brug en plane variabel i stedet for gentagne querySelectors
  const plane = this; //document.querySelector("#japfighter_container");
  // fjern event der bringer os herind
  plane.removeEventListener("animationend", planeGone);

  // fjern forsvind-animation på sprite
  plane.querySelector("img").classList.remove("spiral");

  // fjern pause
  plane.classList.remove("paused");

  if (isGameRunning) {
    planeRestart.call(this);
  }

  // gør det muligt at klikke på plane igen
  plane.addEventListener("mousedown", mousedownPlane);
}

function planeRestart() {
  console.log("plane restart");
  let plane = this;

  // genstart flying animation
  plane.classList.remove("flying");
  plane.offsetWidth;
  plane.classList.add("flying");

  // fjern alle positioner
  plane.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  // sæt position til en ny klasse
  let position = Math.floor(Math.random() * 5) + 1;
  plane.classList.add("position" + position);
}

function mousedownAlly() {
  console.log("mousedown ally plane");
  // Forhindr gentagne mousedowns
  document
    .querySelector("#usfighter_container")
    .removeEventListener("mousedown", mousedownAlly);

  // Stop plane container
  document.querySelector("#usfighter_container").classList.add("paused");

  // sæt forsvind-animation på plane
  document.querySelector("#usfighter_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: planeGone
  document
    .querySelector("#usfighter_container")
    .addEventListener("animationend", allyGone);

  // Genstart ally-lyd
  document.querySelector("#sound_wrong").currentTime = 0;
  // Afspil ally-lyd
  document.querySelector("#sound_wrong").play();

  decrementLives();
}

function allyGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#usfighter_container")
    .removeEventListener("animationend", allyGone);

  // fjern forsvind-animation
  document.querySelector("#usfighter_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#usfighter_container").classList.remove("paused");

  if (isGameRunning) {
    // genstart flying animation
    document.querySelector("#usfighter_container").classList.remove("flying");
    document.querySelector("#usfighter_container").offsetWidth;
    document.querySelector("#usfighter_container").classList.add("flying");

    // gør det muligt at klikke på ally igen
    document
      .querySelector("#usfighter_container")
      .addEventListener("mousedown", mousedownAlly);
  }
}

function incrementPoints() {
  console.log("Giv point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#plane_count").textContent = points;
}

function decrementLives() {
  console.log("mist et liv");

  if (lives === 1) {
    gameOver();
  }

  showDecrementedLives();
  lives--;
}

function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("full_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

function gameOver() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");
  stopGame();
  document.querySelector("#sound_game_over").play();
  // vis antal points / nedskydte fly
  document.querySelector("#game_over_planes").textContent = points;
}

function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();
  // Afspil tada-lyd
  document.querySelector("#sound_victory").play();
  // vis antal points / nedskydte fly
  document.querySelector("#level_complete_planes").textContent = points;
}

function startTimer() {
  // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 30) {
    levelComplete();
  } else {
    gameOver();
  }
}

function stopGame() {
  isGameRunning = false;
  // Stop animationer
  document.querySelector("#japfighter_container").classList.remove("flying");
  document.querySelector("#japfighter2_container").classList.remove("flying");
  document.querySelector("#japfighter3_container").classList.remove("flying");
  document.querySelector("#japfighter4_container").classList.remove("flying");
  document.querySelector("#usfighter_container").classList.remove("flying");

  // Fjern mousedown
  document
    .querySelector("#japfighter_container")
    .removeEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#japfighter2_container")
    .removeEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#japfighter3_container")
    .removeEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#japfighter4_container")
    .removeEventListener("mousedown", mousedownPlane);
  document
    .querySelector("#usfighter_container")
    .removeEventListener("mousedown", mousedownAlly);

  // Stop og nulstil lyde, fx baggrundsmusik
  document.querySelector("#sound_battle").pause();
  document.querySelector("#sound_battle").currentTime = 0;

  // nulstil timer - fjern animationen fra timeren (fjern klassen shrink fra time_sprite)
  document.querySelector("#time_sprite").classList.remove("shrink");
}
