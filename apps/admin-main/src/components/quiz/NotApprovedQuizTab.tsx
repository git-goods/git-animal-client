import { useState } from "react";
import { Check, Loader2, Trash2 } from "lucide-react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ds";
import { useApproveQuiz } from "@/hooks/mutations/useApproveQuiz";
import { useDeleteNotApprovedQuiz } from "@/hooks/mutations/useDeleteNotApprovedQuiz";
import { useNotApprovedQuizs } from "@/hooks/queries/useNotApprovedQuizs";
import type { QuizCategory, QuizLanguage, QuizLevel } from "@/lib/api/quiz";

import { QuizActionDialog } from "./QuizActionDialog";
import { QuizBadge } from "./QuizBadge";
import { QuizFilters } from "./QuizFilters";

export const NotApprovedQuizTab = () => {
  const [level, setLevel] = useState<QuizLevel | undefined>();
  const [category, setCategory] = useState<QuizCategory | undefined>();
  const [language, setLanguage] = useState<QuizLanguage | undefined>();

  const [approveTarget, setApproveTarget] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNotApprovedQuizs({
    level,
    category,
    language,
  });

  const approveMutation = useApproveQuiz();
  const deleteMutation = useDeleteNotApprovedQuiz();

  const quizs = data?.pages.flatMap((page) => page.quizs) ?? [];

  const handleApprove = (reason: string) => {
    if (!approveTarget) return;
    approveMutation.mutate(
      { quizId: approveTarget, reason },
      { onSuccess: () => setApproveTarget(null) },
    );
  };

  const handleDelete = (reason: string) => {
    if (!deleteTarget) return;
    deleteMutation.mutate(
      { quizId: deleteTarget, reason },
      { onSuccess: () => setDeleteTarget(null) },
    );
  };

  return (
    <div className="space-y-3">
      <QuizFilters
        level={level}
        category={category}
        language={language}
        onLevelChange={setLevel}
        onCategoryChange={setCategory}
        onLanguageChange={setLanguage}
      />

      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>난이도</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>언어</TableHead>
              <TableHead className="min-w-[300px]">문제</TableHead>
              <TableHead>정답</TableHead>
              <TableHead>등록자</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-slate-500">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : quizs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-slate-500">
                  미승인 퀴즈가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              quizs.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>
                    <QuizBadge type="level" value={quiz.level} />
                  </TableCell>
                  <TableCell>
                    <QuizBadge type="category" value={quiz.category} />
                  </TableCell>
                  <TableCell>
                    <QuizBadge type="language" value={quiz.language} />
                  </TableCell>
                  <TableCell className="max-w-[400px] truncate text-sm text-slate-700">
                    {quiz.problem}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{quiz.expectedAnswer}</TableCell>
                  <TableCell className="text-sm text-slate-500">{quiz.userId}</TableCell>
                  <TableCell className="text-xs text-slate-400">{quiz.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-50 transition-colors"
                        onClick={() => setApproveTarget(quiz.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                        승인
                      </button>
                      <button
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => setDeleteTarget(quiz.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        삭제
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            더 보기
          </Button>
        </div>
      )}

      <QuizActionDialog
        open={approveTarget !== null}
        onOpenChange={(open) => !open && setApproveTarget(null)}
        title="퀴즈 승인"
        description="이 퀴즈를 승인하시겠습니까? 승인 후 퀴즈 풀에 반영됩니다."
        confirmLabel="승인"
        variant="primary"
        isPending={approveMutation.isPending}
        onConfirm={handleApprove}
      />

      <QuizActionDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="퀴즈 삭제"
        description="이 미승인 퀴즈를 삭제하시겠습니까? 포인트 회수가 함께 진행될 수 있습니다."
        confirmLabel="삭제"
        variant="danger"
        isPending={deleteMutation.isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
};
