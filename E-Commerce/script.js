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
  let word = searchBar.value;

  let template = document.querySelector(".search-output");

  if (word === "") {
    // Hide the template when search bar is empty
    template.classList.add("hidden-content");
    template.innerHTML = "";
    return;
  }

  //toggle this if searchBar is no longer active
  template.classList.remove("hidden-content");
  let output = findMatch(word);
  output = output
    .map((x) => {
      return `<a class="search-bar-template">
      <img  class="search-bar-template-img" src="" alt="">
      <p class="city"> ${x.name}</p>
    </a>`;
    })
    .join(" ");
  if (output.trim() == "") template.innerHTML = "No suggestion found...";
  else template.innerHTML = output;
}
searchBar.addEventListener("keyup", feedMatch);
