const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart-td");

let basket = JSON.parse(localStorage.getItem("data")) || [];
const calculation = () => {
  let cartIcon = document.getElementById("shop-items");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = armShopItemData.find((a) => a.id === id) || [];
        let { img, name, price } = search;
        return `
        <div class="cart-item">
          <img width="125" src=${img} alt="" />
          <div class="cart-details-td">
          <div class="title-price-x">
             <h4 class="title-price-td" >
             <p>${name}</p>
             <p class="cart-item-price" >&#8377 ${price}</p>
             
             </h4>
             <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          
          </div>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div  id=${id} class="quantity">
                  ${item}
                </div> 
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          <h3>&#8377 ${item * price}</h3>
          </div>
        </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="arm-rest.html">
      <button class="Home-btn">Back to Store</button>
      </a>
    `;
  }
};

generateCartItems();

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
  generateCartItems();
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

const removeItem = (id) => {
  let selectedItem = armShopItemData.find((x) => x.id === id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
let checkOut = () => {
  let checkPop = document.getElementById("checkoutpop");
  checkPop.classList.add("checkoutpop-open");
};
let okedPop = () => {
  let checkPop = document.getElementById("checkoutpop");
  checkPop.classList.remove("checkoutpop-open");
};
let popSubmit = () => {
  document.getElementById("form").reset();
  let popPara = document.getElementById("finalstate");
  popPara.innerHTML =
    "Your order has been submitted and details will be sent to email&moblie";
};
const totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = armShopItemData.find((a) => a.id === id) || [];
        return item * search.price;
      })
      .reduce((a, b) => a + b, 0);
    label.innerHTML = `
        <h2>Total Bill : &#8377 ${amount}</h2>
        <button onclick="checkOut()" class="checkout-td">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
  } else return;
};

totalAmount();
