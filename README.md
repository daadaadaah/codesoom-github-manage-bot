# 🤖 codesoom-github-manage-bot
## 🍎 소개
- 코드숨 수강생 과제 PR을 일괄 Merge시키는 디스코드 봇
- #JS #Gihtub API #discord.js
- 기간 : 2022년 8월 8일 - 2022년 8월 12일


## ✨ 만든 계기
- 코드숨 리뷰어 활동할 때, 매주 올라오는 수강생 과제 PR을 하나하나 Merge하는 번거로움을 해결하기 위해 만들었습니다.


## 기능
- 디스코드에서 슬래쉬(/) 명령어에서 정리하고 싶은 레포를 선택하여 Merge 시킬 수 있음.
<img width="1001" alt="스크린샷 2024-06-15 오후 10 20 42" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/e663c04d-0888-4aa8-a8d4-1ab333b1d0f6">

### 성공했을 때
- 몇개의 PR이 있었는지 
<img width="653" alt="스크린샷 2023-07-22 오후 11 32 00" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/8d17d988-551e-4b24-929a-ca4b93935f39">

### 실패했을 때
- 실패할 경우, 리뷰어들이 바로 체크할 수 있도록 링크도 남겨주기
<img width="653" alt="스크린샷 2023-07-22 오후 11 32 25" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/9008c409-688a-47a4-9653-bc7f047be6f7">

## ???
- `Promise.allSettled`를 사용해서 PR Merge 되도록 함.


## 메모
```bash
npm init -y

npm install discord.js

touch index.js

```

```js
{
  "clientId": /* discord developer Application ID */, 
  "guildId": /* 서버 ID */, 
  "token": /* discord developer bot token */, 
  "gihtubToken": /* 2023.03.01 까지 */, 
}
```

deploy-commands.js 로 새로운 명령어를 추가하고 난 후 node deploy-commands.js 로 명령어를 등록해줘야 한다.

## TODO
- [x] merePRs 코드 정리
- [x] 봇 24시간 돌리기 : 헤로쿠 이용
참고 : https://dashboard.heroku.com/apps/codesoom-github-merge-bot
- [x] push 하면, 자동으로 헤로쿠에서 deploy 하도록 설정
- [x] 의견 묻기
- [x] 리뷰어 채널에서만 명령어 사용하도록 윤석님께 권한 요청하기

- [ ] TS 로 바꾸기
참고 : https://sabe.io/tutorials/how-to-build-discord-bot-typescript#resources

- [ ] 명령어 사용을 특정 채널 또는 특정 사람한테만 할 수 있게 하기


## Reference
- https://discordjs.guide/
- https://discord.com/developers/docs/intro
