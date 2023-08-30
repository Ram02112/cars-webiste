function customerCall() {
  alert("Our customer care team will contact you shortly..");
}
function shopCart() {
  location.href = "shoppingcart.html";
}
function openPopUp() {
  let popup = document.getElementById("popup");
  popup.classList.add("open-popup");
}
function closePopUp() {
  let popup = document.getElementById("popup");
  popup.classList.remove("open-popup");
}
const searchPop = () => {
  let searchPop = document.getElementById("search-result");
  searchPop.classList.add("search-result-2");
};
const closeSearchPop = () => {
  let searchPop = document.getElementById("search-result");
  searchPop.classList.remove("search-result-2");
};
function loginClick() {
  var email = document.forms["form-input"]["email"].value;
  var password = document.forms["form-input"]["password"].value;
  if (email == null || email == "" || password == null || password == "") {
    alert("Email and password cannot be empty.");
  }
}

const shop = document.getElementById("parentShop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
  return (shop.innerHTML = armShopItemData
    .map((x) => {
      let { id, img, name, desc, price } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `<div id=product-id-${id} class="arm-rest">
          <img
            src=${img}
            width="245"
            height="211"
            alt="armrest1"
          />
          <div class="details">
            <h3>${name}</h3>
            <p>
              ${desc}
            </p>
            <div class="price-quantity">
              <h2>&#8377; ${price}</h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div  id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
              </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join(""));
};
generateShop();

const increment = (id) => {
  let selectedItem = armShopItemData.find((x) => x.id === id);
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};
const decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

const calculation = () => {
  let cartIcon = document.getElementById("shop-items");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
