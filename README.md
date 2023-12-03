# Loado V2

## 1. 소개

**Loado V2**는 예전 [Loado](https://github.com/biglol10/loado-react) 숙제관리+시세조회 서비스의 연장선으로 새롭게 개발된 사이트입니다.  
이 서비스에선 월별 아이템의 시세를 조회할 수 있으며 재련 시뮬레이션을 통해 각 재련 횟수 구간에 따라 어느정도의 골드가 소요되는지 볼 수 있습니다.

<h1 align="center">로스트아크 아이템 시세조회 및 재련시뮬레이션 제공 서비스</h1>
<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?lines=Loado V2;로스트아크 시세조회;로스트아크 시뮬레이션&center=true&width=500&height=50">
</p>

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
