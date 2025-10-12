# Supabase Laboratory Feedback 설정 체크리스트

## ✅ 완료된 작업

### 1. 패키지 설치
- [x] `@supabase/supabase-js` 설치 완료

### 2. 데이터베이스 스키마
- [x] `migrations/20250112_create_lab_feedback_table.sql` 생성
- [x] `laboratory_feedback` 테이블 정의
- [x] RLS (Row Level Security) 정책 설정
- [x] 인덱스 생성 (user_id, username, created_at)
- [x] 자동 `updated_at` 트리거 추가

### 3. Supabase 클라이언트 설정
- [x] `src/lib/supabase/client.ts` 생성
- [x] `src/lib/supabase/types.ts` 타입 정의

### 4. API 레이어
- [x] `src/apis/laboratory/feedback.ts` 기본 API 함수
- [x] `src/apis/laboratory/useLaboratoryFeedback.ts` React Query 훅

### 5. UI 컴포넌트
- [x] `src/components/Laboratory/FeedbackUpvote.tsx` 컴포넌트
- [x] `src/app/[locale]/laboratory/layout.tsx` 통합

## 🚀 다음 단계 (사용자가 해야 할 일)

### 1. 환경 변수 설정 (필수!)

`.env.local` 파일에서 다음 값을 실제 값으로 변경해주세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://covozkshyurwjmznymto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key  # ⚠️ 실제 키로 변경 필요!
```

**환경 변수 값 찾는 방법:**
1. [Supabase Dashboard](https://app.supabase.com/) 접속
2. 프로젝트 선택
3. Settings → API 메뉴
4. "Project URL"과 "anon public" 키 복사

### 2. 데이터베이스 마이그레이션 실행 (필수!)

**방법 A: Supabase SQL Editor 사용 (추천)**
1. Supabase Dashboard → SQL Editor
2. `supabase/migrations/20250112_create_lab_feedback_table.sql` 파일 내용 복사
3. 새 쿼리에 붙여넣기
4. "Run" 버튼 클릭

**방법 B: Supabase CLI 사용**
```bash
# CLI가 없다면 설치
npm install -g supabase

# 로그인
supabase login

# 마이그레이션 실행
cd apps/web
supabase db push
```

### 3. 개발 서버 재시작

환경 변수를 변경했으므로 개발 서버를 재시작해주세요:

```bash
pnpm dev:web
```

### 4. 기능 테스트

1. 브라우저에서 `http://localhost:3000/laboratory` 접속
2. 페이지 하단에 피드백 섹션 확인
3. 로그인 후 "UP!!" 버튼 클릭
4. 추가 설명 입력 (선택사항)
5. "제출하기" 버튼 클릭
6. 성공 메시지 확인

### 5. 데이터 확인

Supabase Dashboard → Table Editor → `laboratory_feedback` 테이블에서 데이터 확인

## 📊 데이터베이스 구조

```sql
laboratory_feedback
├── id (UUID, PK)
├── user_id (TEXT, NOT NULL) - GitHub 사용자 ID
├── username (TEXT, NOT NULL) - GitHub 사용자명
├── description (TEXT, NULL) - 추가 설명
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## 🎯 주요 기능

1. **UP!! 버튼**: 사용자가 정식 출시를 원한다는 의사 표시
2. **중복 방지**: 같은 사용자는 한 번만 의견 제출 가능
3. **추가 설명**: 선택적으로 상세 의견 작성 가능
4. **실시간 카운트**: 현재 몇 명이 응원하고 있는지 표시
5. **로그인 확인**: 비로그인 사용자에게 안내 메시지

## 🔧 API 사용 예시

```typescript
// 피드백 생성
const { mutate } = useCreateLaboratoryFeedback();
mutate({
  user_id: 'github-123',
  username: 'johndoe',
  description: '멋진 기능입니다!',
});

// 사용자 업보트 여부 확인
const { data } = useCheckUserFeedback('github-123');
console.log(data?.hasUpvoted); // true/false

// 전체 피드백 수 조회
const { data: count } = useGetFeedbackCount();
console.log(count); // 숫자
```

## ❓ 문제 해결

### "Missing Supabase environment variables" 경고
- `.env.local`에 환경 변수 추가 확인
- 개발 서버 재시작

### 데이터가 저장되지 않음
- 브라우저 콘솔에서 에러 확인
- Supabase Dashboard → Logs에서 에러 로그 확인
- 마이그레이션이 올바르게 실행되었는지 확인

### RLS 정책 에러
- Supabase Dashboard → Authentication → Policies 확인
- 정책이 활성화되어 있는지 확인

## 📝 추가 정보

- 상세 가이드: `supabase/README.md` 참조
- 마이그레이션 파일: `supabase/migrations/20250112_create_lab_feedback_table.sql`
- API 문서: 코드 주석 참조
