// html에서 가져오기
const clock_hour = document.getElementById("clock-container");
// 시간 지정할 배열
const clock_number = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// 한줄 요약 : 눈금 만드는 거
for (let i = 0; i < 6; i++) {
    // div 만듬
    const line = document.createElement('div');
    line.classList.add("hour-line");
    // 원 느낌의 곡선으로 배치
    line.style.transform = `rotate(${30 * i}deg)`;
    // html에 추가함.
    clock_hour.appendChild(line);
}

// 한줄 요약 : 시간 배열하는거
for (let i = 0; i < 12; i++) {
    // div 만듬.
    const number_div = document.createElement('div');
    number_div.classList.add('clock-num');
    // 원 느김의 곡선으로 배치
    number_div.style.transform = `rotate(${30 * i}deg)`;

    // span하나 만듬.
    const span1 = document.createElement('span');
    span1.classList.add('font1');
    // for문으로 돌아가면서 clock_number를 화면에 innerText함.
    span1.innerText = clock_number[i];
    // 원 느낌의 곡선으로 배치하는데 다 우리 눈에 보기 좋게 배치
    span1.style.transform = `translateX(-50%) rotate(${-30 * i}deg)`;

    // html에 추가함.
    number_div.appendChild(span1);
    clock_hour.appendChild(number_div);
}