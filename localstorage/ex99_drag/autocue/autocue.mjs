// Scroll certain amounts from current position

let scrolling;

function startScroll(dir) {
  const main = document.querySelector("main");
  main.style["animation-fill-mode"] = dir;
  main.style.animationDirection="reverse";

}

function resetScroll() {
}


function toggleAnimation() {
  const main = document.querySelector("main");
  const state = main.style["animation-play-state"];
  if (state === "running") {
    main.style["animation-play-state"] = "paused";
  } else {
    main.style["animation-play-state"] = "running";
  }
}

function controlScroll(e) {
  console.log(e.key);
  if (e.key === 'Escape') resetScroll();
  if (e.key === 'ArrowDown') startScroll('forwards');
  if (e.key === 'ArrowUp') startScroll('backwards');
  if (e.key === ' ') toggleAnimation();
}

function init() {
  window.addEventListener('keyup', controlScroll);
};

window.addEventListener('load', init);

