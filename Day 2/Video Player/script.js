//all elements
let videoScreen = document.querySelector(".video-player");

let video = document.querySelector(".video-screen");
let toggle = document.querySelector("#play-button");
let progress = document.querySelector(".progress");
let progressCompleted = document.querySelector("#progress-filled");
let skip = document.querySelectorAll(".skip-button");
let volumeButton = document.querySelector("#volume-range");
let speedButton = document.querySelector("#playBackRate");

//functions

function toggleVideo() {
  if (video.paused) {
    video.play();
    toggle.textContent = "❚❚";
  } else {
    video.pause();
    toggle.textContent = "▶";
  }
}

function changeProgress(e) {
  console.log(e);
  let newProgress = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newProgress;
}
function handleProgress() {
  let percent = (video.currentTime / video.duration) * 100;
  progressCompleted.style.flexBasis = `${percent}%`;
}
function skipVideo() {
  console.log(this);
  video.currentTime += parseFloat(this.dataset.skip);
}
function changeVolume() {
  video.volume = this.value;
}
function changeVolume() {
  video.volume = this.value;
}
function changeSpeed() {
    console.log(this.value )
  video.playBackSpeed = this.value;
}

//events
video.addEventListener("click", toggleVideo);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", toggleVideo);
volumeButton.addEventListener("change", changeVolume);
speedButton.addEventListener("change", changeSpeed);

progress.addEventListener("click", changeProgress);
skip.forEach((x) => x.addEventListener("click", skipVideo));

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    toggleVideo();
  }
});
