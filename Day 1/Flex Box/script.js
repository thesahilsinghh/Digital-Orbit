let panels = document.querySelectorAll(".panel");
console.log(panels)
function toggleDiv(){
    this.classList.toggle('highDiv')
}



panels.forEach(panel=> panel.addEventListener("click", toggleDiv));
