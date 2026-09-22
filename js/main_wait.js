function waitMusic(num, song, singer, time) {

    const waitCard = document.getElementById('wait-card');

    const wNum = document.createElement('div');
    wNum.textContent = num;
    wNum.className = 'wait-num';

    const wPic = document.createElement('div');
    wPic.className = 'wait-pic';

    const wsong = document.createElement('div');
    wsong.className = 'wait-song';
    wsong.textContent = song;

    const wsinger = document.createElement('div');
    wsinger.className = 'wait-singer';
    wsinger.textContent = singer;

    const wInfo = document.createElement('div');
    wInfo.className = 'wait-info';
    wInfo.appendChild(wsong);
    wInfo.appendChild(wsinger);

    const wTime = document.createElement('div');
    wTime.className = 'wait-time';
    wTime.textContent = time;
    
    const wContainer = document.createElement('div');
    wContainer.className = 'wait-container';
    wContainer.appendChild(wNum);
    wContainer.appendChild(wPic);
    wContainer.appendChild(wInfo);
    wContainer.appendChild(wTime);

    waitCard.appendChild(wContainer);
}
waitMusic('2', '흐린 날의 산책', 'Sundae Ovaries', '3:41');
waitMusic('3', '흐린 날의 산책', 'Sundae Ovaries', '3:41');