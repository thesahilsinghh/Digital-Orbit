const secondHand = document.getElementById("second-hand");
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");

function setTime() {
  let now = new Date();

  let seconds = (now.getSeconds() / 60) * 360 + 90;
  let minutes =
    (now.getMinutes() / 60) * 360 + (now.getSeconds() / 60) * 6 + 90;
  let hour =
    ((now.getHours() % 12) / 12) * 360 + (now.getMinutes() / 60) * 30 + 90;

  if (now.getSeconds() === 0) {
    secondHand.style.transition =
      "transform 0.0s cubic-bezier(0.97, 2.46, 0, 2.46)";
  } else {
    secondHand.style.transition =
      "transform 0.05s cubic-bezier(0.97, 2.46, 0, 2.46)";
  }

  secondHand.style.transform = `rotate(${seconds}deg)`;
  minuteHand.style.transform = `rotate(${minutes}deg)`;
  hourHand.style.transform = `rotate(${hour}deg)`;
}
setInterval(setTime, 1000);
