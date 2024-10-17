const main = document.querySelector("#main");

let topOfNav = main.offsetTop;

function fixNavBar(e) {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = main.offsetHeight + "px";
    main.classList.add("fixed");
  } else {
    document.body.style.paddingTop = "0px";
    main.classList.remove("fixed");
  }
}

window.addEventListener("scroll", fixNavBar);
