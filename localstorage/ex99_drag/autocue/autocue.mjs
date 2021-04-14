// Scroll certain amounts from current position
const el = {};
let scrolling = false;
let offset = 0;
let direction = 1;

function startScroll(dir) {
  if (scrolling) {
    direction += dir;
  } else {
    direction = dir;
    toggleAnimation();
  }
}

function resetScroll() {
  offset = 0;
  scrolling = false;
  step();
}

function toggleAnimation() {
  scrolling = !scrolling;
  if (scrolling) step();
}

function step() {
  offset += direction;

  if (offset < 0) offset = 0;
  if (offset > el.main.clientHeight) offset = el.main.clientHeight;

  document.body.style.setProperty("--offset", (0-offset)+"px");
  if (scrolling) window.requestAnimationFrame(step);
}


function controlScroll(e) {
  if (e.key === 'Escape') resetScroll();
  if (e.key === 'ArrowDown') startScroll(1);
  if (e.key === 'ArrowUp') startScroll(-1);
  if (e.key === ' ') toggleAnimation();
}

function init() {
  el.main = document.querySelector("main");
  window.addEventListener('keyup', controlScroll);
};

window.addEventListener('load', init);

