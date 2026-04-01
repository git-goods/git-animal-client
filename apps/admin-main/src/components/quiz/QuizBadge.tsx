import type { BadgeProps } from "@/components/ds";
import { Badge } from "@/components/ds";
import type { QuizCategory, QuizLanguage, QuizLevel, SolveStatus } from "@/lib/api/quiz";

const levelConfig: Record<QuizLevel, { label: string; color: BadgeProps["color"] }> = {
  EASY: { label: "쉬움", color: "green" },
  MEDIUM: { label: "보통", color: "yellow" },
  DIFFICULT: { label: "어려움", color: "red" },
};

const categoryConfig: Record<QuizCategory, { label: string; color: BadgeProps["color"] }> = {
  FRONTEND: { label: "프론트엔드", color: "blue" },
  BACKEND: { label: "백엔드", color: "purple" },
};

const languageConfig: Record<QuizLanguage, { label: string; color: BadgeProps["color"] }> = {
  KOREA: { label: "한국어", color: "slate" },
  ENGLISH: { label: "영어", color: "cyan" },
};

const statusConfig: Record<SolveStatus, { label: string; color: BadgeProps["color"] }> = {
  NOT_STARTED: { label: "시작 전", color: "slate" },
  SOLVING: { label: "풀이 중", color: "blue" },
  SUCCESS: { label: "성공", color: "green" },
  FAIL: { label: "실패", color: "red" },
  DONE: { label: "완료", color: "indigo" },
};

type QuizBadgeProps =
  | { type: "level"; value: QuizLevel }
  | { type: "category"; value: QuizCategory }
  | { type: "language"; value: QuizLanguage }
  | { type: "status"; value: SolveStatus };

export const QuizBadge = (props: QuizBadgeProps) => {
  let config: { label: string; color: BadgeProps["color"] };

  switch (props.type) {
    case "level":
      config = levelConfig[props.value];
      break;
    case "category":
      config = categoryConfig[props.value];
      break;
    case "language":
      config = languageConfig[props.value];
      break;
    case "status":
      config = statusConfig[props.value];
      break;
  }

  return <Badge color={config.color}>{config.label}</Badge>;
};
