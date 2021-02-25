/* Load content from a file */
function loadTextPromise(file) {
  const fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.addEventListener('load', () => resolve(fr.result));
    fr.readAsText(file);
  });
};

/**
 * A naive formatter that looks for two carriage returns
 * to denote a paragraph, and uses this to split text.
 * Paragraphs are then added one by one to the page.
 */
function format(text) {
  const main = document.querySelector('main');
  main.textContent='';
  const paras = text.split("\n\n");
  for (const para of paras) {
    const p = document.createElement('p');
    p.textContent = para;
    main.append(p);
  }
}

/**
 * If a text file is dropped, its content
 * should be loaded, formatted and placed
 * in the page.
 */
async function handleDrop(e) {
  e.preventDefault();
  for (const file of e.dataTransfer.files) {
    if (file.type === "text/plain") {
      const text = await loadTextPromise(file);
      format(text);
    }
  }
}

/* The makes drop events receiveable, without it the default
 * behaviour on drop is to replace the current page.
 */
function handleDragOver(e) {
  e.preventDefault();
}

/* When the page is loaded, prepare the whole window
 * to receive dropped files.
 */
function init() {
  window.addEventListener("dragover", handleDragOver);
  window.addEventListener("drop", handleDrop);
};

window.addEventListener('load', init);