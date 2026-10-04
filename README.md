⭐스타를 눌러주세요 개발에 큰 도움이 됩니다!⭐️

깃허브 활동으로 펫을 키우세요!
깃허브 활동으로 펫을 획득하고 성장시킬 수 있어요.
커밋을 30번 하면 1개의 펫을 추가로 입양할 수 있어요.
1개의 contribution은 랜덤한 펫의 level을 1 증가시켜요.
키운 펫은 다른사람과 거래할 수 있어요.

40 종류가 넘는 펫을 뽑고 기르세요.

GitAnimals 펫들을 쉽게 페이지에서 관리하고, 펫을 뽑을 수 있어요!
[GitAnimals 관리하기 ->](https://www.gitanimals.org/)

## Example Result

<a href="https://github.com/devxb/gitanimals">
<img
  src="https://render.gitanimals.org/farms/sumi-0011"
  width="600"
  height="300"
/>
</a>

# Contributing Guide

## 기여하기 전에

`gitanimals-client`는 현재 외부 기여를 제한적으로 받고 있습니다. 프로젝트의 일관성과 품질 유지를 위해, 기여를 원하시는 경우 작업 시작 전에 먼저 이슈를 생성해 주시면 감사하겠습니다.

> 👉 [Contributing Guide](./CONTRIBUTING.md)

# Project Detail

## Tech Stack 🛠️

### Core

- ⚛️ React 18 + Next.js 14 (`apps/web`)
- 🎨 Styling: Tailwind CSS (`apps/web`, `apps/admin-main`)
- 🔄 State Management:
  - Tanstack Query v5 (Server State)
  - Jotai & Zustand (Client State)
- 🌐 Internationalization: next-intl
- 🔒 Authentication: NextAuth.js
- 📚 Storybook 8
- 🧪 TypeScript 5

### Infrastructure

- 🏗️ Monorepo with Turborepo
- 📦 pnpm Workspace (v9)
- 🟢 Node.js (>= 18)

### Apps

- 🌐 Web (@gitanimals/web)
- 👨‍💼 Admin (@gitanimals/admin-main)
