#!/bin/bash

# GitHub 업로드를 위한 폴더 구조 재구성 스크립트
# 실행 위치: /Users/jeon/Desktop/Tishoo

set -e  # 에러 발생 시 스크립트 중단

echo "🚀 GitHub 업로드를 위한 폴더 구조 재구성 시작..."

# 1단계: backend 폴더 생성
echo "📁 1단계: backend 폴더 생성 중..."
if [ -d "backend" ]; then
    echo "⚠️  backend 폴더가 이미 존재합니다. 기존 내용을 확인하세요."
    read -p "계속하시겠습니까? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    mkdir backend
    echo "✅ backend 폴더 생성 완료"
fi

# 2단계: 현재 Tishoo의 모든 내용을 backend로 이동 (.git 제외)
echo "📦 2단계: 현재 내용을 backend로 이동 중..."
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name 'backend' ! -name 'reorganize_structure.sh' -exec mv {} backend/ \;
echo "✅ backend로 이동 완료"

# 3단계: frontend 폴더 생성
echo "📁 3단계: frontend 폴더 생성 중..."
if [ -d "frontend" ]; then
    echo "⚠️  frontend 폴더가 이미 존재합니다."
    read -p "덮어쓰시겠습니까? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf frontend
        mkdir frontend
    fi
else
    mkdir frontend
fi
echo "✅ frontend 폴더 생성 완료"

# 4단계: TishooPub 내용을 frontend로 복사
echo "📦 4단계: TishooPub 내용을 frontend로 복사 중..."
if [ -d "../TishooPub" ]; then
    cp -r ../TishooPub/* frontend/ 2>/dev/null || true
    # 숨김 파일도 복사 (에러 무시)
    cp -r ../TishooPub/.expo frontend/ 2>/dev/null || true
    cp -r ../TishooPub/.gitignore frontend/ 2>/dev/null || true
    echo "✅ frontend로 복사 완료"
else
    echo "❌ ../TishooPub 폴더를 찾을 수 없습니다."
    exit 1
fi

# 5단계: .gitignore 파일 업데이트
echo "📝 5단계: .gitignore 파일 업데이트 중..."
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

# 기타
*.iml
EOF
echo "✅ .gitignore 업데이트 완료"

echo ""
echo "✅ 폴더 구조 재구성 완료!"
echo ""
echo "📂 새로운 구조:"
echo "   Tishoo/"
echo "   ├── backend/    (Spring Boot 프로젝트)"
echo "   └── frontend/   (React Native/Expo 프로젝트)"
echo ""
echo "다음 단계:"
echo "1. git add ."
echo "2. git commit -m 'feat: Reorganize project structure with frontend and backend folders'"
echo "3. git push -u origin main"

