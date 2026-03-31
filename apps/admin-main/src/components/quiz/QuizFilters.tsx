import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ds";
import type { QuizCategory, QuizLanguage, QuizLevel } from "@/lib/api/quiz";

interface QuizFiltersProps {
  level: QuizLevel | undefined;
  category: QuizCategory | undefined;
  language: QuizLanguage | undefined;
  onLevelChange: (value: QuizLevel | undefined) => void;
  onCategoryChange: (value: QuizCategory | undefined) => void;
  onLanguageChange: (value: QuizLanguage | undefined) => void;
}

const ALL_VALUE = "__all__";

export const QuizFilters = ({
  level,
  category,
  language,
  onLevelChange,
  onCategoryChange,
  onLanguageChange,
}: QuizFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={level ?? ALL_VALUE}
        onValueChange={(v: string) => onLevelChange(v === ALL_VALUE ? undefined : (v as QuizLevel))}
      >
        <SelectTrigger className="w-[130px]" size="sm">
          <SelectValue placeholder="난이도" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>전체 난이도</SelectItem>
          <SelectItem value="EASY">쉬움</SelectItem>
          <SelectItem value="MEDIUM">보통</SelectItem>
          <SelectItem value="DIFFICULT">어려움</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={category ?? ALL_VALUE}
        onValueChange={(v: string) =>
          onCategoryChange(v === ALL_VALUE ? undefined : (v as QuizCategory))
        }
      >
        <SelectTrigger className="w-[140px]" size="sm">
          <SelectValue placeholder="카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>전체 카테고리</SelectItem>
          <SelectItem value="FRONTEND">프론트엔드</SelectItem>
          <SelectItem value="BACKEND">백엔드</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={language ?? ALL_VALUE}
        onValueChange={(v: string) =>
          onLanguageChange(v === ALL_VALUE ? undefined : (v as QuizLanguage))
        }
      >
        <SelectTrigger className="w-[120px]" size="sm">
          <SelectValue placeholder="언어" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>전체 언어</SelectItem>
          <SelectItem value="KOREA">한국어</SelectItem>
          <SelectItem value="ENGLISH">영어</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
