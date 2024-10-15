const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

let isDrawing = false;
let xLast = 0;
let yLast = 0;
let hue = 0;

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  ctx.beginPath();
  ctx.moveTo(xLast, yLast);
  ctx.lineTo(e.offsetX, e.offsetY);

  [xLast, yLast] = [e.offsetX, e.offsetY];
  ctx.stroke();

  hue++;
  
}
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousedown", (e) => {
  [xLast, yLast] = [e.offsetX, e.offsetY];
  isDrawing = true;
});
canvas.addEventListener("mouseout", () => (isDrawing = false));
canvas.addEventListener("mousemove", draw);
