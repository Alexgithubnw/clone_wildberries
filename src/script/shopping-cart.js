let modal = document.querySelector(".modal-shop-cart");

window.addEventListener("click", function (elem) {
  if (elem.target.hasAttribute("data-cart")) {
    const card = elem.target.closest(".cards");
    console.log(card);
    const productInfo = {
      id: card.id,
      img: card.querySelector(".img-cards-product").getAttribute("src"),
      title: card.querySelector(".description-cards").innerText,
      price: card.querySelector(".price-cards").innerText,
      counter: 1,
    };
    console.log(productInfo);
    let itemInCard = modal.querySelector(`[id="${productInfo.id}"]`);
    if (itemInCard) {
      let conterEl = itemInCard.querySelector("[data-counter]");
      conterEl.innerText = parseInt(conterEl.innerText) + 1;
      productInfo.counter = conterEl.innerText;

      checkPlusMinus(productInfo.id, conterEl.innerText);
    } else {
      renderCard(productInfo);
      setName("todos", productInfo);
    }
  }

  CardStatus();
  this.setTimeout(cardPraice, 100);
});

window.addEventListener("click", function (elem) {
  let counter;
  let product = elem.target.closest(".product");
  if (product === null) {
    return 0;
  }
  product = product.id;
  if (
    elem.target.dataset.action === "plus" ||
    elem.target.dataset.action === "minus"
  ) {
    let counterProduct = elem.target.closest(".product-counter");
    counter = counterProduct.querySelector("[data-counter]");
  }

  if (elem.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
    checkPlusMinus(product, counter.innerText);
  }

  if (elem.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
      checkPlusMinus(product, counter.innerText);
    } else if (
      elem.target.closest(".product-counter") &&
      parseInt(counter.innerText) === 1
    ) {
      // удаляем товар из корзины
      elem.target.closest(".product").remove();
      deleteCard(product);

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
// проверка есть ли что-то в локал
function getName(name) {
  let lS = localStorage.getItem(name);
  if (lS === null) {
    return false;
  }
  return lS;
}

function setName(name, data) {
  let storege = getName(name);
  if (storege) {
    storege = JSON.parse(storege);

    storege.push(JSON.stringify(data));

    localStorage.setItem(name, JSON.stringify(storege));
  } else {
    let arrayTodos = [];
    arrayTodos.push(JSON.stringify(data));
    localStorage.setItem(name, JSON.stringify(arrayTodos));
  }
}

function renderCard(data) {
  const cardProductHTML = `
      <div class="product" id="${data.id}">
                <div class="product-img">
                  <img src="${data.img}" alt="#" />
                </div>
                <div class="product-info">
                  <div class="product-text">
                    <p class="description-cards">${data.title}</p>
                    <p class="price-cards">${data.price}</p>
                  </div>
                  <div class="product-action"> 
                  <div class="product-counter">
                    <div class="product-counter_control" data-action="minus">-</div>
                    <div class="product-counter_amount" data-counter>${data.counter}</div>
                    <div class="product-counter_control" data-action="plus">+</div>
                  </div>
                </div>
                </div>
              </div>`;
  modal.insertAdjacentHTML("beforeend", cardProductHTML);
}

function deleteCard(id) {
  let todoCard = getName("todos");
  todoCard = JSON.parse(todoCard);
  let arrTodoCard = todoCard.map((e) => (e = JSON.parse(e)));
  arrTodoCard = arrTodoCard.filter((elem) => elem.id !== id);
  arrTodoCard = arrTodoCard.map((e) => (e = JSON.stringify(e)));

  localStorage.setItem("todos", JSON.stringify(arrTodoCard));
}

function checkPlusMinus(id, counter) {
  let todoCard = getName("todos");
  todoCard = JSON.parse(todoCard);
  if (todoCard === false) {
    return false;
  }
  let arrTodoCard = todoCard.map(function (e) {
    e = JSON.parse(e);
    if (e.id === id) {
      e.counter = counter;
    }

    return JSON.stringify(e);
  });
  localStorage.setItem("todos", JSON.stringify(arrTodoCard));
}

export { cardPraice, CardStatus, getName, renderCard };
