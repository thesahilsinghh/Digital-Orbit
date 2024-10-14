let inputs = document.querySelectorAll("#controls input");
function changeVal() {

    console.log(this.value)
  let suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(`--${this.name}`, `${this.value}`+suffix);
}

inputs.forEach((x) => x.addEventListener("change", changeVal));
inputs.forEach((x) => x.addEventListener("mousemove", changeVal));
