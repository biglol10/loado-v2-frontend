# Loado V2

## 1. 소개

**Loado V2**는 예전 [Loado](https://github.com/biglol10/loado-react) 숙제관리+시세조회 서비스의 연장선으로 새롭게 개발된 사이트입니다.  
이 서비스에선 월별 아이템의 시세를 조회할 수 있으며 재련 시뮬레이션을 통해 각 재련 횟수 구간에 따라 어느정도의 골드가 소요되는지 볼 수 있습니다.

<br/>

---

<br/>

#### **✨ Loado V2의 주요 기능**

1. 전체적인 아이템 시세조회
2. 특정 아이템의 월별 시세조회
3. 재련 시뮬레이션
4. 모바일 사이즈 지원

<br/>

---

<br/>

<h3>✨ 전체적인 아이템 시세조회 - 각종 아이템에 대한 현재 시세 제공 (최소가격)</h3>

- 재련 재료
- 전설각인서 (공통/직업)
- 재련 추가 재료 (추가재료/야금술/재봉술)
- 엘릭서
- 엘릭서, 보석

![ItemPrice Page](/readmeImages/itemPricePage.png)

<br/>

---

<br/>

<h3>✨ 특정 아이템의 월별 시세조회 - 특정 아이템의 월별 시세 정보를 그래프 및 테이블 형태로 제공</h3>

- 시세정보를 그래프 형태로 제공
- 그래프에 마우스 가져다대면 그날 최소가격, 평균가격, 최대가격 확인할 수 있는 창 등장
- 시세정보를 테이블 형태로 제공 및 날짜 순서변경 기능 제공

![ItemPrice Modal](/readmeImages/itemPriceModal.png)

<br/>

---

<br/>

<h3>✨ 재련 시뮬레이션 - 시뮬레이션을 통해 재련의 평균적인 비용이랑 운이 상위 n%일 때 들어가는 비용 정보 제공</h3>

- 현재 날짜 재련 재료들의 최소가격을 기준으로 들어가는 재련 비용 계산
- 귀속 재료 개수를 입력하면 귀속재료를 제외한 금액 표시
- 시뮬레이션 결과를 그래프 형태로 제공
- 그래프 막대바를 클릭 시 들어가는 재련재료 개수와 비용을 계산하여 표시

![Simulation Page1](/readmeImages/simulationPage1.png)
<br/><br/>
![Simulation Page2](/readmeImages/simulationPage2.png)

<br/>

---

---

---

<br/>

## 📝 프로젝트 기술스택

| 프론트엔드                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 백엔드                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 배포                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Styledcomponents-CC6699?style=flat-square&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/Reactquery-FF4154?style=flat-square&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=white"> <img src="https://img.shields.io/badge/Axios-7F2B7B?style=flat-square&logo=axios&logoColor=white"/> | <img src="https://img.shields.io/badge/Node.Js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white"/> | <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/> <img src="https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=heroku&logoColor=white"/> |

<br/>

---

<br/>

## 💡 트러블슈팅 및 기타 기술적인 내용 (FE)

### 💥 Webpack 빌드 및 최적화 설정

 <br />

- 번들링 된 결과를 확인하기 위해 webpack-bundle-analyzer을 설치 및 웹팩에 적용. 페이지 및 modal에 lazyloading 적용하여 chunk 분리
- 개발 중인 애플리케이션에서 API 요청을 효과적으로 처리하기 위해 특정 경로에 대한 프록시 설정 구현 및 백엔드 연결
- 파일명에 해시값을 포함시켜 캐싱 최적화, TerserPlugin을 사용하여 코드 청크 분리 및 불필요한 주석, 콘솔로그 제거

### 💥 데이터 캐싱을 위해 React-query 도입 및 Axios Instance 설계

 <br />

- 백엔드에서 아이템 시세 데이터는 6시간마다 db에 쌓으니 데이터 자체는 쉽게 바뀌지 않음
- 컴포넌트의 렌더링 순간마다 데이터를 fetching하는걸 피하기 위해 react-query 적용
- 로스트아크 api request는 분당 100번으로 제한되어 있어 429에러 발생 시 api call을 1분 뒤에 재시도하도록 설계

### 💥 동적 import를 이용한 로딩 시간 최적화 및 유저의 활동로그 적재

 <br />

- React의 lazy와 Suspense를 사용하여 컴포넌트의 동적 임포트 구현으로 효율적인 코드 분할 및 로딩 시간 최적화
- 비동기 작업이나 컴포넌트 import 중 사용자 경험을 향상하기 위해 Loader 구현
- 유저가 페이지를 방문할 때마다, api call을 날릴 때마다 로그를 백엔드에 보내도록 구현

### 💥 고차 컴포넌트를 이용한 공통 기능 처리

 <br />

- 입력 필드에 대한 고차 컴포넌트(Higher-Order Component, HOC) 개발을 통해 애플리케이션 전반에 걸친 일관성 있는 로직 처리
- hoc패턴을 통해 매 컴포넌트에 직접 state를 선언하거나 ref를 관리하지 않고 공통적으로 관리
- Library 고유 onChange 함수 대신 프로젝트에 맞는 onChange 함수를 사용하도록 설계

### 💥 공통/컴포넌트 기능 설계

 <br/>

- BaseUrl로 페이지 진입 시 자동적으로 아이템 시세 페이지로 redirect
- custom hook을 이용한 device type 및 모달 관련 컨트롤 제어
- 페이지마다 동적으로 Layout을 받을 수 있도록 설계
- chart의 툴팁 리렌더링을 방지하기 위해 React.memo 적용

<br/>

---

<br/>

## 💡 트러블슈팅 및 기타 기술적인 내용 (BE)

 <br />

- 비동기 처리를 더 원할하게 하기 위해 asyncHandler 함수 작성
- 매 6시간마다 로스트아크 api 콜을 하여 아이템 데이터를 가져오고 실패에 대한 로그 기록
- 에러 로그를 더 자세하게 기록하기 위해 Error 클래스를 상속받는 CustomError
- 데이터를 더 빠르게 전송하기 위해 redis를 통한 데이터 캐싱
