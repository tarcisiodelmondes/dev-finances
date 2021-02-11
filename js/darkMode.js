const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");

const getStyle = (element, style) => {
  return window.getComputedStyle(element).getPropertyValue(style);
};

const initialColors = {
  paragrafoFooter: getStyle(html, "--paragrafo-footer"),
  green: getStyle(html, "--green"),
  blackGreen: getStyle(html, "--black-green"),
  lightGreen: getStyle(html, "--light-green"),
  red: getStyle(html, "--red"),
  whiteBody: getStyle(html, "--white-body"),
  black: getStyle(html, "--black"),
  orange: getStyle(html, "--orange"),
};

const darkMode = {
  green: "#2e9599",
  lightGreen: "#44d3d8",
  blackGreen: "#a7226f",
  paragrafoFooter: "white",
  red: "#f46c3f",
  whiteBody: "black",
  black: "white",
  orange: "#a7556f",
};

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map((key) => {
    html.style.setProperty(transformKey(key), colors[key]);
  });
};

const saveTheme = (theme) => {
  localStorage.setItem("dev.finance:theme", JSON.stringify(theme));
};

const loadTheme = (theme) => {
  switch (theme) {
    case "dark":
      checkbox.checked = true;
      changeColors(darkMode);
      break;
    case "ligth":
      checkbox.checked = false;
      changeColors(initialColors);
      break;
    default:
      break;
  }
};

checkbox.addEventListener("change", ({ target }) => {
  let theme = "";
  if (target.checked) {
    changeColors(darkMode);
    theme = "dark";
  } else {
    changeColors(initialColors);
    theme = "light";
  }

  saveTheme(theme);
});
