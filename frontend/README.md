# TishooPub

React Native 기반 모바일 애플리케이션

## 시작하기

### 필수 요구사항
- Node.js (v16 이상)
- npm 또는 yarn
- Expo CLI

### 설치

```bash
npm install
```

### 실행

```bash
npm start
```

iOS 시뮬레이터에서 실행:
```bash
npm run ios
```

Android 에뮬레이터에서 실행:
```bash
npm run android
```

## 프로젝트 구조

```
TishooPub/
├── src/
│   ├── screens/          # 화면 컴포넌트
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── styles/          # 스타일 및 테마
│   └── navigation/      # 네비게이션 설정
├── assets/              # 이미지 및 리소스
└── App.js               # 메인 앱 컴포넌트
```

## 화면 추가

새로운 화면을 추가할 때는:
1. `src/screens/`에 새 화면 컴포넌트 생성
2. `App.js`의 Stack Navigator에 화면 추가

