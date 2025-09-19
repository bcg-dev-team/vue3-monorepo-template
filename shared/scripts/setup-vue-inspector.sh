#!/bin/bash

# Vue Inspector 설정 스크립트
# 이 스크립트는 Vue Inspector가 Cursor IDE와 연동되도록 환경을 설정합니다.

set -e

echo "🔧 Vue Inspector 설정을 시작합니다..."

# 1. 홈 디렉토리에 bin 폴더 생성
echo "📁 ~/bin 디렉토리 생성 중..."
mkdir -p ~/bin

# 2. Cursor CLI 심볼릭 링크 생성
echo "🔗 Cursor CLI 심볼릭 링크 생성 중..."
if [ -f "/Applications/Cursor.app/Contents/Resources/app/bin/cursor" ]; then
    ln -sf "/Applications/Cursor.app/Contents/Resources/app/bin/cursor" ~/bin/cursor
    echo "✅ cursor 명령어가 ~/bin/cursor에 설정되었습니다."
else
    echo "❌ Cursor 앱을 찾을 수 없습니다. Cursor가 설치되어 있는지 확인해주세요."
    exit 1
fi

# 3. code 명령어도 cursor로 연결 (Vue Inspector가 기본적으로 code를 찾기 때문)
echo "🔗 code 명령어를 cursor로 연결 중..."
ln -sf ~/bin/cursor ~/bin/code
echo "✅ code 명령어가 cursor로 연결되었습니다."

# 4. PATH 환경 변수 확인 및 설정 안내
echo "🛠️  환경 변수 설정 확인 중..."
if [[ ":$PATH:" == *":$HOME/bin:"* ]]; then
    echo "✅ ~/bin이 이미 PATH에 포함되어 있습니다."
else
    echo "⚠️  ~/bin이 PATH에 포함되지 않았습니다."
    echo "다음 명령어를 실행하여 PATH에 추가하세요:"
    echo ""
    echo "    echo 'export PATH=\"\$HOME/bin:\$PATH\"' >> ~/.zshrc"
    echo "    source ~/.zshrc"
    echo ""
fi

# 5. 테스트
echo "🧪 설정 테스트 중..."
if command -v cursor &> /dev/null; then
    echo "✅ cursor 명령어가 정상적으로 작동합니다."
else
    echo "❌ cursor 명령어를 찾을 수 없습니다. PATH 설정을 확인해주세요."
fi

if command -v code &> /dev/null; then
    echo "✅ code 명령어가 cursor로 연결되어 있습니다."
else
    echo "❌ code 명령어를 찾을 수 없습니다. PATH 설정을 확인해주세요."
fi

echo ""
echo "🎉 Vue Inspector 설정이 완료되었습니다!"
echo ""
echo "📖 사용법:"
echo "   1. 개발 서버 실행: pnpm run dev"
echo "   2. 브라우저에서 Option/Alt 키를 누른 상태로 Vue 컴포넌트 클릭"
echo "   3. Cursor에서 해당 파일이 자동으로 열립니다"
echo ""
