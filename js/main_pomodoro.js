let currentBtnState = true;

function buttonState() {
    const state = document.querySelector('#stop-button');
    if (currentBtnState) {
        state.innerText = '실행';
        currentBtnState = false;
    }
    else {
        state.innerText = '일시정지';
        currentBtnState = true;
    }
}