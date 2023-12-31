async function add() {
  let url = "https://654c933577200d6ba8590622.mockapi.io/clone/clone";
  let response = await fetch(url);
  let content = await response.json();
  content = content.splice(0, 8); // выводим 8 элеметов из массива

  let productCards = document.querySelector(".wrapper-product-cards");

  let key;
  // отрисовка карточек
  for (key in content) {
    productCards.innerHTML += `
    <div class="cards"  id="${content[key].id}">
    <div class="img-cards">
      <img class="img-cards-product" src="${content[key].img}" alt="#" />
 </div>
 <div data-path="Card" class="cards-product-review btn">Просмотр</div>
    <div class="card-info">
        <p class="description-cards">${content[key].title}</p>
        <p class="price-cards">${content[key].price} Руб.</p>
        
    </div>
    <div data-cart class="card-shop-btn">Добавить в корзину</div>
  </div>
    `;
  }
  // отрисовка коризны из localStorage
  let todoCards = getName("todos");

  todoCards = JSON.parse(todoCards);
  if (todoCards === false) {
    return false;
  }
  let arrTodo = todoCards.map(function (elem) {
    elem = JSON.parse(elem);

    renderCard(elem);
  });
}
add();

import { btns, modalOverlay, modals } from "./modal.js";
import { swiper } from "./slaider.js";
import {
  cardPraice,
  CardStatus,
  getName,
  renderCard,
} from "./shopping-cart.js";
