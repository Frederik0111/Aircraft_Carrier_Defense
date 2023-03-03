const japfighter = document.getElementById("japfighter");
let explosionInterval;

japfighter.addEventListener("click", function (event) {
  const x = event.clientX;
  const y = event.clientY;

  const explosion = document.createElement("div");
  explosion.classList.add("explode");
  explosion.style.left = x + "px";
  explosion.style.top = y + "px";

  document.body.appendChild(explosion);

  console.log("explosion added");
  japfighter.style.opacity = 0;
  clearInterval(explosionInterval);
  explosionInterval = setInterval(function () {
    explosion.remove();
    setTimeout(function () {
      const newExplosion = document.createElement("div");
      newExplosion.classList.add("explode");
      newExplosion.style.left = x + "px";
      newExplosion.style.top = y + "px";
      document.body.appendChild(newExplosion);
    }, 200);
  }, 4000);
  setTimeout(function () {
    console.log("Removing element");
    japfighter.remove();
    clearInterval(explosionInterval);
  }, 2200);
});
