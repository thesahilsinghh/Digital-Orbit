const productDetailsTemplate = document.querySelector(".product-details");
const productId = getQueryParam("id");
const fileLocation = "./src/file.json";

if (productId) {
  fetch(fileLocation)
    .then((blob) => blob.json())
    .then((dataObj) => dataObj.products)
    .then((data) => {
      let productDetails = data.find((product) => product.id == productId);
      if (productDetails) {
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

            <div>
                <p>Sizes</p>
                <div>
                ${sizeOptions}
                </div>
            </div>

            <button class="add-to-cart-button">Add to Bag</button>
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
        const detailedViewButtons = document.querySelectorAll('.drop-down-button');
        detailedViewButtons.forEach(button => {
          button.addEventListener('click', function () {
            const content = this.parentElement.nextElementSibling;
            content.classList.toggle('hidden-content'); 
            this.classList.toggle('active');
            
          });
        });
        
      } else {
        console.log("ss");
        productDetailsTemplate.innerHTML = `<img  class="error-image" src="./src/images/empty cart/404-error-not-found-page-lost.png">`;
      }
    });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
