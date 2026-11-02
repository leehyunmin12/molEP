import config from "./config.js";

const { API_KEY } = config
const { YOUTUBE_DATA_API_KEY } = config

const MODEL_NAME = 'gemini-flash-lite-latest';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;


async function generateText(promptAI) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptAI }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`에러 발생 ${response.status}`);
        }

        const data = await response.json();

        // API 응답 객체에서 텍스트 결과만 추출
        const resultText = data.candidates[0].content.parts[0].text;
        console.log(resultText);
        return resultText;

    } catch (error) {
        console.error('Gemini API 호출 중 오류 발생:', error);
        throw error;
    }
}

const getSongBtn = document.getElementById("song-btn")
const againBtn = document.querySelector(".again-recommend")

async function recommendSongs(btn) {
    const originText = btn.innerText
    btn.innerText = "로딩 중...."

    try {
        const resultText = await generateText("맑은 날씨에 맞는 노래 3곡을 추천해줘. 가수-노래제목 형식으로 가져와줘. 한 줄로 ,를 기준으로 가져와줘. 쓸데없는 말은 쓰지마");
        let arr = resultText.split(",");
        let result = arr.map(arr => arr.split("-"));
        const stk = await Promise.all(
            result.map(x => getYTDatas(`${x[0].trim()} ${x[1].trim()}`))
        );
        console.log(JSON.stringify(stk));
        window.localStorage.setItem('songs', JSON.stringify(stk));
        window.localStorage.setItem('result', JSON.stringify(result));
        location.href = 'main.html';
    } catch (e) {
        console.error('노래 추천 실패:', e);
        btn.innerText = originText
        // 실패해도 main.html로는 이동
        // location.href = 'main.html';
    }
}

if (getSongBtn) {
    getSongBtn.addEventListener("click", () => recommendSongs(getSongBtn))
}

// main.html의 다시 추천받기 버튼
if (againBtn) {
    againBtn.addEventListener("click", (e) => {
        e.preventDefault()
        recommendSongs(againBtn)
    })
}

async function getYTDatas(query) {
    const params = new URLSearchParams({
        key: YOUTUBE_DATA_API_KEY, // api키 
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: '1', // 검색해서 나오는 영상의 개수
        videoEmbeddable: true,
        videoCategoryId: '10', // 음악 카테고리
    });

    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
    if(!res.ok) {
        throw new Error(`Youtube 에러 ${res.status}`);
    }

    const data = await res.json();
    const item = data.items[0];
    if(!item) {
        return null;
    }

    return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.videoId}`
    };
}
