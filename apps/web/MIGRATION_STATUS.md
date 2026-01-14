# PandaCSS → Tailwind CSS 마이그레이션 진행 상황

**마지막 업데이트**: 2026-01-14

## 진행률 요약

- **시작 시점**: 162개 파일 (PandaCSS 임포트)
- **현재 남은 파일**: 24개 파일
- **완료율**: 약 **85%**

---

## 남은 작업 목록

### PandaCSS 패턴 임포트 (`from '_panda/'`) - 5개 파일

| 파일 | 상태 | 비고 |
|------|------|------|
| `src/app/[locale]/dev/page.tsx` | ⬜ 미완료 | dev 페이지 |
| `src/app/[locale]/dev/Client.tsx` | ⬜ 미완료 | dev 클라이언트 |
| `src/app/[locale]/dev/token/token.style.ts` | ⬜ 미완료 | 토큰 스타일 |
| `src/app/[locale]/dev/component/page.tsx` | ⬜ 미완료 | 컴포넌트 페이지 |
| `src/app/[locale]/laboratory/_component/AlertDialog.tsx` | ⬜ 미완료 | Alert 다이얼로그 |

### UI-Panda 컴포넌트 임포트 (`from '@gitanimals/ui-panda'`) - 19개 파일

#### Landing 섹션 (3개)
| 파일 | 상태 |
|------|------|
| `src/app/[locale]/landing/MainSection/MainSection.tsx` | ⬜ 미완료 |
| `src/app/[locale]/landing/ChoosePetSection/ChoosePetSection.tsx` | ⬜ 미완료 |
| `src/app/[locale]/landing/AvailablePetSection/AvailablePetSection.tsx` | ⬜ 미완료 |

#### Components (4개)
| 파일 | 상태 |
|------|------|
| `src/components/AnimalCard/AnimalCard.tsx` | ⬜ 미완료 |
| `src/components/SortSelect/SortDirectionSelect.tsx` | ⬜ 미완료 |
| `src/components/SortSelect/OrderTypeSelect.tsx` | ⬜ 미완료 |
| `src/components/MediaQuery/MediaQuery.tsx` | ⬜ 미완료 |

#### Guild 페이지 (7개)
| 파일 | 상태 |
|------|------|
| `src/app/[locale]/guild/_components/SortSelect.tsx` | ⬜ 미완료 |
| `src/app/[locale]/guild/_components/GuildPetSelectDialog.tsx` | ⬜ 미완료 |
| `src/app/[locale]/guild/(subpage)/detail/[id]/page.tsx` | ⬜ 미완료 |
| `src/app/[locale]/guild/(subpage)/create/GuildCreate.tsx` | ⬜ 미완료 |
| `src/app/[locale]/guild/(subpage)/[id]/setting/member/MemberCard.tsx` | ⬜ 미완료 |
| `src/app/[locale]/guild/(subpage)/[id]/MoreMenu.tsx` | ⬜ 미완료 |
| `src/app/[locale]/guild/(subpage)/[id]/CopyGuildImgButton.tsx` | ⬜ 미완료 |

#### Dev 페이지 (4개)
| 파일 | 상태 |
|------|------|
| `src/app/[locale]/dev/page.tsx` | ⬜ 미완료 |
| `src/app/[locale]/dev/Client.tsx` | ⬜ 미완료 |
| `src/app/[locale]/dev/token/page.tsx` | ⬜ 미완료 |
| `src/app/[locale]/dev/component/page.tsx` | ⬜ 미완료 |

#### Laboratory (1개)
| 파일 | 상태 |
|------|------|
| `src/app/[locale]/laboratory/_component/AlertDialog.tsx` | ⬜ 미완료 |

---

## 완료된 작업

### 백그라운드 에이전트 작업 결과

| 작업 ID | 내용 | 상태 |
|---------|------|------|
| ab99674 | Landing styles (6개 파일) | ✅ 완료 |
| a988b66 | Landing components | ✅ 완료 |
| abdd937 | Guild page files (8개 파일) | ✅ 완료 |
| aeebca2 | Event page files (12개 파일) | ✅ 완료 |
| a6a13a4 | Mypage files | ⚠️ Rate limit 중단 |
| a49d6dc | Ranking section | ⚠️ Rate limit 중단 |
| af69c09 | Quiz game files | ⚠️ Rate limit 중단 |
| a8ee052 | Guild subpage files | ⚠️ Rate limit 중단 |
| a1f8080 | Component files | ⚠️ Rate limit 중단 |

### 수동 마이그레이션 완료 파일
- `src/app/[locale]/error.tsx`
- `src/app/[locale]/auth/page.tsx`
- `src/app/[locale]/auth/signOut/page.tsx`
- `src/components/Pagination/PaginationServer.tsx`
- `src/components/Global/useDialog.tsx`
- `src/components/Global/FeedbackForm.tsx` (읽기만 완료)

---

## 마이그레이션 패턴 참조

### 임포트 변환
```typescript
// Before
import { css, cx } from '_panda/css';
import { flex, center, grid } from '_panda/patterns';
import { Flex, Box } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';

// After
import { cn, Button, Dialog } from '@gitanimals/ui-tailwind';
```

### 스타일 변환 예시
```typescript
// Before (PandaCSS)
const style = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
  _mobile: { padding: '8px' },
});

// After (Tailwind)
const style = cn(
  'flex items-center gap-2',
  'font-product text-glyph-16 text-white-white/75',
  'max-mobile:p-2'
);
```

### 색상 토큰 매핑
| PandaCSS | Tailwind |
|----------|----------|
| `brand.canary` | `brand-canary` |
| `gray.gray_150` | `gray-150` |
| `white.white_75` | `white-white/75` |
| `black.black_50` | `black/50` |

### 반응형 프리픽스
| PandaCSS | Tailwind |
|----------|----------|
| `_mobile: {}` | `max-mobile:` |
| `_desktop: {}` | `desktop:` |

---

## 최종 단계 (마이그레이션 완료 후)

- [ ] 모든 파일 마이그레이션 완료
- [ ] `pnpm build:web` 빌드 성공 확인
- [ ] 시각적 회귀 테스트
- [ ] PandaCSS 의존성 제거
  - `panda.config.ts` 삭제
  - `styled-system/` 디렉토리 삭제
  - `package.json`에서 PandaCSS 관련 의존성 제거
  - `tsconfig.json`에서 `_panda` 경로 제거
