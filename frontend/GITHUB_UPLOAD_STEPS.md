# GitHub 업로드 단계별 가이드

## 현재 상황
- ✅ Tishoo 폴더: `/Users/jeon/Desktop/Tishoo` (백엔드, 이미 .git 존재)
- ✅ TishooPub 폴더: `/Users/jeon/Desktop/TishooPub` (프론트엔드)
- ✅ 원격 저장소: https://github.com/thatgirls00/Tishoo.git (이미 연결됨)

## 최종 목표 구조
```
Tishoo/ (GitHub 루트)
├── backend/          # Spring Boot 프로젝트
│   ├── src/
│   ├── build.gradle
│   └── ...
├── frontend/         # React Native/Expo 프로젝트
│   ├── src/
│   ├── package.json
│   └── ...
└── .gitignore
```

## 실행 방법

### 방법 1: 자동 스크립트 사용 (권장)

```bash
# 1. Tishoo 폴더로 이동
cd /Users/jeon/Desktop/Tishoo

# 2. 스크립트 실행
./reorganize_structure.sh

# 3. Git 커밋 및 푸시
git add .
git commit -m "feat: Reorganize project structure with frontend and backend folders"
git push -u origin main
```

### 방법 2: 수동 실행

#### 1단계: Tishoo 폴더로 이동
```bash
cd /Users/jeon/Desktop/Tishoo
```

#### 2단계: backend 폴더 생성 및 현재 내용 이동
```bash
# backend 폴더 생성
mkdir backend

# 현재 Tishoo의 모든 내용을 backend로 이동 (.git 제외)
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name 'backend' -exec mv {} backend/ \;
```

#### 3단계: frontend 폴더 생성 및 TishooPub 내용 복사
```bash
# frontend 폴더 생성
mkdir frontend

# TishooPub의 모든 내용을 frontend로 복사
cp -r ../TishooPub/* frontend/
cp -r ../TishooPub/.expo frontend/ 2>/dev/null || true
```

#### 4단계: .gitignore 파일 업데이트
```bash
cat > .gitignore << 'EOF'
# Backend (Spring Boot)
backend/.gradle/
backend/build/
backend/.idea/
backend/*.iml
backend/out/
backend/.DS_Store

# Frontend (React Native/Expo)
frontend/node_modules/
frontend/.expo/
frontend/.expo-shared/
frontend/dist/
frontend/.DS_Store
frontend/*.log
frontend/.env.local
frontend/.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
EOF
```

#### 5단계: Git 커밋 및 푸시
```bash
# 모든 변경사항 추가
git add .

# 커밋
git commit -m "feat: Reorganize project structure with frontend and backend folders"

# GitHub에 푸시
git push -u origin main
```

## 주의사항

1. **백업**: 작업 전에 중요한 파일을 백업하세요
2. **.git 폴더**: backend 폴더로 이동하지 않도록 주의 (스크립트에서 자동 제외)
3. **node_modules**: frontend의 node_modules는 .gitignore에 의해 자동 제외됨
4. **기존 커밋 히스토리**: 기존 커밋 히스토리는 유지됩니다

## 문제 해결

### 브랜치 이름이 다르면:
```bash
git branch -M main
git push -u origin main
```

### 충돌이 발생하면:
```bash
# 원격 저장소의 최신 내용 가져오기
git pull origin main --rebase

# 다시 푸시
git push -u origin main
```

### 강제 푸시가 필요한 경우 (주의: 기존 내용 덮어씀):
```bash
git push -u origin main --force
```

## 확인

업로드 후 GitHub에서 확인:
- https://github.com/thatgirls00/Tishoo
- `backend/` 폴더에 Spring Boot 프로젝트
- `frontend/` 폴더에 React Native/Expo 프로젝트

