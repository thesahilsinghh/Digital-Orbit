const productDetailsTemplate = document.querySelector(".product-details");
const productId = getQueryParam("id");
const fileLocation = "./src/file.json";
let cart = JSON.parse(localStorage.getItem("users_cart")) || [];
if (productId) {
  fetch(fileLocation)
    .then((blob) => blob.json())
    .then((dataObj) => dataObj.products)
    .then((data) => {
      let productDetails = data.find((product) => product.id == productId);
      if (productDetails) {
        let localStorageCart =
          JSON.parse(localStorage.getItem("users_cart")) || [];

        let isInBag = localStorageCart.includes("" + productDetails.id);
        console.log(isInBag);
        let addCartButtonTextContent = isInBag ? "Item Added" : "Add To Bag";
        let sizeOptions = productDetails.sizes
          .map((element, index) => {
            return `
              <input type="radio" class="product-sizes" id="size${index}" name="size" value="${element}">
              <label for="size${index}" class="size-label">${element}</label>
            `;
          })
          .join(" ");
        productDetailsTemplate.innerHTML = `
                <div class="color-options">
          <div class="more-images">
          <img  src="./src/new-outlet/6c3f288e8b23597dfac11f0f5316da99.jfif" alt="" class=""/>
          </div>
          <div class="more-images">
          <img  src="./src/new-outlet/6c3f288e8b23597dfac11f0f5316da99.jfif" alt="" class=""/>
          </div>
          <div class="more-images">
          <img  src="./src/new-outlet/6c3f288e8b23597dfac11f0f5316da99.jfif" alt="" class=""/>
          </div>
        </div>
        <div>
          <img  src="./src/new-outlet/6c3f288e8b23597dfac11f0f5316da99.jfif" alt="" class="product-details-image"/>
        </div>
        <div>
          <div class="template-description-head">Revolve</div>
          <div class="product-details-name color-black">${productDetails.name}</div>
          <div class="template-rating">${productDetails.rating} <i class="fa-regular fa-star"></i></div>
          <div class="product-details-price-div">
            <p class="product-details-price color-black">Rs. ${productDetails.price}</p>
            <p class="inc-price">Inclusive of all taxes</p>
          </div>
          <form action="" class="adding-product-cart">
            <div>
                <p>More Colours</p>
                <div>
                <input type="radio" class="product-colors" id="color1" name="colors" value="black">
                <label for="color1" class="color-label"></label>

                <input type="radio" class="product-colors" id="color2" name="colors" value="red">
                <label for="color2" class="color-label"></label>

                <input type="radio" class="product-colors" id="color3" name="colors" value="blue">
                <label for="color3" class="color-label"></label>
                </div>
            </div>

            <div class="about-item-options-sizes">
                <p>Sizes</p>
                <div>
                ${sizeOptions}
                </div>
            </div>
            <div class="update-counter">
                                <button class="change-count"  data-skip="-1">-</button>
                                <input class="item-count" type="text" value="1" min="1" />
                                <button class="change-count" data-skip="1">+</button>
                            </div>

            <button id="${productDetails.id}" class="add-to-cart-button">${addCartButtonTextContent}</button>
            </form>

          <div class="product-details-dropdown">
            <div class="product-details-dropdown-head" id="product-detailed-dropdown"><p>View Product Details</p><button class="drop-down-button" id="drop-down-button-details"><i class="fa-solid fa-angle-down arrow-icon"></i></button></div>
            <div class="product-detailed-text hidden-content">${productDetails.description}</div>
          </div>
          <div class="product-details-dropdown">
            <div class="product-details-dropdown-head" id="product-details-best-offer"><p>Best Offers</p><button class="drop-down-button" id="drop-down-button-offers"><i class="fa-solid fa-angle-down arrow-icon"></i></button></div>
            <div class="product-detailed-text hidden-content"></div>
          </div>
          <div class="product-details-dropdown">
            <div class="product-details-dropdown-head" id="product-details-best-offer"><p>Delivery & Return</p><button class="drop-down-button" id="drop-down-button-delivery"><i class="fa-solid fa-angle-down arrow-icon"></i></button></div>
            <div class="product-detailed-text hidden-content"></div>
          </div>
          <div class="product-details-dropdown">
            <div class="product-details-dropdown-head" id="product-details-best-offer"><p>Ratings</p><button class="drop-down-button" id="drop-down-button-ratings"><i class="fa-solid fa-angle-down arrow-icon"></i></button></div>
            <div class="product-detailed-text hidden-content"></div>
          </div>
          
        </div>

        `;

        //event listners
        document
          .querySelectorAll(".change-count")
          .forEach((x) => x.addEventListener("click", changeCount));

        document
          .querySelector(".add-to-cart-button")
          .addEventListener("click", addToCart);

        document.querySelectorAll(".drop-down-button").forEach((button) => {
          button.addEventListener("click", detailedView);
        });
      } else {
        //if url doesn't consist of product id
        productDetailsTemplate.innerHTML = `<img  class="error-image" src="./src/images/empty cart/404-error-not-found-page-lost.png">`;
      }
    });
}
//functions------------------------------------------------------------------------------------------------------------------------------------------
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function changeCount(e) {
  console.log(this);
  e.stopPropagation();
  e.preventDefault();
  let itemId = this.id;
  const inputBox = document.querySelector(`.item-count`);

  if (inputBox) {
    let currentCount = parseInt(inputBox.value);
    let change = parseInt(this.getAttribute("data-skip"));
    let newCount = currentCount + change;

    if (newCount >= 1) {
      inputBox.value = newCount;
    }
  }
}
function addToCart(e) {
  let cart = JSON.parse(localStorage.getItem("users_cart")) || [];
  e.preventDefault();
  e.stopPropagation();

  const selectedSize = document.querySelector(
    'input[name="size"]:checked'
  )?.value;
  const selectedColor = document.querySelector(
    'input[name="colors"]:checked'
  )?.value;
  const selectedQuantity = document.querySelector(`.item-count`)?.value;
  if (!selectedSize || !selectedColor) {
    alert("Please select a size and color.");
    return;
  }
  const productId = e.currentTarget.id;
  let findItem = cart.find((item) => item.id == productId);
  if (findItem) {
    //remove from cart
    cart = cart.filter((x) => x.id !== productId);
    console.log("Item removed:", productId);
    e.currentTarget.textContent = "Add To Bag";
  } else {
    // Add the item to the cart
    cart.push({ id: productId, selectedSize, selectedColor, selectedQuantity });
    console.log("Item added:", productId);
    e.currentTarget.textContent = "Item Added";
  }

  // Save cart back to localStorage

  localStorage.setItem("users_cart", JSON.stringify(cart));
  console.log("Updated cart:", cart);
}

function detailedView() {
  const content = this.parentElement.nextElementSibling;
  content.classList.toggle("hidden-content");
  this.classList.toggle("active");
}
