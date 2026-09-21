let time = 2999;
let Timer;

document.getElementById("start-button").addEventListener("click", function () {
  if (document.getElementById("start-button").textContent === "시작") {
    document.getElementById("start-button").innerText = "일시정지";
    if (time > 0) {
      Timer = setInterval(() => {
        document.querySelector(".clock-remain").innerText =
          `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`;
        document.querySelector(".study-time").innerText =
          `공부시간 · ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")} 남음`;
        time--;
      }, 1000);
    }
  } else {
    document.getElementById("start-button").innerText = "시작";
    clearInterval(Timer);
  }
});

document.getElementById("reset-button").addEventListener("click", () => {
  time = 3000;
  clearInterval(Timer);
  document.querySelector(".clock-remain").innerText =
    `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`;
  document.querySelector(".study-time").innerText =
    `공부시간 · ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")} 남음`;
  time--;
});
