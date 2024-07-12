# 🤖 codesoom-github-manage-bot
## 🍎 소개
- 코드숨 수강생 과제 PR을 일괄 Merge시키는 디스코드 봇

## 👩‍💻 사용 기술
- JS, Gihtub API, discord.js

## 🗓️ 기간
- 2022년 8월 8일 - 2022년 8월 12일

## ✨ 만든 계기
- 코드숨 리뷰어 활동할 때, 매주 올라오는 수강생 과제 PR을 하나하나 Merge하는 번거로움을 해결하기 위해 만들었습니다.

## ✅ 기능
- 디스코드의 리뷰어 체널에서 슬래쉬(/) 명령어를 입력하면, 다음과 같이 코드숨 과제 Github Repository 목록이 나옵니다.
<img width="1001" alt="스크린샷 2024-06-15 오후 10 20 42" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/e663c04d-0888-4aa8-a8d4-1ab333b1d0f6">

- 이 목록에서 정리하고 싶은 레포를 선택하면, 자동으로 해당 Repoitory의 PR들이 Merge 됩니다.

- 이때, 만약, Merge에 성공하면, 다음과 같이 총 몇개의 PR이 Merge 되었는지 알려줍니다.
<img width="653" alt="스크린샷 2023-07-22 오후 11 32 00" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/8d17d988-551e-4b24-929a-ca4b93935f39">

- 만약, Merge에 실패하면, 다음과 같이 어떤 PR이 실패했는지 알려주고, 바로 확인할 수 있도록 링크도 제공합니다.
<img width="653" alt="스크린샷 2023-07-22 오후 11 32 25" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/9008c409-688a-47a4-9653-bc7f047be6f7">


## 🚀 개선 포인트
- 1개의 PR당 1~2초 걸려서 최대 10초
- 

- `Promise.allSettled`를 사용해서 PR Merge 되도록 함.


