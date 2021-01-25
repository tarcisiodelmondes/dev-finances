const newTrasitionActive = document.querySelector(".modal-overlay");

const Modal = {
  get open() {
    newTrasitionActive.classList.add("active");
  },
  get close() {
    newTrasitionActive.classList.remove("active");
  },
};
