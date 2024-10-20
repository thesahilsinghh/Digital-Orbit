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
      return `<a href="" class="template">
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

//-------------------------------------------------------------------------

const searchBar = document.querySelector("#search-input");
function findMatch(word) {
  let expression = new RegExp(word, "gi");
  return saleArrayData.filter(
    (x) => x.name.match(expression) || x.description.match(expression)
  );
}
function feedMatch() {
  let word = inputBar.value;
  let template = document.querySelector(".search-output");
  let output = findMatch(word);
  output = output
    .map((x) => {
      let exp = new RegExp(word, "gi");
      let cityName = x.city.replace(exp, `<span class="h1">${word}</span>`);
      let stateName = x.state.replace(exp, `<span class="h1">${word}</span>`);

      return `<div class="template">
    <p class="city"> ${cityName}, ${stateName}</p>
    <p class="popualtion"> ${x.population}</p>
    </div>`;
    })
    .join(" ");

  template.innerHTML = output;
}
searchBar.addEventListener("keyup", feedMatch);
