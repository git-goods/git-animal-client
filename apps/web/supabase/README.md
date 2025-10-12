# Supabase Setup Guide

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
| user_id | TEXT | 사용자 ID (필수) |
| username | TEXT | 사용자 이름 (필수) |
| description | TEXT | 추가 설명 (선택) |
| created_at | TIMESTAMP | 생성 시각 (자동 생성) |
| updated_at | TIMESTAMP | 수정 시각 (자동 업데이트) |

### 인덱스

- `idx_laboratory_feedback_user_id`: user_id 기반 빠른 조회
- `idx_laboratory_feedback_username`: username 기반 빠른 조회
- `idx_laboratory_feedback_created_at`: 생성 시각 기반 정렬

### RLS (Row Level Security) 정책

- **읽기**: 누구나 피드백을 조회할 수 있음
- **쓰기**: 인증된 사용자만 자신의 피드백을 생성/수정할 수 있음

## 4. 기능 테스트

1. 로컬 개발 서버 실행: `pnpm dev:web`
2. `/laboratory` 페이지로 이동
3. 하단 피드백 섹션에서 "UP!!" 버튼 클릭
4. 추가 설명 입력 (선택) 후 제출

## 5. API 사용법

### React Query Hooks

```typescript
import {
  useCreateLaboratoryFeedback,
  useCheckUserFeedback,
  useGetFeedbackCount,
} from '@/apis/laboratory/useLaboratoryFeedback';

// 피드백 생성/업데이트
const { mutate } = useCreateLaboratoryFeedback();
mutate({
  user_id: 'user-123',
  username: 'johndoe',
  description: '좋은 기능입니다!',
});

// 사용자가 이미 업보트했는지 확인
const { data } = useCheckUserFeedback('user-123');
console.log(data?.hasUpvoted); // true/false

// 전체 피드백 개수 조회
const { data: count } = useGetFeedbackCount();
console.log(count); // 숫자
```

### 직접 API 호출

```typescript
import {
  createOrUpdateFeedback,
  checkUserFeedback,
  getFeedbackCount,
} from '@/apis/laboratory/feedback';

// 피드백 생성
const feedback = await createOrUpdateFeedback({
  user_id: 'user-123',
  username: 'johndoe',
  description: '좋은 기능입니다!',
});

// 사용자 확인
const result = await checkUserFeedback('user-123');

// 카운트 조회
const count = await getFeedbackCount();
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
