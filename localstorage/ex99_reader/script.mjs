function save() {
  const config = {
    txt: document.querySelector('#txt').value,
    pad: document.querySelector('#pad').value,
    lnh: document.querySelector('#lnh').value,
  }
  const configAsString = JSON.stringify(config);
  localStorage.setItem("readerConfig", configAsString);

  updateVariables();
}

function loadConfig() {
  const configAsString = localStorage.getItem("readerConfig");
  const config = JSON.parse(configAsString);
  return config;
}

function updateVariables() {
  const config = loadConfig();
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--text', config.txt+"%" );
  rootStyle.setProperty('--padding', config.pad+"rem" );
  rootStyle.setProperty('--lineheight', config.lnh+"em" );
}

function updateInputValues() {
  const config = loadConfig();
  document.querySelector('#txt').value = config.txt;
  document.querySelector('#pad').value = config.pad;
  document.querySelector('#lnh').value = config.lnh;
  updateVariables();
}

function prepareListeners() {
  document.querySelector('#txt').addEventListener('input', save)
  document.querySelector('#pad').addEventListener('input', save)
  document.querySelector('#lnh').addEventListener('input', save)
  updateInputValues();
}

window.addEventListener('load', prepareListeners);

