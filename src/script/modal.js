const btns = document.querySelectorAll(".btn");
const modalOverlay = document.querySelector(".modal-overlay ");
const modals = document.querySelectorAll(".modal");

btns.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let path = e.currentTarget.getAttribute("data-path");
    console.log(path);
    modals.forEach((el) => {
      el.classList.remove("modal--visible");
    });
    document
      .querySelector(`[data-target="${path}"]`)
      .classList.add("modal--visible");
    modalOverlay.classList.add("modal-overlay--visible");
  });
});

modalOverlay.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target == modalOverlay) {
    modalOverlay.classList.remove("modal-overlay--visible");
    modals.forEach((el) => {
      el.classList.remove("modal--visible");
    });
  }
});
export { btns, modalOverlay, modals };
