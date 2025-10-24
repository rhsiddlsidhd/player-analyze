# PlayerAnalyze

## Description

- ATP Tour 선수들의 경기 데이터를 분석하고 시각화하는 웹 애플리케이션을 개발한다.

## API Strategy

**기술적 근거:**

**구현 방식:**

- **데이터 페칭 라이브러리 선택 고려사항:**

- **TanStack Query**:
- **SWR**:

**서버 사이드 Pre-fetching 방식을 배제한 이유:**

-

## PAGE

- HOME

  - 특정 단일 선수 대시보드 Overview

    - 년도별 매치 승률 Pie Chart
      - 최근 5년 버튼
    - 가장 최근 년도 승리 시 첫 서브 성공률 && 첫 서브 득점률 && 두번째 서브 득점률
    - 가장 최근 년도 패배 시 첫 서브 성공률 && 첫 서브 득점률 && 두번째 서브 득점률

  - 현재 랭킹 순위 top 5
  - 년도 별 그랜드 슬램 결승 & 준결승 & 8강 순위
  - 특정 단일 경기 비교 대시보드 Overview

- DASHBOARD

- matches
