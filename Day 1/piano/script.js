window.addEventListener("keydown",playSound);

let keys = document.querySelectorAll(".keys");

function playSound(e) {
  let audio = document.querySelector(`audio[key="${e.keyCode}"]`);
  let button = document.querySelector(`button[key="${e.keyCode}"]`);

  console.log(button);
  if (!audio || !button) return;
  audio.currentTime = 0;
  audio.play();
  button.classList.add("playing");
}

function removeEffect(e) {
  if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}
keys.forEach((key) => {
  key.addEventListener("transitionend",removeEffect);
});
