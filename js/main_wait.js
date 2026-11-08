import config from "./config.js";

const { YOUTUBE_DATA_API_KEY } = config;
// ----------------------------- 초깃값 형성----------------------
const musics = window.localStorage.getItem('songs');
const result = window.localStorage.getItem('result');

const music = JSON.parse(musics);
const info = JSON.parse(result);

const length = music.length - 1;

const playlist = [];

for (let i = 0; i < info.length; i++) {
    // 유튜브 검색에 실패한 곡은 건너뜀
    if (!music[i]) continue;
    let object = {};
    object["title"] = info[i][1];
    object["singer"] = info[i][0];
    object["songLength"] = await songDuration(music[i].videoId);
    object["videoId"] = music[i].videoId;
    playlist.push(object);
}
console.log(playlist);
window.localStorage.setItem('PLAYLIST', JSON.stringify(playlist));
// -----------------------------영상 길이부분----------------------------------------

async function songDuration(vI) {
    const vParam = new URLSearchParams({
        key: YOUTUBE_DATA_API_KEY,
        id: vI,
        part: 'contentDetails',
    })
    const vRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?${vParam}`);
    const vData = await vRes.json();

    // 영상 정보가 없으면 "-"
    if (vData.items.length === 0) return "-";

    // 응답 예: "PT3M25S" -> "3:25"
    let t = vData.items[0].contentDetails.duration;
    t = t.replace("PT", "");   // "3M25S"
    t = t.replace("S", "");    // "3M25"

    let parts = t.split("M");  // ["3", "25"]
    let min = parts[0];
    let sec = parts[1];

    // 딱 떨어지는 분이면 초가 없음 (PT3M -> "3:00")
    if (sec === undefined || sec === "") sec = "00";
    // 초가 한 자리면 앞에 0 붙이기 (5 -> 05)
    if (sec.length === 1) sec = "0" + sec;

    return min + ":" + sec;
}
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
    // 현재 곡의 제목/가수 표시도 여기서 갱신 (main.html 인라인 스크립트는 새 곡이 저장되기 전에 실행됨)
    document.getElementById('song').textContent = present.title;
    document.getElementById('singer').textContent = present.singer;
    let cnt = 1;
    for (let x of pl) {
        renderWaitMusic(cnt, x.title, x.singer, x.songLength);
        cnt++;
    }
}


renderWaitItem();
// 모듈 밖(main_youtube.js)에서 곡이 끝날 때 호출할 수 있도록 전역에 노출
window.renderWaitItem = renderWaitItem;

export { renderWaitItem };
