@echo off
chcp 65001 >nul
set /p foldername=새 폴더 이름을 입력하세요:

:: 경로 변수 설정
set "basepath=Z:\4. 안전보건관리팀\02정상익과장업무폴더\BESMA"
set "templatefile=%basepath%\템플릿\기능설계_템플릿.txt"
set "targetfolder=%basepath%\%foldername%"

:: 폴더 생성
mkdir "%targetfolder%"

:: 템플릿 문서 복사
if exist "%templatefile%" (
    copy "%templatefile%" "%targetfolder%\README.txt"
    echo 폴더와 템플릿 문서가 생성되었습니다.
) else (
    echo 템플릿 문서를 찾을 수 없습니다. 경로를 확인해주세요.
)

pause
