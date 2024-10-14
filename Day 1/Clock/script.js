const secondHand = document.getElementById("second-hand");
const hourHand = document.getElementById("hour-hand");
const minuteHand=document.getElementById("minute-hand");
function setTime() {
  let now = new Date();
  let seconds = (now.getSeconds() / 60) * 360 + 90;
  let hour = (now.getHours() / 60) * 360 + 90;
  let minutes=(now.getMinutes()/60)*360+90;

  secondHand.style.transform = `rotate(${seconds}deg)`;
  hourHand.style.transform=`rotate(${hour}deg)`;
  minuteHand.style.transform=`rotate(${minutes}deg)`;

}

setInterval(setTime, 1000);
