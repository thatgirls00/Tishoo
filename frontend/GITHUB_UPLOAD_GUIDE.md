# GitHub 업로드 가이드

## 현재 상황
- **Tishoo** (백엔드): `/Users/jeon/Desktop/Tishoo` - 이미 .git 폴더 존재
- **TishooPub** (프론트엔드): `/Users/jeon/Desktop/TishooPub` - 별도 폴더

## 목표 구조
```
Tishoo/ (GitHub 루트)
├── backend/     (현재 Tishoo 내용)
│   ├── src/
│   ├── build.gradle
│   └── ...
├── frontend/    (TishooPub 내용)
│   ├── src/
│   ├── package.json
│   └── ...
└── .gitignore
```

## 실행 순서

### 1단계: Tishoo 폴더로 이동 및 현재 상태 확인
```bash
cd /Users/jeon/Desktop/Tishoo
git status
git remote -v
```

### 2단계: backend 폴더 생성 및 현재 내용 이동
```bash
# backend 폴더 생성
mkdir backend

# 현재 Tishoo의 모든 내용을 backend로 이동 (.git 제외)
# 주의: .git 폴더는 제외하고 이동해야 함
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name 'backend' -exec mv {} backend/ \;
```

### 3단계: frontend 폴더 생성 및 TishooPub 내용 복사
```bash
# frontend 폴더 생성
mkdir frontend

# TishooPub의 모든 내용을 frontend로 복사
cp -r ../TishooPub/* frontend/
cp -r ../TishooPub/.* frontend/ 2>/dev/null || true  # 숨김 파일도 복사 (에러 무시)
```

### 4단계: .gitignore 파일 생성/수정
```bash
# .gitignore 파일 생성
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

### 5단계: Git 원격 저장소 확인 및 설정
```bash
# 원격 저장소 확인
git remote -v

# 원격 저장소가 없거나 잘못된 경우
git remote remove origin  # 기존 원격 저장소 제거 (필요시)
git remote add origin https://github.com/thatgirls00/Tishoo.git

# 원격 저장소 확인
git remote -v
```

### 6단계: 변경사항 스테이징 및 커밋
```bash
# 모든 변경사항 추가
git add .

# 커밋
git commit -m "feat: Reorganize project structure with frontend and backend folders"
```

### 7단계: GitHub에 푸시
```bash
# 현재 브랜치 확인
git branch

# main 브랜치로 푸시 (또는 master)
git push -u origin main

# 만약 main 브랜치가 없다면
git branch -M main
git push -u origin main
```

## 주의사항

1. **백업**: 작업 전에 중요한 파일을 백업하세요
2. **.git 폴더**: backend 폴더로 이동하지 않도록 주의
3. **node_modules**: frontend의 node_modules는 .gitignore에 의해 자동 제외됨
4. **기존 커밋 히스토리**: 기존 커밋 히스토리를 유지하려면 위 방법 사용, 새로 시작하려면 `rm -rf .git` 후 `git init`

## 문제 해결

### 만약 충돌이 발생하면:
```bash
# 강제 푸시 (주의: 기존 내용을 덮어씀)
git push -u origin main --force
```

### 브랜치 이름이 다르면:
```bash
# 현재 브랜치 확인
git branch

# main으로 변경
git branch -M main
```

