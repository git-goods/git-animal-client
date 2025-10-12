# Supabase Laboratory Upvote Setup Guide

## Overview

Laboratory upvote 기능은 사용자가 실험실 기능의 정식 출시를 요청할 수 있도록 합니다. 간단한 클릭 한 번으로 업보트할 수 있습니다.

## 1. 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 추가하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 환경 변수 값 찾기

1. [Supabase Dashboard](https://app.supabase.com/)에 로그인
2. 프로젝트 선택
3. Settings > API 메뉴로 이동
4. `Project URL`과 `anon public` 키를 복사

## 2. 데이터베이스 마이그레이션 실행

### 방법 1: Supabase SQL Editor 사용 (권장)

1. Supabase Dashboard > SQL Editor로 이동
2. `migrations/20250112_create_lab_feedback_table.sql` 파일 내용을 복사
3. 새 쿼리에 붙여넣고 실행 (Run 버튼 클릭)

### 방법 2: Supabase CLI 사용

```bash
# Supabase CLI 설치 (처음만)
npm install -g supabase

# 프로젝트에 로그인
supabase login

# 마이그레이션 실행
supabase db push
```

## 3. 데이터베이스 구조

### `laboratory_feedback` 테이블

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| id | UUID | Primary Key (자동 생성) |
| user_id | TEXT | GitHub 사용자 ID (필수) |
| username | TEXT | GitHub 사용자 이름 (필수) |
| description | TEXT | 추가 설명 (현재 미사용, NULL) |
| created_at | TIMESTAMP | 업보트 시각 (자동 생성) |
| updated_at | TIMESTAMP | 수정 시각 (자동 업데이트) |

### 인덱스

- `idx_laboratory_feedback_user_id`: user_id 기반 빠른 조회
- `idx_laboratory_feedback_username`: username 기반 빠른 조회
- `idx_laboratory_feedback_created_at`: 생성 시각 기반 정렬

### RLS (Row Level Security) 정책

- **읽기**: 누구나 업보트를 조회할 수 있음
- **쓰기**: 모든 사용자가 업보트를 생성/수정할 수 있음 (사용자당 1회)

## 4. 기능 테스트

1. 로컬 개발 서버 실행: `pnpm dev:web`
2. `/laboratory` 페이지로 이동
3. 하단에서 "↑ 업보트" 버튼 클릭
4. 성공 메시지 확인

## 5. API 사용법

### Tanstack Query v5 with queryOptions Pattern

```typescript
import {
  checkUserUpvoteOptions,
  getUpvoteCountOptions,
  useCreateLaboratoryUpvote,
  useCheckUserUpvote,
  useGetUpvoteCount,
} from '@/apis/laboratory/useLaboratoryFeedback';

// 1. React Query Hooks 사용 (권장)
// 업보트 생성
const { mutate } = useCreateLaboratoryUpvote();
mutate({
  user_id: 'github-123',
  username: 'johndoe',
});

// 사용자가 이미 업보트했는지 확인
const { data } = useCheckUserUpvote('github-123');
console.log(data?.hasUpvoted); // true/false

// 전체 업보트 개수 조회
const { data: count } = useGetUpvoteCount();
console.log(count); // 숫자

// 2. queryOptions 직접 사용 (SSR, prefetching)
import { useQuery, queryClient } from '@tanstack/react-query';

// Server Component에서 prefetch
await queryClient.prefetchQuery(checkUserUpvoteOptions('github-123'));
await queryClient.prefetchQuery(getUpvoteCountOptions());

// Client Component에서 사용
const { data } = useQuery(checkUserUpvoteOptions('github-123'));
```

### 직접 API 호출

```typescript
import {
  createOrUpdateUpvote,
  checkUserUpvote,
  getUpvoteCount,
} from '@/apis/laboratory/feedback';

// 업보트 생성
const upvote = await createOrUpdateUpvote({
  user_id: 'github-123',
  username: 'johndoe',
});

// 사용자 확인
const result = await checkUserUpvote('github-123');

// 카운트 조회
const count = await getUpvoteCount();
```

## 문제 해결

### "Missing Supabase environment variables" 에러

- `.env.local` 파일에 환경 변수가 올바르게 설정되었는지 확인
- 개발 서버를 재시작

### RLS 정책 관련 에러

- Supabase Dashboard > Authentication > Policies에서 정책이 활성화되어 있는지 확인
- 마이그레이션이 올바르게 실행되었는지 확인

### 데이터가 저장되지 않음

- 브라우저 콘솔에서 네트워크 에러 확인
- Supabase Dashboard > Logs에서 에러 로그 확인
