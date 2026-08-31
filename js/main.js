const clock_hour = document.getElementById("clock-container");
const clock_number = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

for (let i = 0; i < 6; i++) {
    const line = document.createElement('div');
    line.classList.add("hour-line");
    line.style.transform = `rotate(${30 * i}deg)`;
    clock_hour.appendChild(line);
}

for (let i = 0; i < 12; i++) {
    const number_div = document.createElement('div');
    number_div.classList.add('clock-num');
    number_div.style.transform = `rotate(${30 * i}deg)`;

    const span1 = document.createElement('span');
    span1.classList.add('font1');
    span1.innerText = clock_number[i];
    span1.style.transform = `translateX(-50%) rotate(${-30 * i}deg)`;

    number_div.appendChild(span1);
    clock_hour.appendChild(number_div);
}