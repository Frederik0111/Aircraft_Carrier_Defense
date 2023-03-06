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
  //nulstil visning af liv (hjerte vi ser)
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

  // start timer
  startTimer();

  // Registrer click
  document
    .querySelector("#japfighter_container")
    .addEventListener("click", clickCoin);
  document
    .querySelector("#japfighter2_container")
    .addEventListener("click", clickCoin);
  document
    .querySelector("#japfighter3_container")
    .addEventListener("click", clickCoin);
  document
    .querySelector("#usfighter_container")
    .addEventListener("click", clickBomb);

  // Registrer når bunden rammes
  document
    .querySelector("#japfighter_container")
    .addEventListener("animationiteration", coinRestart);
  document
    .querySelector("#japfighter2_container")
    .addEventListener("animationiteration", coinRestart);
  document
    .querySelector("#japfighter3_container")
    .addEventListener("animationiteration", coinRestart);
}

function startAllAnimations() {
  // Start flying animationer
  document.querySelector("#japfighter_container").classList.add("flying");
  document.querySelector("#japfighter2_container").classList.add("flying");
  document.querySelector("#japfighter3_container").classList.add("flying");
  document.querySelector("#usfighter_container").classList.add("flying");

  // Sæt position klasser
  document.querySelector("#japfighter_container").classList.add("position1");
  document.querySelector("#japfighter2_container").classList.add("position2");
  document.querySelector("#japfighter3_container").classList.add("position3");
  document.querySelector("#usfighter_container").classList.add("position4");
}

function clickCoin() {
  console.log("Click coin");
  // Brug en coin variabel i stedet for gentagne querySelectors
  const coin = this; // document.querySelector("#japfighter_container");

  // Forhindr gentagne clicks
  coin.removeEventListener("click", clickCoin);

  // Stop coin container
  coin.classList.add("paused");

  // sæt forsvind-animation på sprite
  coin.querySelector("img").classList.add("spiral");

  // når forsvind-animation er færdig: coinGone
  coin.addEventListener("animationend", coinGone);

  // Genstart mønt-lyd
  document.querySelector("#sound_plus").currentTime = 0;
  // Afspil mønt-lyd
  document.querySelector("#sound_plus").play();

  // Giv point
  incrementPoints();
}

function coinGone() {
  console.log("coin gone");
  // Brug en coin variabel i stedet for gentagne querySelectors
  const coin = this; //document.querySelector("#japfighter_container");
  // fjern event der bringer os herind
  coin.removeEventListener("animationend", coinGone);

  // fjern forsvind-animation på sprite
  coin.querySelector("img").classList.remove("spiral");

  // fjern pause
  coin.classList.remove("paused");

  if (isGameRunning) {
    coinRestart.call(this);
  }

  // gør det muligt at klikke på coin igen
  coin.addEventListener("click", clickCoin);
}

function coinRestart() {
  console.log("coin restart");
  const coin = this;

  // genstart flying animation
  coin.classList.remove("flying");
  coin.offsetWidth;
  coin.classList.add("flying");

  // fjern alle positioner
  coin.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  // sæt position til en ny klasse
  const p = Math.ceil(Math.random() * 5);
  coin.classList.add(`position${p}`);
}

function clickBomb() {
  console.log("Click bomb");
  // Forhindr gentagne clicks
  document
    .querySelector("#usfighter_container")
    .removeEventListener("click", clickBomb);

  // Stop coin container
  document.querySelector("#usfighter_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#usfighter_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  document
    .querySelector("#usfighter_container")
    .addEventListener("animationend", bombGone);

  // Genstart bombe-lyd
  document.querySelector("#sound_wrong").currentTime = 0;
  // Afspil bombe-lyd
  document.querySelector("#sound_wrong").play();

  decrementLives();
}

function bombGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#usfighter_container")
    .removeEventListener("animationend", bombGone);

  // fjern forsvind-animation
  document.querySelector("#usfighter_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#usfighter_container").classList.remove("paused");

  if (isGameRunning) {
    // genstart flying animation
    document.querySelector("#usfighter_container").classList.remove("flying");
    document.querySelector("#usfighter_container").offsetWidth;
    document.querySelector("#usfighter_container").classList.add("flying");

    // gør det muligt at klikke på bomb igen
    document
      .querySelector("#usfighter_container")
      .addEventListener("click", clickBomb);
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

function incrementLives() {
  console.log("få et liv");
  lives++;
  showIncrementedLives();
}

function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("full_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

function showIncrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("broken_heart");
  document.querySelector("#heart" + lives).classList.add("full_heart");
}

function gameOver() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");
  stopGame();
  document.querySelector("#sound_game_over").play();
  // vis antal points / mønter
  document.querySelector("#game_over_planes").textContent = points;
}

function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();
  // Afspil tada-lyd
  document.querySelector("#sound_victory").play();
  // vis antal points / mønter
  document.querySelector("#level_complete_coins").textContent = points;
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

  if (points >= 20) {
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
  document.querySelector("#usfighter_container").classList.remove("flying");

  // Fjern click
  document
    .querySelector("#japfighter_container")
    .removeEventListener("click", clickCoin);
  document
    .querySelector("#japfighter2_container")
    .removeEventListener("click", clickCoin);
  document
    .querySelector("#japfighter3_container")
    .removeEventListener("click", clickCoin);
  document
    .querySelector("#usfighter_container")
    .removeEventListener("click", clickBomb);

  // Stop og nulstil lyde, fx baggrundsmusik
  document.querySelector("#sound_battle").pause();
  document.querySelector("#sound_battle").currentTime = 0;

  // nulstil timer - fjern animationen fra timeren (fjern klassen shrink fra time_sprite)
  document.querySelector("#time_sprite").classList.remove("shrink");
}
