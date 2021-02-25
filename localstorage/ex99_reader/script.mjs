const DEFAULTS = {};
const OPTIONS = [];
const el = {};

function handleConfigChange() {

  const config = {};
  for (const opt of OPTIONS) {
    config[opt] = el[opt].value;
  }

  saveConfig(config);
  updateCSSVariables(config);
}

function saveConfig(config) {
  const configAsString = JSON.stringify(config);
  localStorage.setItem("readerConfig", configAsString);
}

function loadConfig() {
  const configAsString = localStorage.getItem("readerConfig");
  try {
    const config = JSON.parse(configAsString);
    return config;
  } catch (e) {
    return {};
  }
}

function updateCSSVariables(config) {
  const rootStyle = document.documentElement.style;
  for (const opt of OPTIONS) {
    rootStyle.setProperty('--'+opt, config[opt]+"em" );
  }
}
function init() {

  /**
   * Find options in the page
   */
  const inputs = document.querySelectorAll("input");
  for (const i of inputs) {
    OPTIONS.push(i.id);
    DEFAULTS[i.id] = i.value;
  }

  /* Get a handle on each element and store it for
   * later use whilst also connecting evebt listeners
   * to each.
   */
  for (const opt of OPTIONS) {
    el[opt] = document.querySelector("#"+opt);
    el[opt].addEventListener('input', handleConfigChange);
  }

  /* Load previously stired config and modify input fields
   * to reflect those values.
   */
  const config = loadConfig();
  for (const opt of OPTIONS) {
    el[opt].value = config[opt]+"em";
  }

  updateCSSVariables(config);

}

window.addEventListener('load', init);

