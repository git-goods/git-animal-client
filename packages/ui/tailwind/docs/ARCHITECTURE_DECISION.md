# 아키텍처 결정: Pre-compiled 패키지 방식 선택

## 결정 요약

`@gitanimals/ui-tailwind` 패키지는 **pre-compiled 방식**을 사용합니다.
소스 파일(`src/`)을 직접 참조하지 않고, 빌드된 결과물(`dist/`)을 참조합니다.

## 배경

모노레포에서 공유 패키지를 배포하는 방식은 크게 두 가지가 있습니다:

| 방식 | 설명 | 예시 |
|------|------|------|
| **Source-first** | 소스 파일 직접 참조 | `"main": "./src/index.ts"` |
| **Pre-compiled** | 빌드 결과물 참조 | `"main": "./dist/index.js"` |

## 왜 Pre-compiled를 선택했나요?

### 1. Tailwind 설정 파일의 특수성

Tailwind 설정(`tailwind.config.ts`)은 **Node.js 런타임**에서 실행됩니다:

```
Next.js/Vite 빌드 시작
    ↓
tailwind.config.ts 로드 (Node.js)
    ↓
@gitanimals/ui-tailwind/config import
    ↓
⚠️ TypeScript 파일은 Node.js가 직접 실행 불가
```

TypeScript 소스를 직접 참조하면 Node.js가 해석하지 못해 에러가 발생합니다.
빌드된 JavaScript 파일이 필요합니다.

### 2. 빌드 도구 간 호환성

| 도구 | TS 직접 지원 |
|------|-------------|
| Next.js (앱 코드) | ✅ |
| Vite (앱 코드) | ✅ |
| Tailwind CLI | ❌ |
| PostCSS | ❌ |

Tailwind/PostCSS는 설정 파일에서 TypeScript를 직접 지원하지 않습니다.

### 3. 명확한 의존성 경계

```
┌─────────────────────────────────────────────────────────┐
│  @gitanimals/ui-tailwind                                │
│  ┌──────────┐         ┌──────────┐                      │
│  │   src/   │ ──tsup──▶│  dist/   │                     │
│  │ (개발용)  │         │ (배포용)  │                     │
│  └──────────┘         └──────────┘                      │
│                            │                            │
└────────────────────────────┼────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
    ┌──────────┐      ┌──────────┐      ┌──────────┐
    │ apps/web │      │apps/admin│      │apps/     │
    │          │      │          │      │webview   │
    └──────────┘      └──────────┘      └──────────┘
```

- **개발자**: `src/` 수정 → `pnpm build` → `dist/` 생성
- **소비자(앱)**: `dist/`만 참조, 빌드 과정 알 필요 없음

### 4. 타입 안정성

`tsup`이 생성하는 `.d.ts` 파일로 타입 정보 제공:

```
dist/
├── config.js      # 런타임 코드
├── config.mjs     # ESM 버전
└── config.d.ts    # 타입 정의
```

소비자는 빌드된 JS와 타입 정의를 함께 받아 안정적인 타입 체크가 가능합니다.

### 5. 빌드 캐싱 효율

Turborepo의 빌드 캐싱이 효과적으로 작동:

```bash
# 첫 빌드
pnpm build  # @gitanimals/ui-tailwind 빌드됨

# 변경 없이 재빌드
pnpm build  # 캐시 히트, 스킵됨

# src/ 변경 후 빌드
pnpm build  # 변경 감지, 재빌드
```

Source-first 방식은 매번 소비자 측에서 트랜스파일이 필요하지만,
Pre-compiled는 패키지 빌드 시 한 번만 처리됩니다.

## 개발 워크플로우

### 일반적인 작업 흐름

```bash
# 1. 소스 수정
vim packages/ui/tailwind/src/theme/colors.ts

# 2. 패키지 빌드
pnpm --filter @gitanimals/ui-tailwind build

# 3. 앱 개발 서버에서 확인
pnpm dev:web
```

### Watch 모드 (권장)

소스 변경을 자동 감지하여 빌드:

```bash
# 터미널 1: 패키지 watch
pnpm --filter @gitanimals/ui-tailwind dev

# 터미널 2: 앱 개발 서버
pnpm dev:web
```

## 대안 검토

### 왜 Source-first를 선택하지 않았나?

1. **Tailwind 설정 호환성 문제**
   - `tailwind.config.ts`가 Node.js에서 직접 실행되어 TS 지원 불가

2. **트랜스파일 복잡성**
   - 각 앱에서 외부 패키지 트랜스파일 설정 필요
   - Next.js: `transpilePackages` 설정
   - Vite: `optimizeDeps.include` 설정

3. **빌드 시간 증가**
   - 앱 빌드마다 패키지 소스 트랜스파일 필요

## 결론

Pre-compiled 방식은 초기 설정이 필요하지만:

- ✅ Tailwind 설정과의 호환성 보장
- ✅ 명확한 빌드 경계와 캐싱
- ✅ 안정적인 타입 제공
- ✅ 다양한 빌드 도구와 호환

**Trade-off**: 소스 변경 시 빌드 단계가 필요하지만, `watch` 모드로 개발 경험을 개선할 수 있습니다.
