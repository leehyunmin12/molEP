// api 그 설명서에 나온 기본 설정
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        // 화면 크기 조정
        height: '180',
        width: '300',
        // 어느 영상인지 구분하는 Id
        videoId: 'YD8yJdVIiM0',
        playerVars: {
            'playsinLine': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// 자동 재생 코드
function onPlayerReady() {
    duration_setting();
    current_setting();
}
// 알아가는 중

// 이게 0.1초 마다 실행되는 함수인데 current_setting을 실행함.
let timer = null;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        clearInterval(timer);
        timer = setInterval(current_setting, 100);
    }
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
    player.seekTo(seekBar.value, state);
});