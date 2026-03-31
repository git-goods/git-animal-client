import { ApprovedQuizTab } from "@/components/quiz/ApprovedQuizTab";
import { NotApprovedQuizTab } from "@/components/quiz/NotApprovedQuizTab";
import { QuizSolveContextsTab } from "@/components/quiz/QuizSolveContextsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ds";

export default function QuizManagementPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">퀴즈 관리</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          퀴즈를 검토하고 승인/삭제하거나, 유저별 풀이 내역을 조회합니다.
        </p>
      </div>

      <Tabs defaultValue="not-approved">
        <TabsList>
          <TabsTrigger value="not-approved">미승인 퀴즈</TabsTrigger>
          <TabsTrigger value="approved">승인 퀴즈</TabsTrigger>
          <TabsTrigger value="solve-contexts">퀴즈 풀이 내역</TabsTrigger>
        </TabsList>

        <TabsContent value="not-approved">
          <NotApprovedQuizTab />
        </TabsContent>

        <TabsContent value="approved">
          <ApprovedQuizTab />
        </TabsContent>

        <TabsContent value="solve-contexts">
          <QuizSolveContextsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
