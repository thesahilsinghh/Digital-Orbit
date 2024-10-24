const saleContent = document.querySelector("#sale-content");
const trendContent = document.querySelector("#trend-content");
const bestContent = document.querySelector("#best-content");
let saleArrayData = [];
let trendArrayData = [];
let bestArrayData = [];
if (saleContent || trendContent || bestContent) {
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
}
// .catch((err) => console.log("data load failed!"));
function populatedContent(element, data) {
  element.innerHTML = data
    .slice(0, 10)
    .map((item) => {
      return `<div class="template">

      <a href="about.html?id=${item.id}"  target="_blank">
      <img class="template-image" src="./src/new-outlet/a47b5c52af2e6bfc38c9465bea6b6d1e.jfif" alt="image">
      </a>
      
      <div class="template-description">
        <a class="template-details" href="about.html?id=${item.id}"  target="_blank">
          <p class="template-description-head">Revolve</p>
          <p class="template-name">${item.name}</p>
          <p class="template-price">Rs. ${item.price}</p>
          <p class="template-rating">${item.rating}<i class="fa-regular fa-star"></i> </p>
        </a>
        <div class="favourite-div">
        <button class="add-to-cart-button-bag" id=${item.id}><i  class="fa-solid fa-bag-shopping "></i></button>
        </div>
      </div>
    </div>
    `;
    })
    .join("");

  document
    .querySelectorAll(".add-to-cart-button-bag")
    .forEach((cartButton) =>
      cartButton.addEventListener("click", addToCartButtonToggle)
    );
}

function addToCartButtonToggle(e) {
  let cart = JSON.parse(localStorage.getItem("users_cart")) || [];
  let findItem=cart.find(x=>x.id==this.id);
  if (findItem) {
    cart = cart.filter((x) => x.id != this.id);
    this.innerHTML = `<i  class="fa-solid fa-bag-shopping ">`;
  } else {
    cart.push({id:this.id});
    this.innerHTML = `<i class="fa-solid fa-check"></i>`;
  }
  console.log(cart);
  localStorage.setItem("users_cart", JSON.stringify(cart));
}

//--------------------SEARCH BAR FUNCTIONALITY--------------------------------

const searchBar = document.querySelector("#search-input");
const searchBarMobile = document.querySelector("#search-input-mobile");
const searchTemplate = document.querySelectorAll(".search-bar-template");
const showSearchButton = document.querySelector(".show-search-bar-button");
const hamburgerButton = document.querySelector(".toggle-menu-button");
const menu = document.querySelector(".to-hamburger");

function findMatch(word) {
  let expression = new RegExp(word, "gi");
  return saleArrayData.filter(
    (x) => x.name.match(expression) || x.description.match(expression)
  );
}
function feedMatch() {
  let word = this.value;

  let template = document.querySelector(".search-output");
  console.log(this.id);
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
      return `<a id="${x.id}" class="search-bar-template" href="about.html?id=${x.id}">
      <img  class="search-bar-template-img" src="./src/new-outlet/6c3f288e8b23597dfac11f0f5316da99.jfif" alt="">
      <p class="city"> ${x.name}</p>
    </a>`;
    })
    .join(" ");
  if (output.trim() == "") template.innerHTML = "No suggestion found...";
  else template.innerHTML = output;
}

function toggleSearchbar() {
  searchBarMobile.classList.toggle("hidden-content");
}
function toggleMenu() {
  menu.classList.toggle("non-active");

  //make this menu hide when not active
}

document.querySelector("main").addEventListener("click", () => {
  searchBarMobile.classList.add("hidden-content");
  menu.classList.add("non-active");
});

searchBar.addEventListener("keyup", feedMatch);
searchBarMobile.addEventListener("keyup", feedMatch);
showSearchButton.addEventListener("click", toggleSearchbar);
hamburgerButton.addEventListener("click", toggleMenu);
//-------------show content-----------------
function showAbout() {
  localStorage.setItem("id", x);
  window.location.assign("about.html");
}
