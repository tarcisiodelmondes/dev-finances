const toggle = (type = false, msg) => {
  msgOfAlert(msg);

  const containerToastify = document.querySelector(".toastify");

  switch (type) {
    case "error":
      containerToastify.style.display = "flex";
      containerToastify.style.backgroundColor = "orange";
      break;

    case "sucess":
      containerToastify.style.display = "flex";
      containerToastify.style.backgroundColor = "green";
      break;

    case false:
      containerToastify.style.display = "none";

    default:
      break;
  }

  document.querySelector(".toastify").classList.toggle("active-toastify");
};

const msgOfAlert = (msg) => {
  document.querySelector("#toastify-msg").textContent = msg;
};

const activeToastifyError = () => {
  toggle("error", "Por favor, preencha todos os campos");

  setTimeout(() => {
    toggle();
  }, 3000);
};

const activeToastifySucess = () => {
  toggle("sucess", "Salvo com sucesso");

  setTimeout(() => {
    toggle();
  }, 3000);
};
