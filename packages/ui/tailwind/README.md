# @gitanimals/ui-tailwind

GitAnimals 프로젝트의 공유 Tailwind CSS 설정 및 컴포넌트 패키지입니다.

## 개발 시 주의사항

### 소스 변경 후 빌드 필요

이 패키지는 **pre-compiled 방식**으로 배포됩니다. `src/` 디렉토리의 파일을 변경한 후에는 반드시 빌드가 필요합니다.

```bash
# 패키지 빌드
pnpm --filter @gitanimals/ui-tailwind build

# 또는 watch 모드로 개발
pnpm --filter @gitanimals/ui-tailwind dev
```

### 왜 빌드가 필요한가요?

앱들은 `src/` 소스 파일이 아닌 `dist/` 빌드 결과물을 참조합니다:

```
src/config.ts  →  (tsup 빌드)  →  dist/config.mjs  →  apps/web에서 import
```

자세한 내용은 [패키지 아키텍처 결정 문서](./docs/ARCHITECTURE_DECISION.md)를 참고하세요.

## 사용법

### Tailwind 설정 확장

```typescript
// tailwind.config.ts
import { createGitAnimalsConfig } from '@gitanimals/ui-tailwind/config';

export default createGitAnimalsConfig(['./src/**/*.{js,ts,jsx,tsx}'], {
  theme: {
    extend: {
      // 추가 커스터마이징
    },
  },
});
```

### 컴포넌트 사용

```typescript
import { Button, Card } from '@gitanimals/ui-tailwind/components';
import { cn } from '@gitanimals/ui-tailwind/utils';
```

## 내보내기 경로

| 경로 | 설명 |
|------|------|
| `@gitanimals/ui-tailwind` | 메인 엔트리 |
| `@gitanimals/ui-tailwind/config` | Tailwind 설정 팩토리 |
| `@gitanimals/ui-tailwind/preset` | Tailwind 프리셋 |
| `@gitanimals/ui-tailwind/theme` | 디자인 토큰 (colors, typography 등) |
| `@gitanimals/ui-tailwind/components` | UI 컴포넌트 |
| `@gitanimals/ui-tailwind/utils` | 유틸리티 (cn 등) |
