let api = "https://654c933577200d6ba8590622.mockapi.io/clone/clone";

let search = [];

let searchInput = document.querySelector(".search");

searchInput.addEventListener("change", displaySearch);
searchInput.addEventListener("keyup", displaySearch);

fetch(api)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      search.push(element);
    });
  });

function getSearch(word, search) {
  return search.filter((s) => {
    // проверка на совпадения данных с данными массива
    let regex = new RegExp(word, "gi");

    return s.title.match(regex);
  });
}

function displaySearch() {
  let options = getSearch(this.value, search);

  let productCards = document.querySelector(".wrapper-product-cards");

  let key;
  productCards.innerHTML = "";
  for (key in options) {
    productCards.innerHTML += `
    <div class="cards" data-path="Card" id="${options[key].id}">
    <div class="img-cards">
      <img class="img-cards-product  btn" src="${options[key].img}" alt="#" />
    </div>
    <div class="card-info">
        <p class="description-cards">${options[key].title}</p>
        <p class="price-cards">${options[key].price} Руб.</p>
        
    </div>
    <div data-cart class="card-shop-btn">Добавить в корзину</div>
  </div>
    `;
  }
}
