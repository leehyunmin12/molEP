// const clock_hour = document.getElementById("clock-container");
// const clock_number = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// for (let i = 0; i < 6; i++) {
//     const line = document.createElement('div');
//     line.classList.add("hour-line");
//     line.style.transform = `rotate(${30 * i}deg)`;
//     clock_hour.appendChild(line);
// }

// for (let i = 0; i < 12; i++) {
//     const number_div = document.createElement('div');
//     number_div.classList.add('clock-num');
//     number_div.style.transform = `rotate(${30 * i}deg)`;

//     const span1 = document.createElement('span');
//     span1.classList.add('font1');
//     span1.innerText = clock_number[i];
//     span1.style.transform = `translateX(-50%) rotate(${-30 * i}deg)`;

//     number_div.appendChild(span1);
//     clock_hour.appendChild(number_div);
// }

let min = 49,
  sec = 59;

function Timer() {
  const date = new Date();
  const timer = document.querySelector(".clock-remain");
  console.log(date);

  startTimer = setInterval(() => {
    timer.innerText = `${min.toString().padStart(2, 0)}:${sec.toString().padStart(2, 0)}`;
    if (sec === 0) {
      sec = 60;
      min--;
    }
    sec--;
  }, 1000);
}


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
