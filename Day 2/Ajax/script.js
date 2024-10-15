let dataArray = [];
const inputBar = document.querySelector("#filter-bar");
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => {
    dataArray = [...data];
    console.log(dataArray);
  });

function findMatch(word) {
  let expression = new RegExp(word, "gi");
  return dataArray.filter(
    (x) => x.city.match(expression) || x.state.match(expression)
  );
}
function feedMatch() {
  let word = inputBar.value;
  let template = document.querySelector(".templates");
  let output = findMatch(word);
  output = output
    .map((x) => {
        let exp=new RegExp(word,'gi');
        let cityName=x.city.replace(exp,`<span class="h1">${word}</span>`);
        let stateName=x.state.replace(exp,`<span class="h1">${word}</span>`);
        
      return `<div class="template">
    <p class="city"> ${cityName}, ${stateName}</p>
    <p class="popualtion"> ${x.population}</p>
    </div>`;
    })
    .join(" ");

  template.innerHTML = output;
}
inputBar.addEventListener("keyup", feedMatch);
