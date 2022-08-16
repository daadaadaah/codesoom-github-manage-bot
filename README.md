# codesoom-github-manage-bot

## 만든 계기
- 주차별 수강생 PR을 하나하나 Merge 시키는 게 번거롭다고 생각해서 만듬.

## 기능
- 슬래쉬(/) 명령어에서 정리하고 싶은 레포를 선택하여 Merge 시킬 수 있음.



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
- [ ] 의견 묻기
- [ ] 리뷰어 채널에서만 명령어 사용하도록 윤석님께 권한 요청하기

- [ ] TS 로 바꾸기
참고 : https://sabe.io/tutorials/how-to-build-discord-bot-typescript#resources

- [ ] 명령어 사용을 특정 채널 또는 특정 사람한테만 할 수 있게 하기


## Reference
- https://discordjs.guide/
- https://discord.com/developers/docs/intro
