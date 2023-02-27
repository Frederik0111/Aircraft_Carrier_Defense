const japfighter = document.getElementById("japfighter");

japfighter.onclick = function () {
  japfighter.style.background = 'url("./images/explosion1.png") 0 0 no-repeat';
  setTimeout(() => {
    japfighter.style.display = "none";
  }, 2000);
};

const japbomber = document.getElementById("japbomber");

japbomber.onclick = function () {
  japbomber.style.background = 'url("./images/explosion2.png") 0 0 no-repeat';
  setTimeout(() => {
    japbomber.style.display = "none";
  }, 2000);
};

const usfighter = document.getElementById("usfighter");

usfighter.onclick = function () {
  usfighter.style.background = 'url("./images/explosion1.png") 0 0 no-repeat';
  setTimeout(() => {
    usfighter.style.display = "none";
  }, 2000);
};

const usbomber = document.getElementById("usbomber");

usbomber.onclick = function () {
  usbomber.style.background = 'url("./images/explosion2.png") 0 0 no-repeat';
  setTimeout(() => {
    usbomber.style.display = "none";
  }, 2000);
};
     