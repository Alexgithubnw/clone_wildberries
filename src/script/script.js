async function add() {
  let url = "https://654c933577200d6ba8590622.mockapi.io/clone/clone";
  let response = await fetch(url);
  let content = await response.json();
  content = content.splice(0, 8); // выводим 10 элеметов из массива

  let productCards = document.querySelector(".wrapper-product-cards");

  let key;

  for (key in content) {
    productCards.innerHTML += `
    <div class="cards btn" data-path="Card" id="${content[key].id}">
    <div class="img-cards">
      <img class="img-cards-product" src="${content[key].img}" alt="#" />
    </div>
    <div class="card-info">
        <p class="description-cards">${content[key].title}</p>
        <p class="price-cards">${content[key].price} Руб.</p>
        
    </div>
    <div data-cart class="card-shop-btn">Добавить в корзину</div>
  </div>
    `;
  }
}
add();

import { btns, modalOverlay, modals } from "./modal.js";
import { swiper } from "./slaider.js";
