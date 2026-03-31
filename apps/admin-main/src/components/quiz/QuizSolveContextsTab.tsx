import { useState } from "react";
import { Loader2, Search } from "lucide-react";

import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ds";
import { useQuizSolveContexts } from "@/hooks/queries/useQuizSolveContexts";

import { QuizBadge } from "./QuizBadge";

export const QuizSolveContextsTab = () => {
  const [inputValue, setInputValue] = useState("");
  const [userId, setUserId] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useQuizSolveContexts(userId);

  const contexts = data?.pages.flatMap((page) => page.quizSolveContexts) ?? [];

  const handleSearch = () => {
    setUserId(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 max-w-sm">
          <Input
            icon={Search}
            placeholder="유저 ID를 입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
          />
        </div>
        <Button variant="primary" size="sm" icon={Search} onClick={handleSearch}>
          조회
        </Button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>유저 ID</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>라운드</TableHead>
              <TableHead>상금</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>풀이일</TableHead>
              <TableHead>생성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!userId ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                  유저 ID를 입력하고 조회해주세요.
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : contexts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                  풀이 내역이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              contexts.map((ctx) => (
                <TableRow key={ctx.id}>
                  <TableCell className="text-sm text-slate-700">{ctx.userId}</TableCell>
                  <TableCell>
                    <QuizBadge type="category" value={ctx.category} />
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="font-medium">{ctx.round.current}</span>
                    <span className="text-slate-400"> / {ctx.round.total}</span>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-blue-600">
                    {ctx.prize.toLocaleString()}P
                  </TableCell>
                  <TableCell>
                    <QuizBadge type="status" value={ctx.status} />
                  </TableCell>
                  <TableCell className="text-xs text-slate-400">{ctx.solvedAt}</TableCell>
                  <TableCell className="text-xs text-slate-400">{ctx.createdAt}</TableCell>
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
    </div>
  );
};
