// Scroll certain amounts from current position

let scrolling;

function startScroll(dir) {
  if (scrolling) {
    clearInterval(scrolling);
    scrolling = null;
  }
  if (dir !== 0) {
    scrolling = window.setInterval(
      () => {
        window.scrollBy({top: dir, behavior: 'smooth'});
      },
      1000
    );
  }
}

function controlScroll(e) {
  if (e.key === 'ArrowDown') startScroll(100);
  if (e.key === 'ArrowUp') startScroll(100);
  if (e.key === 'Space') startScroll(0);
}

function init() {
  window.addEventListener('keyup', controlScroll);
};

window.addEventListener('load', init);

