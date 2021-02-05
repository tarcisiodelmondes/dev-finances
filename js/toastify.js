const toggle = (type = false, msg) => {
  msgOfAlert(msg);

  const containerToastify = document.querySelector(".toastify");

  switch (type) {
    case "error":
      document.querySelector(".toastify").classList.add("active-toastify");
      containerToastify.style.backgroundColor = "orange";
      break;

    case "sucess":
      document.querySelector(".toastify").classList.add("active-toastify");
      containerToastify.style.backgroundColor = "green";
      break;

    case "edited":
      document.querySelector(".toastify").classList.add("active-toastify");
      containerToastify.style.backgroundColor = "#2E8B57";
      break;

    case false:
      containerToastify.style = "none";
      containerToastify.classList.remove("active-toastify");
      break;

    default:
      break;
  }
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

const activeToastifyEdited = () => {
  toggle("edited", "Editado com sucesso");

  setTimeout(() => {
    toggle();
  }, 3000);
};
