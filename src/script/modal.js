const btns = document.querySelectorAll(".btn");
const modalOverlay = document.querySelector(".modal-overlay ");
const modals = document.querySelectorAll(".modal");
// модальное окно корзины
btns.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let path = e.currentTarget.getAttribute("data-path");
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
  if (e.target == modalOverlay) {
    modalOverlay.classList.remove("modal-overlay--visible");
    modals.forEach((el) => {
      el.classList.remove("modal--visible");
    });
  }
});
let modalCard = document.querySelector(".modal-card");

window.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-path")) {
    let card = e.target.closest(".cards");
    if (card === null) {
      return 0;
    }
    const productInfo = {
      id: card.id,
      img: card.querySelector(".img-cards-product").getAttribute("src"),
      title: card.querySelector(".description-cards").innerText,
      price: card.querySelector(".price-cards").innerText,
      counter: 1,
    };
    console.log(productInfo);
    modals.forEach((el) => {
      el.classList.remove("modal--visible");
    });
    document
      .querySelector(`[data-target="Card"]`)
      .classList.add("modal--visible");
    modalOverlay.classList.add("modal-overlay--visible");
    modalCard.innerHTML = "";
    const cardProductHTML = `
      <div class="cards" id="${productInfo.id}">
                <div class="img-cards">
                  <img class="img-cards-product" src="${productInfo.img}" alt="#" />
                </div>
                <div class="product-card-info">
                    <p class="description-cards">${productInfo.title}</p>
                    <p class="price-cards">${productInfo.price} </p>
                </div>
                <div data-cart class="card-shop-btn">Добавить в корзину</div>
              </div>`;
    console.log(productInfo.img);
    modalCard.insertAdjacentHTML("beforeend", cardProductHTML);
  }
});
export { btns, modalOverlay, modals };
