import config from "./config.js";

const { API_KEY } = config

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
        return;

    } catch (error) {
        console.error('Gemini API 호출 중 오류 발생:', error);
        throw error;
    }
}

const getSongBtn = document.getElementById("song-btn")

getSongBtn.addEventListener("click", async () => {
    document.getElementById('song-btn').innerText = "로딩 중...."
    
    await generateText("맑은 날씨에 맞는 노래 3곡 추천해줘. 가수명-노래명 형식으로만 대답해줘")
    location.href = 'main.html';
});