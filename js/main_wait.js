const musics = window.localStorage.getItem('songs');
const result = window.localStorage.getItem('result');

const music = JSON.parse(musics);
const info = JSON.parse(result);

const length = music.length - 1;

const playlist = [];

for (let i = 0; i < info.length; i++) {
    let object = {};
    object["title"] = info[i][1];
    object["singer"] = info[i][0];
    object["songLength"] = "2:34";
    object["videoId"] = music[i].videoId;
    playlist.push(object);
}
console.log(playlist);
window.localStorage.setItem('PLAYLIST', JSON.stringify(playlist));
// ----------------------------- 초깃값 형성----------------------
// ----------------------------- 화면에 뿌리기 -------------------

function renderWaitMusic(num, song, singer, time) {

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
function renderWaitItem() {
    // 기존 대기열 지우기 (제목 #wait는 남김)
    document.querySelectorAll('.wait-container').forEach(el => el.remove());

    let pl = window.localStorage.getItem('PLAYLIST');
    pl = JSON.parse(pl);
    // 더 꺼낼 곡이 없으면 present를 비우고 끝냄
    if (pl.length === 0) {
        window.localStorage.removeItem('present');
        return;
    }
    let present = pl.shift();
    window.localStorage.setItem('present', JSON.stringify(present));
    window.localStorage.setItem('PLAYLIST', JSON.stringify(pl));
    let cnt = 1;
    for (let x of pl) {
        renderWaitMusic(cnt, x.title, x.singer, x.songLength);
        cnt++;
    }
}   

renderWaitItem();
 
// export default wait;