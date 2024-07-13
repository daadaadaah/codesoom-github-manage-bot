# 🤖 codesoom-github-manage-bot
## 🍎 소개
- 코드숨 수강생 과제 PR을 일괄 Merge시키는 디스코드 봇

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
문제 : 슬래쉬(/) 명령어


1. 1개당 1~2초 * 최대 20 : 명령어 입력후 최대 20초 걸리면 UX 측면에서도 별로
2. 이를 해결 하기 위해 병렬 처리가 필요하다고 생각했고, 이를 위해 all vs allsellted
3. 닥후 : 하나라도
4.그결과, 최대 n초로 성능 향상+UX 향상




## ✨ 문제 해결 과정
### 1. 배경
- 코드숨 리뷰어 활동할 때, 매주 올라오는 수강생 과제 PR을 하나하나 Merge하는 작업이 번거롭다곡 생각함.

### 2. 해결 과정


### 3. 결과







문제 : 1개의 PR당 1~2초 정도 걸려서 최 ~ 
해결 : 



- 1개의 PR당 1~2초 걸려서 최대 10초 소요되는 작업을 `Promise.allSettled`를 사용해서 2초만에 작업 완료
- Promise.all이 아닌 Promise.allSettled을 한 이유는 UX 때문에

[배경]
-  매주 올라오는 수강생들의 PR 하나하나 클릭해서 Merge 하는 것이  번거로운 문제


[해결과정] (심플하게) 
1) 번거로움을 해결하기 위한  2가지 방법에 대해 생각해 봄.
    방법 1 : Github Action의 Schedule 이용하여 매주 특정요일에 지난 주 과제 PR을       
                   자동으로 Merge 시키는 방법
    방법 2 : Discord Bot을 만들어 Command를 통해 Merge 싶은 레포를 선택하여 일괄
               Merge 시키는 방법
2) 현재 상황을 분석한 후 위 2가지 방법의 장단점에 대해 생각해본 결과,  방법2가 지금 상황에 좀더 적절하다고 판단함.
3) Github API에 Merge 관련 API가 있는지 검토한 결과, Github  API에 Repository를 일괄적으로 Merge하는 API는 없고, 단건 Merge API만 있어서,  단건 Merge API를 JS 의 Promise API로 병렬처리하도록 결정함.
4) 병렬처리를 위해 Promise.all과 Promise.allSettled 중에 고민이었는데, 한개가 실패하더라도, 다른 것은 성공하게 하는게 UX측면에서 더  좋을 것 같아서 Promise.allSettled로 결정함.
5) 유튜브를 통해 Command로  Discord Bot 예제 영상을 찾아서 하나하나 코드를 따라 쳐보면서 이해함.
6) 명령어를 어떻게 만들어서, 어떤 메시지를 보여줄지에 대해 고민함.
7) 명령어로 Repository 이름을  사용해서, 그 명령어를 선택했을 때, 해당 Repository가 일괄 Merge 되도록 함. 
8) Merge 후 성공 PR 갯수와 실패 PR 갯수, 실패 PR 링크 등을 보여주면 UX측면에서 좋을 것 같아서, 해당 데이터를 Merge 작업 후 메시지에 담기게 함.
9) 몇개의 Repository를 테스트해본 결과, 잘 동작한 것으로 파악해서, 헤로쿠에 배포함.
10) 이렇게 만든 디스코드 봇이 잘 동작하도록 디스코드 리뷰어 채널에 권한 수정 후 디스코드  리뷰어 채널에 출시함.

[결과]
- 디스코드의 리뷰어 채널에서 명령어로 Merge 싶은 레포를 선택하여 일괄 Merge 시키는 디스코드 봇 만들어, 리뷰어 업무 생산성을 향상시킴




### 2. 사용자에게 유용한 정보를 제공함으로써 UX 개선
#### 🧨 [문제]
- 기존에는 PR 일괄 Merge 시 단순히 "성공했다" 또는 "실패했다"라는 메시지만 전달해서, UX 측면에서 아쉬운 면이 있었습니다.예를 들어, Merge 성공 시, 정말 모든 PR이 Merge가 되었는지 확인할 수 없었고, Merge 실패 시, 어떤 PR이 실패했는지 알 수 없었습니다. 또한, Merge 실패시에는 실패한 PR을 찾기 위해 브라우저에 직접 Github repository URL을 입력해서 확인해야 하는 불편함이 있었습니다.

#### 🚧 [해결과정]
- 이를 개선하고자, Merge 성공/실패시 각각 상황에 따라 유용한 정보를 제공해주면 좋겠다라는 생각을 하였고, 다음과 같은 정보를 사용자에게 제공하였습니다.
- Merge에 **성공**하면, 다음과 같이 **총 몇개의 PR이 Merge 되었는지** 사용자에게 알려줍니다.
  <img width="653" alt="스크린샷 2023-07-22 오후 11 32 00" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/8d17d988-551e-4b24-929a-ca4b93935f39">

- Merge에 **실패**하면, 다음과 같이 **어떤 PR이 실패했는지** 알려주고, **실패한 PR을 바로 확인할 수 있도록 링크도 제공해줍니다.**
  <img width="653" alt="스크린샷 2023-07-22 오후 11 32 25" src="https://github.com/daadaadaah/codesoom-github-manage-bot/assets/60481383/9008c409-688a-47a4-9653-bc7f047be6f7">

#### ✨ [결과]
- Merge 결과를 명확하게 이해할 수 있게 되어 Merge 작업 후 확인 및 조치 시간이 단축되었습니다.
- 또한, 실패한 PR에 대한 즉각적인 피드백과 링크 제공으로 문제 해결이 빨라졌고, 이에 따라 작업 효율성이 향상되었습니다.
