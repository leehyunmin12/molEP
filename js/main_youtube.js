import { renderWaitItem } from "./main_wait.js";

// 전역으로 노출
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.onStateChange = onStateChange;

// api 그 설명서에 나온 기본 설정
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    // 페이지 로딩 시점이 아니라 API가 준비된 뒤에 읽어야, main_wait.js가 저장한 새 첫 곡을 가져옴
    const songs = JSON.parse(localStorage.getItem('present'));
    player = new YT.Player('player', {
        // 화면 크기 조정
        height: '180',
        width: '300',
        // 어느 영상인지 구분하는 Id
        videoId: songs ? songs.videoId : undefined,
        playerVars: {
            'playsinLine': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError 
        }
    });
}
// 자동 재생 코드
function onPlayerReady(event) {
    // event.target.playVideo();
    duration_setting();
    current_setting();
}
// 알아가는 중

// 이게 0.1초 마다 실행되는 함수인데 current_setting을 실행함.
let timer = null;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // 곡이 바뀌면 총 길이도 다시 표시
        duration_setting();
        clearInterval(timer);
        timer = setInterval(current_setting, 100);
    }
    else if(event.data == YT.PlayerState.ENDED) {
        renderWaitItem();
        playPresent();
    }
}

// 재생할 수 없는 영상(퍼가기 금지, 삭제, 지역/연령 제한 등)이면 다음 곡으로 넘김
function onPlayerError(event) {
    console.warn('재생 불가 영상, 다음 곡으로 넘어갑니다. 오류 코드:', event.data);
    renderWaitItem();
    playPresent();
}

// present에 저장된 곡으로 영상, 제목, 가수 바꾸기
function playPresent() {
    let present = JSON.parse(localStorage.getItem('present'));
    // videoId가 없는 항목은 재생할 수 없으므로 다음 곡으로 건너뜀
    while (present && !present.videoId) {
        console.warn('videoId 없는 곡을 건너뜁니다:', present);
        renderWaitItem();
        present = JSON.parse(localStorage.getItem('present'));
    }
    // 대기열이 다 끝났으면 멈춤
    if (!present) {
        return;
    }
    player.loadVideoById(present.videoId);
    document.getElementById('song').textContent = present.title;
    document.getElementById('singer').textContent = present.singer;

    // loadVideoById는 자동 재생이라 아이콘도 재생 중으로 맞춤
    state = true;
    document.querySelector('#play-icon').innerText = '⏸';
}


// 영상 멈추고 아이콘 바뀌게 하는 코드
let state = true;
function onStateChange() {
    // 해당 play-icon주소 저장
    const icon = document.querySelector('#play-icon');
    // 멈춰있을때 실행
    if (state) {
        pauseVideo();
        state = false;
        icon.innerText = '▶';
    }
    // 실행될때 실행
    else {
        playVideo();
        state = true;
        icon.innerText = '⏸';
    }

}

// 동영상 일시정지 함수
function pauseVideo() {
    player.pauseVideo();
}

// 동영상 play 함수
function playVideo() {
    player.playVideo();
}

// 영상 길이에 관련한 함수
function duration_setting() {
    const duration = document.querySelector('#duration');
    const total_sec = player.getDuration();
    duration.innerText = String(parseInt(total_sec / 60)).padStart(2, "0") + ':' + String(parseInt(total_sec % 60)).padStart(2, "0");
}
// 현재 영상 위치 글자로 뛰우기 함수
function current_setting() {
    const current = document.querySelector('#current');
    const seekBar = document.querySelector('#seekBar');

    const current_sec = player.getCurrentTime();
    current.innerText = String(parseInt(current_sec / 60)).padStart(2, "0") + ':' + String(parseInt(current_sec % 60)).padStart(2, "0");

    if (player.getDuration() > 0) {
        seekBar.max = player.getDuration();
        seekBar.value = player.getCurrentTime();
    }
}

// 스크롤에서 해당 위치로 연결해주는 거
const seekBar = document.querySelector('#seekBar');
seekBar.addEventListener('input', function () {
    if (player) {
        player.seekTo(seekBar.value, state);
    }
});
