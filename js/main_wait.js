const musics = window.localStorage.getItem('songs');
const result = window.localStorage.getItem('result');

const music = JSON.parse(musics);
const info = JSON.parse(result);

const title = [];
const singer = [];
const song = [];
const videoId = [];

const length = music.length-1;

const playlist = [];

for(let x of info) {
    playlist["title"].push(x[0]);
    singer.push(x[1]);
    song.push("2:34");
}
for(let x of music) {
    videoId.push(x.videoId);
}

console.log(videoId);   


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

// 몇번 출력할지 for문으로 반복!
for (let i = 1; i <= length; i++) {
    waitMusic(i, title[i], singer[i], song[i]);
}