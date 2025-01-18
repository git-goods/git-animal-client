# Contributing Guide

## 기여하기 전에

`git-animal-client`는 현재 외부 기여를 제한적으로 받고 있습니다.  
 프로젝트의 일관성과 품질 유지를 위해, 기여를 원하시는 경우 작업 시작 전에 먼저 이슈를 생성해 주시면 감사하겠습니다.

## 이슈 작성 가이드

이슈 작성 시 아래 내용을 포함해 주세요

- 기여하고자 하는 내용
- 예상 작업 범위
- 예상 작업 기간
- 관련된 기존 이슈나 PR (있는 경우)
- 구현 방식에 대한 간단한 설명

## PR 가이드

이슈에 대한 긍정적인 피드백을 받으신 후에는 다음 단계에 따라 진행해 주세요.

1. 이 저장소를 포크(Fork)합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 커밋 메시지 가이드

커밋 메시지는 다음 형식을 따라주세요.

- type: feat, fix, docs, style, refactor, test, chore 중 하나를 사용
- description: 변경 사항에 대한 간단한 설명

> `git-animals-client`는 squash merge를 사용합니다. 따라서 commit 개수나, 커밋 메시지 형식에 대한 규칙은 엄격하게 적용되지 않습니다.

## 코드 스타일

- 일관된 코드 스타일을 위해 프로젝트의 ESLint와 Prettier 설정을 따라주세요.

이슈, PR 검토 후 피드백을 드리도록 하겠습니다. 기여해 주셔서 감사합니다! 🙏
