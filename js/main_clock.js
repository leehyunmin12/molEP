let time = 10;
let studyTotal = time;
let Timer;
let restTime = 600;
let isStudying = true;

document.getElementById("start-button").addEventListener("click", function () {
  if (document.getElementById("start-button").textContent === "시작") {
    document.getElementById("start-button").innerText = "일시정지";
    if (time > 0 || restTime > 0) {
      Timer = setInterval(() => {
        if (time >= 0) {
          document.querySelector(".clock-remain").innerText = `${Math.floor(
            time / 60,
          )
            .toString()
            .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
          window.ringProgress = (studyTotal - time) / studyTotal;
          window.ringColor = "#ff6b6b";
          time--;
        } else {
          if (restTime < 0) {
            clearInterval(Timer);
            document.getElementById("start-button").innerText = "시작";
            return;
          }
          if (restTime === 600) alert("쉬는시간입니다!");
          document.querySelector(".clock-studying").innerText =
            "쉬는 시간 · 10분 중";

          document.querySelector(".clock-remain").innerText =
            `${Math.floor(restTime / 60)}:${(restTime % 60).toString().padStart(2, "0")}`;
          window.ringProgress = (600 - restTime) / 600;
          window.ringColor = "#4dabf7";
          restTime--;
        }
      }, 1000);
    }
  } else {
    document.getElementById("start-button").innerText = "시작";
    clearInterval(Timer);
  }
});

document.getElementById("reset-button").addEventListener("click", () => {
  time = 3000;
  studyTotal = time;
  restTime = 600;
  window.ringProgress = 0;
  clearInterval(Timer);
  document.getElementById("start-button").innerText = "시작";
  document.querySelector(".clock-remain").innerText =
    `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`;
  document.querySelector(".clock-studying").innerText = '공부 시간 · 50분 중';
  time--;
});
