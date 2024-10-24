const itemSection = document.querySelector(".cart-items");
const cartTotalSection = document.querySelector(".cart-items-total");

let cartItems = JSON.parse(localStorage.getItem("users_cart")) || [];
let allitemsDetail = [];

const deliveryCharge = 300;
const fileLocation = "./src/file.json";

fetch("./src/file.json")
  .then((blob) => blob.json())
  .then((data) => {
    allitemsDetail = data.products.filter((x) => {
      return cartItems.find((item) => item.id == x.id);
    });

    if (allitemsDetail.length > 0) {
      populatedBag();
    }
    updateTotal();
  });

function populatedBag() {
  itemSection.innerHTML = allitemsDetail
    .map((element) => {
      return `<div class="cart-tile">
                        <div>
                            <img
                            class="cart-tile-image"
                            src="./src/new-outlet/a47b5c52af2e6bfc38c9465bea6b6d1e.jfif"
                            alt=""
                            />
                        </div>
                        <div class="cart-tile-details">
                            <a class="template-details" href="about.html?id=${element.id}" target="_blank">
                                <p class="template-description-head">Revolve</p>
                                <p class="template-name">${element.name}</p>
                                <p class="template-price">Rs. ${element.price}</p>
                            </a>
                            <div class="cart-tile-options">
                                <div class="cart-item-color cart-item-description"></div>
                                <div class="cart-item-size cart-item-description">L</div>
                            </div>
                            <div class="update-counter">
                                <button class="change-count" id="${element.id}" data-skip="-1"><i class="fa-solid fa-trash-can"></i></button>
                                <input class="item-count" id="${element.id}" type="text" value="1" min="1" />
                                <button class="change-count" id="${element.id}"  data-skip="1">+</button>
                            </div>
                        </div>
                        </div>
`;
    })
    .join("");

  document
    .querySelectorAll(".change-count")
    .forEach((x) => x.addEventListener("click", changeCount));
}

function changeCount(e) {
  console.log(this);
  let itemId = this.id;
  let inputBox = document.querySelector(`input[id="${itemId}"]`);

  if (inputBox) {
    let currentCount = parseInt(inputBox.value);
    let change = parseInt(this.getAttribute("data-skip"));
    let newCount = currentCount + change;

    if (newCount >= 1) {
      let itemPrice = allitemsDetail.find((item) => item.id == itemId).price;
      inputBox.value = newCount;
      let priceDifference = change * itemPrice;
      totalAmount += priceDifference;
    } else {
      cartItems = cartItems.filter((item) => item != itemId);
      localStorage.setItem("users_cart", JSON.stringify(cartItems));
      allitemsDetail = allitemsDetail.filter((x) => {
        return cartItems.includes("" + x.id);
      });
      populatedBag();
    }
    updateTotal();
  }
}

function updateTotal() {
  let total = allitemsDetail.reduce((prev, curr) => {
    return (prev += curr.price);
  }, 0);
  if (total == 0 && allitemsDetail.length == 0) {
    document.querySelector(".cart-section").innerHTML = `
   <img src="./src/images/empty cart/empty-cart-10681467-8593283.webp" alt="" class="empty-cart-image">
   `;
  } else {
    console.log(total);
    document.querySelector(".cart-items-total").innerHTML =
      total > 0 ? "Rs." + total : 0;
    document.querySelector(".cart-items-total-final").innerHTML =
      total > 0 ? "Rs." + (total + deliveryCharge).toFixed(2) : 0;
  }
}
