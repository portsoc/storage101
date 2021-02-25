const DEFAULTS = {};
const OPTIONS = [];
const el = {};

/* For any change to the page's input fields the configuration
 * should be saved.  This is achievd by constructing a new
 * object based on input field values, saving it, and then
 * updating CSS variables so the change is also reflected in
 * the page.
 */
function handleConfigChange() {

  const config = {};
  for (const opt of OPTIONS) {
    config[opt] = el[opt].value;
  }

  saveConfig(config);
  updateCSSVariables(config);
}

/* Store a configuration object in localStorage
 */
function saveConfig(config) {
  const configAsString = JSON.stringify(config);
  localStorage.setItem("readerConfig", configAsString);
}


/* Load the config object from localStorage.  If no object
 * can be loaded (e.g. first run) an empty object is returned.
 */
function loadConfig() {
  const configAsString = localStorage.getItem("readerConfig");
  try {
    const config = JSON.parse(configAsString);
    return config;
  } catch (e) {
    return {};
  }
}

/* Given a config object, update the document's custom
 * CSS properties with values from that object.
 */
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

  /* Load previously stored config and modify input fields
   * to reflect those values.
   */
  const config = loadConfig();
  for (const opt of OPTIONS) {
    el[opt].value = config[opt];
  }

  /* Use the config options in the page */
  updateCSSVariables(config);
};

window.addEventListener('load', init);

