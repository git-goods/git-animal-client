import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import type { Quiz, QuizSolveContext } from "@/lib/api/quiz";

import { QuizBadge } from "./QuizBadge";

interface QuizCardContentProps {
  quiz: Quiz;
}

export const QuizCardContent = ({ quiz }: QuizCardContentProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="p-3 cursor-pointer select-none"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <QuizBadge type="level" value={quiz.level} />
        <QuizBadge type="category" value={quiz.category} />
        <QuizBadge type="language" value={quiz.language} />
        <motion.div
          className="ml-auto"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </motion.div>
      </div>

      <p className="text-sm text-slate-700 line-clamp-2">{quiz.problem}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">정답</span>
                <span className="text-sm font-medium font-mono">{quiz.expectedAnswer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">등록자</span>
                <span className="text-sm text-slate-500">{quiz.userId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">등록일</span>
                <span className="text-xs text-slate-400">{quiz.createdAt}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SolveContextCardContentProps {
  context: QuizSolveContext;
}

export const SolveContextCardContent = ({ context }: SolveContextCardContentProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white p-3 cursor-pointer select-none"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <QuizBadge type="category" value={context.category} />
        <QuizBadge type="status" value={context.status} />
        <motion.div
          className="ml-auto"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">{context.userId}</span>
        <span className="text-sm font-medium text-blue-600">
          {context.prize.toLocaleString()}P
        </span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">라운드</span>
                <span className="text-sm">
                  <span className="font-medium">{context.round.current}</span>
                  <span className="text-slate-400"> / {context.round.total}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">풀이일</span>
                <span className="text-xs text-slate-400">{context.solvedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">생성일</span>
                <span className="text-xs text-slate-400">{context.createdAt}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
