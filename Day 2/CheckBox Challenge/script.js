let checkBoxes = document.querySelectorAll(
  '.input-boxes input[type="checkbox"]'
);
let lastChecked;
function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkBoxes.forEach((x) => {
      if (x == this || x == lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        x.checked=true
      }
    });
  }
  lastChecked = this;
}

checkBoxes.forEach((x) => x.addEventListener("click", handleCheck));
