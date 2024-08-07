# 🤖 codesoom-github-manage-bot
## 🍎 소개
- 코드숨 수강생 과제 PR을 일괄 Merge시키는 디스코드 봇

## 🤔 해결하고자 했던 문제
- 매주 올라오는 수강생 과제 PR을 하나하나 클릭해서 Merge하는 번거로움이 있었습니다.

## 🎉 성과
- 최대 약 13배의 작업 효율을 향상시킴

### 기존 방식
- 브라우저 열어서 PR 목록 페이지 접속하는데 걸리는 시간 : 1초
- 1개의 PR 클릭 하여 Merge 소요 시간 : 2초
- 총 n개의 PR Merge 소요 시간 : 2n

### Discord Bot 이용 방식
- Discord의 명령어 선택 시간 : 1초
- 총 n개의 PR Merge 소요 시간 : 2초 (`Promise.allSettled`을 활용하므로, PR의 수와 관계없이 거의 고정)

### 작업 효율 계산
- 수강생 최대 모집 인원인 20명인 상황(n=20)을 가정하면, 대략 약 13배의 작업 효율을 향상시킴
```
 1+(2*20) / 1+2 = 13.67배
```

## 👩‍💻 사용 기술
- JS, Gihtub API, discord.js

## 🗓️ 기간
- 2022년 8월 8일 - 2022년 8월 12일

## ✅ 기능
- 디스코드의 리뷰어 체널에서 슬래쉬(/) 명령어를 입력하면, 다음과 같이 코드숨 교육중인 과제 Github Repository 목록이 나옵니다.
- 이 목록에서 정리하고 싶은 레포를 선택하면, 자동으로 해당 Repoitory의 PR들이 Merge 됩니다.
<img width="1001" alt="스크린샷 2024-06-15 오후 10 20 42" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/e663c04d-0888-4aa8-a8d4-1ab333b1d0f6">

## 🚀 개선 포인트
### 1. 성능을 향상시킴으로써 UX 개선
#### 🧨 [문제]
- 기존에는 `동기식`으로 PR을 일괄 Merge 시키는 방식이었습니다.
- 1개 PR 당 약 1~2초 정도 소요되어, 최대 모집 수강생이 20명인 것을 고려하면, 모든 수강생의 PR을 Merge 시키는 데 최대 예상 소요시간은 대략 40초 정도였습니다.
- 이렇게 명령어를 입력 후 결과 메시지를 받기까지 오래 걸리면, UX 관점에서 좋지 않다고 생각했습니다.

#### 🚧 [해결과정]
1. 먼저, Github API에 PR을 일괄 Merge하는 API가 있는지 검토했습니다.
- 아쉽게도, Github  API에서는 PR을 일괄 Merge하는 API는 없었습니다.
2. 다음으로, 단건 Merge API를 JavaScript의 Promise API를 활용해 비동기적으로 처리하는 방법을 생각했습니다.
- 여기서 `Promise.al`l과 `Promise.allSettled` 중 어느 것을 사용할지 고민했습니다.
    - `Promise.all` : 주어진 모든 프로미스가 이행되면 완료되며, 하나라도 실패하면 전체가 실패로 처리됩니다.
    - `Promise.allSettled` : 주어진 모든 프로미스가 완료될 때까지 기다리며, 각 프로미스의 성공 또는 실패 여부와 관계없이 결과를 배열로 반환합니다.
- 수강생의 PR이 서로 관련이 없기 때문에, 하나가 실패하더라도 다른 것들은 성공시키는 것이 좋을 것 같아 `Promise.allSettled`를 선택했습니다.

#### ✨ [결과]
- 결과적으로, PR 일괄 Merge 방식을 `비동기식`으로 변경했기 때문에, 수강생이 늘어나더라도 총 Merge 소요시간은 전체 PR이 병렬로 처리되면서 크게 줄어들게 되었습니다.
- 각 PR의 Merge 시간이 1~2초 정도 소요된다고 가정했을 때, 병렬 처리 덕분에 모든 PR을 Merge하는 데 걸리는 시간은 개별 PR의 처리 시간과 비슷한 수준으로 감소했습니다.
- 최종적으로 최대 20배의 성능을 향상시켜, PR Merge를 처리에 대한 UX를 향상시켰습니다.

### 2. 사용자에게 유용한 정보를 제공함으로써 UX 개선
#### 🧨 [문제]
- 기존에는 PR 일괄 Merge 시 단순히 "성공했다" 또는 "실패했다"라는 메시지만 전달해서, UX 측면에서 아쉬운 면이 있었습니다.
- 예를 들어, Merge 성공 시, 정말 모든 PR이 Merge가 되었는지 확인할 수 없었고, Merge 실패 시, 어떤 PR이 실패했는지 알 수 없었습니다.
- 또한, Merge 실패시에는 실패한 PR을 찾기 위해 브라우저에 직접 Github repository URL을 입력해서 확인해야 하는 불편함이 있었습니다.

#### 🚧 [해결과정]
- 이를 개선하고자, Merge 성공/실패시 각각 상황에 따라 유용한 정보를 제공해주면 좋겠다라는 생각을 하였고, 다음과 같은 정보를 사용자에게 제공하였습니다.
- Merge에 **성공**하면, 다음과 같이 **총 몇개의 PR이 Merge 되었는지** 사용자에게 알려줍니다.
  <img width="653" alt="스크린샷 2023-07-22 오후 11 32 00" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/8d17d988-551e-4b24-929a-ca4b93935f39">

- Merge에 **실패**하면, 다음과 같이 **어떤 PR이 실패했는지** 알려주고, **실패한 PR을 바로 확인할 수 있도록 링크**도 제공해줍니다.
  <img width="653" alt="스크린샷 2023-07-22 오후 11 32 25" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/9008c409-688a-47a4-9653-bc7f047be6f7">

#### ✨ [결과]
- Merge 결과를 명확하게 이해할 수 있게 되어 Merge 작업 후 확인 및 조치 시간이 단축되었습니다.
- 또한, 실패한 PR에 대한 즉각적인 피드백과 링크 제공으로 문제 해결이 빨라졌고, 이에 따라 작업 효율성이 향상되었습니다.
