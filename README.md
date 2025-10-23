# PlayerAnalyze

## Description

- ATP Tour 선수들의 경기 데이터를 분석하고 시각화하는 웹 애플리케이션을 개발한다.

## API Strategy

### 이미지 로딩 최적화 전략

#### 클라이언트 사이드 On-Demand Fetching 방식 채택

**기술적 근거:**

- **Lazy Loading**: 사용자가 실제로 보는 선수 카드에만 이미지를 로드하여 초기 페이지 로딩 속도 개선
- **Memory Efficiency**: 수천 명의 선수 이미지를 미리 로드하지 않아 메모리 사용량 최소화
- **Network Optimization**: 필요한 이미지만 요청하여 대역폭 사용량 절약
- **Error Resilience**: 개별 이미지 로딩 실패가 전체 애플리케이션에 영향을 주지 않음

**구현 방식:**

- 로컬 JSON 데이터에서 `wikidata_id` 추출
- **TanStack Query (React Query)** 또는 **SWR**을 활용한 이미지 URL 캐싱
  - `staleTime`: 이미지 URL은 자주 변경되지 않으므로 긴 캐시 시간 설정
  - `cacheTime`: 메모리에서 캐시된 데이터 유지 시간 최적화
  - `retry`: Wikidata API 실패 시 재시도 로직
- React 컴포넌트에서 커스텀 훅으로 이미지 로딩 상태 관리
- Intersection Observer API로 viewport 진입 시에만 이미지 요청 (진정한 Lazy Loading)
- 로딩 스켈레톤 UI 및 에러 fallback 이미지 제공

**데이터 페칭 라이브러리 선택 고려사항:**

- **TanStack Query**: 더 풍부한 기능, 복잡한 캐싱 전략, DevTools 지원
- **SWR**: 가벼운 번들 사이즈, 단순한 API, Vercel 생태계 최적화

**서버 사이드 Pre-fetching 방식을 배제한 이유:**

- 빌드 타임 증가 (수천 개 이미지 API 호출)
- 불필요한 이미지까지 모두 로드하여 리소스 낭비
- Wikidata API 레이트 리밋 위험
- 이미지 URL 변경 시 전체 빌드 재배포 필요

## PAGE

- HOME

  - 특정 단일 선수 대시보드 Overview
  - 현재 랭킹 순위 top 5
  - 년도 별 그랜드 슬램 결승 & 준결승 & 8강 순위
  - 특정 단일 경기 비교 대시보드 Overview

- DASHBOARD

- matches
