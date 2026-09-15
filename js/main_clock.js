  

const stopBtn = document.getElementById("stop-button");
stopBtn.addEventListener("click", () => {
  document.getElementById("stop-button").innerText = "시작";
  stopBtn.setAttribute("id", "start-button");
  clearInterval(startTimer);
});


const resetBtn = document.getElementById("reset-button");
resetBtn.addEventListener("click", () => {
  min = 50;
  sec = 60;
});


document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-button").innerText = "일시정지";
  document.getElementById("start-button").setAttribute("id", "stop-button");
  Timer();
});