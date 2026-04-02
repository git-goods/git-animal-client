# Dialog V2 마이그레이션 TODO

## 개요

`Dialog (v1)` → `DialogV2` 마이그레이션 작업 목록.

### V1 vs V2 차이점

| | V1 (`dialog.tsx`) | V2 (`dialog-v2.tsx`) |
|---|---|---|
| Size | `default` / `large` / `screen` | `sm` / `md` / `lg` / `full` |
| Close 버튼 | 항상 X (isShowClose로 토글) | 사이즈별 자동 분기 (sm: 없음, md: X/드래그핸들, lg/full: X/뒤로가기) |
| 모바일 | 기본 center float | md: bottom-sheet, lg/full: fullscreen |
| Body 스크롤 | scrollable prop on Content | `DialogV2Body` + ScrollArea 내장 |
| Context | 없음 | `DialogV2SizeContext` 하위 컴포넌트에서 size 참조 가능 |

### 고수준 컴포넌트 관계

```
V1 계열 (제거 대상)          V2 계열 (유지)
─────────────────          ─────────────────
Dialog (v1)                DialogV2
├── AlertDialog            ├── AlertDialogV2  (FlatDialog 기반)
├── ConfirmDialog          ├── ConfirmDialogV2 (FlatDialog 기반)
└── CommonDialog           └── FlatDialog
```

---

## apps/web 마이그레이션

### 1. Global Dialog System
- [ ] `src/components/Global/useDialog.tsx` — AlertDialogV2, ConfirmDialogV2 사용 중 (이미 V2)
- [ ] `src/components/Global/GlobalComponent.tsx` — useDialog 연결 (이미 V2, 확인만)

### 2. Shop - Pet Gotcha
- [ ] `src/app/[locale]/(default)/shop/_petGotcha/OnePet.tsx` — Dialog (v1) → DialogV2
- [ ] `src/app/[locale]/(default)/shop/_petGotcha/TenPet.tsx` — Dialog (v1) → DialogV2

### 3. Shop - Auction
- [ ] `src/app/[locale]/(default)/shop/_auction/SellSection/EditModal.tsx` — Dialog (v1) → DialogV2
- [ ] `src/app/[locale]/(default)/shop/_auction/SellSection/SellInputRow.tsx` — Dialog (v1) → DialogV2
- [ ] `src/app/[locale]/(default)/shop/_auction/PersonaSearch.tsx` — Dialog (v1) → DialogV2

### 4. Game - Quiz
- [ ] `src/app/[locale]/(default)/game/quiz/solve/_components/done/CompleteAlertDialog.tsx` — Dialog (v1) → AlertDialogV2 또는 DialogV2
- [ ] `src/app/[locale]/(default)/game/quiz/solve/_components/fail/FailAlertDialog.tsx` — Dialog (v1) → AlertDialogV2 또는 DialogV2
- [ ] `src/app/[locale]/(default)/game/quiz/solve/_components/success/CorrectConfirmDialog.tsx` — Dialog (v1) → ConfirmDialogV2 또는 DialogV2
- [ ] `src/app/[locale]/(default)/game/quiz/_components/CreateOrSolve/SelectQuizType.tsx` — ConfirmDialogV2 사용 중 (이미 V2, 확인만)
- [ ] `src/app/[locale]/(default)/game/quiz/create/_components/QuizCreateForm.tsx` — ConfirmDialogV2 사용 중 (이미 V2, 확인만)

### 5. My Page - Pet Management
- [ ] `src/app/[locale]/(default)/mypage/my-pet/(evolution)/EvolutionPersona.tsx` — CommonDialog → DialogV2 또는 FlatDialog
- [ ] `src/app/[locale]/(default)/mypage/my-pet/(merge)/MergePersona.tsx` — CommonDialog + Dialog (v1) → DialogV2
- [ ] `src/app/[locale]/(default)/mypage/my-pet/SelectedPetTable.tsx` — ConfirmDialogV2 사용 중 (이미 V2, 확인만)

### 6. My Page - GitHub Custom
- [ ] `src/app/[locale]/(default)/mypage/(github-custom)/FarmPersonaSelect.tsx` — DialogV2 사용 중 (이미 V2, 확인만)
- [ ] `src/app/[locale]/(default)/mypage/(github-custom)/LinePersonaSelect.tsx` — Dialog (v1) + ScrollArea → DialogV2

### 7. Guild
- [ ] `src/app/[locale]/(default)/guild/_components/GuildPetSelectDialog.tsx` — 커스텀 다이얼로그, 내부 Dialog 확인 필요

### 8. Laboratory
- [ ] `src/app/[locale]/(default)/laboratory/property-pet-sell/page.tsx` — useDialog hook (Global 시스템 경유, 확인만)

### 9. Route Modal
- [ ] `src/components/RouteModal.tsx` — Dialog (v1) → DialogV2

---

## apps/webview 마이그레이션

> webview는 현재 `@gitanimals/ui-panda` Dialog를 사용 중. Tailwind 마이그레이션과 함께 진행 필요.

### 10. Shop
- [ ] `src/pages/shop/_components/_petGotcha/OnePet.tsx` — Panda Dialog → DialogV2
- [ ] `src/pages/shop/_components/_petGotcha/TenPet.tsx` — Panda Dialog → DialogV2
- [ ] `src/pages/shop/_components/_auction/PersonaSearch.tsx` — Panda Dialog → DialogV2
- [ ] `src/pages/shop/_components/_auction/SellSection/EditModal.tsx` — Panda Dialog → DialogV2
- [ ] `src/pages/shop/_components/_auction/SellSection/SellInputRow.tsx` — Panda Dialog → DialogV2

### 11. Game - Quiz
- [ ] `src/pages/game/quiz/_components/CreateOrSolve/SolveQuizConfirmDialog.tsx` — Panda Dialog → ConfirmDialogV2
- [ ] `src/pages/game/quiz/solve/_components/done/CompleteAlertDialog.tsx` — Panda Dialog → AlertDialogV2
- [ ] `src/pages/game/quiz/solve/_components/fail/FailAlertDialog.tsx` — Panda Dialog → AlertDialogV2
- [ ] `src/pages/game/quiz/solve/_components/success/CorrectConfirmDialog.tsx` — Panda Dialog → ConfirmDialogV2

### 12. Pages
- [ ] `src/pages/dev/page.tsx` — Panda Dialog → DialogV2
- [ ] `src/pages/SettingsPage.tsx` — Panda Dialog → DialogV2

---

## packages/ui/tailwind 정리

### 13. V1 컴포넌트 제거 (모든 사용처 마이그레이션 완료 후)
- [ ] `src/components/ui/dialog.tsx` — V1 Dialog 제거
- [ ] `src/components/ui/alert-dialog.tsx` — V1 AlertDialog 제거
- [ ] `src/components/ui/confirm-dialog.tsx` — V1 ConfirmDialog 제거
- [ ] `src/components/common-dialog/CommonDialog.tsx` — CommonDialog 제거
- [ ] package exports에서 V1 관련 export 제거

---

## 우선순위 제안

1. **apps/web V1 → V2** (항목 2~3, 5~6, 9) — 가장 많이 사용되는 앱, 이미 V2 인프라 존재
2. **apps/web 확인만 필요** (항목 1, 4 일부, 5 일부, 8) — 이미 V2, 동작 확인
3. **apps/webview** (항목 10~12) — Panda → Tailwind 전환과 묶어서 진행
4. **V1 컴포넌트 제거** (항목 13) — 모든 마이그레이션 완료 후 최종 정리

---

## 진행 상태

| 영역 | 전체 | 완료 | 비고 |
|------|------|------|------|
| apps/web (V1→V2) | ~10 | 0 | |
| apps/web (이미 V2) | ~7 | 0 | 확인만 |
| apps/webview | ~11 | 0 | Panda→Tailwind 포함 |
| packages 정리 | ~5 | 0 | 마지막 단계 |
