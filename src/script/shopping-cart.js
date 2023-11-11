let modal = document.querySelector(".modal-shop-cart");
window.addEventListener("click", function (elem) {
  if (elem.target.hasAttribute("data-cart")) {
    const card = elem.target.closest(".cards");
    const productInfo = {
      id: card.id,
      img: card.querySelector(".img-cards-product").getAttribute("src"),
      title: card.querySelector(".description-cards").innerText,
      price: card.querySelector(".price-cards").innerText,
    };
    const cardProductHTML = `
  <div class="product" id="${productInfo.id}">
            <div class="product-img">
              <img src="${productInfo.img}" alt="#" />
            </div>
            <div class="product-info">
              <div class="product-text">
                <p class="description-cards">${productInfo.title}</p>
                <p class="price-cards">${productInfo.price} руб.</p>
              </div>
              <div class="product-action"> 
              <div class="product-counter">
                <div class="product-counter_control" data-action="minus">-</div>
                <div class="product-counter_amount" data-counter>1</div>
                <div class="product-counter_control" data-action="plus">+</div>
              </div>
            </div>
            </div>
          </div>`;
    modal.insertAdjacentHTML("beforeend", cardProductHTML);
  }
  CardStatus(); // проверка статуса корзины

  cardPraice();
});

window.addEventListener("click", function (elem) {
  let counter;
  if (
    elem.target.dataset.action === "plus" ||
    elem.target.dataset.action === "minus"
  ) {
    let counterProduct = elem.target.closest(".product-counter");
    counter = counterProduct.querySelector("[data-counter]");
  }

  if (elem.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }

  if (elem.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (
      elem.target.closest(".product-counter") &&
      parseInt(counter.innerText) === 1
    ) {
      // удаляем товар из корзины
      elem.target.closest(".product").remove();

      CardStatus();

      cardPraice();
    }
  }

  if (
    elem.target.hasAttribute("data-action") &&
    elem.target.closest(".modal-shop-cart")
  ) {
    cardPraice();
  }
});

function CardStatus() {
  let shopCartNull = document.querySelector(".shop-cart-null");
  let shopCartOrder = document.querySelector(".shop-cart-order");
  if (modal.children.length > 0) {
    shopCartNull.classList.add("none");
    shopCartOrder.classList.remove("none");
  } else {
    shopCartNull.classList.remove("none");
    shopCartOrder.classList.add("none");
  }
}

function cardPraice() {
  let cardItems = document.querySelectorAll(".product");
  let priceTotalEL = document.querySelector(".shop-cart-pay");
  let priceTotal = 0;
  cardItems.forEach(function (item) {
    let price = item.querySelector(".price-cards");
    let amount = item.querySelector(".product-counter_amount");
    let priceCerrent = parseInt(price.innerText) * parseInt(amount.innerText);
    priceTotal += priceCerrent;
  });

  priceTotalEL.innerText = priceTotal;
}
