# 몰EP

현재 위치의 날씨에 맞춰 노래를 추천해 주고, 유튜브로 재생하며 몰입(시계·뽀모도로)할 수 있는 웹 앱입니다.

## 주요 기능

- 위치 기반 현재 날씨 조회 (OpenWeather)
- 날씨 + 선택한 장르에 맞는 노래 10곡 추천 (Gemini)
- 추천곡을 유튜브 영상으로 검색·재생 (YouTube Data API)
- 시계, 뽀모도로 타이머

## 사용 기술

- HTML / CSS / JavaScript (ES Modules, 빌드 도구 없음)
- OpenWeather API, Google Gemini API, YouTube Data API v3, YouTube IFrame API

## 실행 방법

### 1. 저장소 클론

```bash
git clone <저장소 주소>
cd <프로젝트 폴더>
```

### 2. API 키 설정

`js/config.js`는 키 유출 방지를 위해 `.gitignore`에 등록되어 있어 저장소에 포함되지 않습니다.
`js/config.example.js`를 복사해서 직접 만들어 주세요.

```bash
cp js/config.example.js js/config.js
```

`js/config.js`를 열어 본인의 키를 입력합니다.

```js
const config = {
  API_KEY: "YOUR_API_KEY",                         // Google Gemini API 키
  OPEN_WEATHER_API_KEY: "YOUR_OPEN_WEATHER_API_KEY", // OpenWeather API 키
  YOUTUBE_DATA_API_KEY: "YOUR_YOUTUBE_DATA_API_KEY", // YouTube Data API v3 키
};

export default config;
```

| 키 | 발급처 |
| --- | --- |
| `API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |
| `OPEN_WEATHER_API_KEY` | [OpenWeather](https://openweathermap.org/api) |
| `YOUTUBE_DATA_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/) (YouTube Data API v3 사용 설정) |

### 3. 로컬 서버로 실행

ES Module(`type="module"`)을 사용하기 때문에 `index.html`을 더블클릭(`file://`)해서 열면 동작하지 않습니다.
반드시 로컬 서버로 실행해 주세요.

- **VS Code**: Live Server 확장 설치 후 `index.html` 우클릭 → `Open with Live Server`
- **Python**: `python -m http.server 5500` 실행 후 브라우저에서 `http://localhost:5500` 접속
- **Node.js**: `npx serve` 실행 후 안내된 주소로 접속

### 4. 사용 방법

1. `index.html`에 접속하면 위치 권한을 요청합니다. **허용**을 눌러 주세요.
2. 현재 날씨에 맞는 화면(`sunny` / `cloudy` / `rain`)으로 이동합니다.
3. 원하는 장르를 선택하고 노래 추천을 받습니다.
4. 메인 화면(`main.html`)에서 추천곡을 재생하고, **다시 추천받기**로 새 곡을 받을 수 있습니다.

> 위치 권한을 거부하면 날씨를 불러올 수 없습니다. 브라우저 주소창 옆 자물쇠 아이콘에서 권한을 다시 허용해 주세요.

## 테스트 계정

이 프로젝트는 회원가입/로그인 기능이 없어 **별도의 테스트 계정이 없습니다.** 위 실행 방법대로 API 키만 설정하면 바로 사용할 수 있습니다.

## 폴더 구조

```
.
├── index.html          # 로딩 화면 (위치 → 날씨 조회 후 날씨별 화면으로 이동)
├── sunny.html          # 맑음 화면
├── cloudy.html         # 흐림 화면
├── rain.html           # 비 화면
├── main.html           # 메인 화면 (노래 재생, 시계, 뽀모도로)
├── js/
│   ├── config.example.js   # API 키 설정 예시
│   ├── getWeather.js       # 날씨 정보 표시
│   ├── getSong.js          # Gemini 노래 추천 + 유튜브 검색
│   ├── main_clock.js       # 시계
│   ├── main_pomodoro.js    # 뽀모도로 타이머
│   ├── main_wait.js        # 대기/재생 시간 처리
│   └── main_youtube.js     # 유튜브 플레이어
├── styles/             # 화면별 CSS
└── assets/             # 이미지, 아이콘
```
