const cardTotal = document.querySelector(".card.total");

const healthyWallet = {
  green: getStyle(cardTotal, "--green"),
};

const negativeWallet = {
  green: "#e92929",
};

const isNegative = (colors) => {
  Object.keys(colors).map((key) => {
    cardTotal.style.setProperty(transformKey(key), colors[key]);
  });
};
