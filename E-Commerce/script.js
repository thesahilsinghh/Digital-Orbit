const saleContent = document.querySelector("#sale-content");
const trendContent = document.querySelector("#trend-content");
const bestContent = document.querySelector("#best-content");
let saleArrayData = [];
let trendArrayData = [];
let bestArrayData = [];

fetch("./src/file.json")
  .then((blob) => blob.json())
  .then((data) => {
    saleArrayData = data.products;
    trendArrayData = data.products;
    bestArrayData = data.products;

    populatedContent(saleContent, saleArrayData);
    populatedContent(trendContent, trendArrayData);
    populatedContent(bestContent, bestArrayData);
  });
// .catch((err) => console.log("data load failed!"));
function populatedContent(element, data) {
  element.innerHTML = data
    .slice(0, 15)
    .map((item) => {
      return`<a href="" class="template">
      <img class="template-image" src="./src/new-outlet/a47b5c52af2e6bfc38c9465bea6b6d1e.jfif" alt="image">
      
      <div class="template-description">
        <div class="template-details">
          <p class="template-description-head">Revolve</p>
          <p class="template-name">${item.name}</p>
          <p class="template-price">Rs. ${item.price}</p>
          <p class="template-rating">${item.rating}<i class="fa-regular fa-star"></i> </p>
        </div>
        <div class="favourite-div">
        <i id=${item.id} class="fa-solid fa-bag-shopping "></i></button>
      </div>
      </div>
    </a>
    `;
    })
    .join("");
}
