import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Coins, Minus, Plus } from "lucide-react";

import { Alert, Button, Card, Input, StatCard, Textarea } from "@/components/ds";
import { decreaseUserPoint, increaseUserPoint, type PointChangeRequest } from "@/lib/api/points";

export default function PointAdjustmentPage() {
  const [username, setUsername] = useState("");
  const [point, setPoint] = useState("");
  const [reason, setReason] = useState("");
  const [operationType, setOperationType] = useState<"increase" | "decrease">("increase");

  const increasePointMutation = useMutation({
    mutationFn: ({ username, data }: { username: string; data: PointChangeRequest }) =>
      increaseUserPoint(username, data),
  });

  const decreasePointMutation = useMutation({
    mutationFn: ({ username, data }: { username: string; data: PointChangeRequest }) =>
      decreaseUserPoint(username, data),
  });

  const isLoading = increasePointMutation.isPending || decreasePointMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("사용자명을 입력해주세요.");
      return;
    }

    const pointNumber = parseInt(point, 10);
    if (isNaN(pointNumber) || pointNumber <= 0) {
      alert("올바른 포인트 값을 입력해주세요.");
      return;
    }

    if (!reason.trim()) {
      alert("사유를 입력해주세요.");
      return;
    }

    const mutation = operationType === "increase" ? increasePointMutation : decreasePointMutation;
    const actionText = operationType === "increase" ? "증가" : "감소";

    mutation.mutate(
      {
        username: username.trim(),
        data: {
          point: pointNumber,
          reason: reason.trim(),
        },
      },
      {
        onSuccess: () => {
          alert(
            `포인트 ${actionText} 요청이 성공했습니다.\n\n승인 절차를 거친 후 처리됩니다.`,
          );
          setUsername("");
          setPoint("");
          setReason("");
        },
        onError: (error) => {
          console.error("포인트 변경 실패:", error);
          alert(`포인트 ${actionText} 실패:\n${error instanceof Error ? error.message : "알 수 없는 오류"}`);
        },
      },
    );
  };

  const handleReset = () => {
    setUsername("");
    setPoint("");
    setReason("");
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-0.5 text-lg flex items-center gap-2">
          <Coins className="w-6 h-6 text-blue-600" />
          포인트 증감 관리
        </h1>
        <p className="text-slate-600 text-xs">사용자의 포인트를 증가하거나 감소시킬 수 있습니다.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <StatCard
          title="총 요청"
          value="248"
          description="전체 요청 건수"
          icon={Coins}
          color="blue"
          trend="+12"
        />
        <StatCard
          title="승인 대기"
          value="15"
          description="처리 대기 중"
          icon={Plus}
          color="amber"
          trend="+5"
        />
        <StatCard
          title="완료"
          value="233"
          description="처리 완료"
          icon={Minus}
          color="green"
          trend="+7"
        />
      </div>

      {/* Alert */}
      <Alert variant="warning" title="승인 절차 안내">
        포인트 증감 요청은 별도의 승인 절차를 거쳐야 합니다. 요청 후 승인이 완료되면 실제 포인트가
        변경됩니다.
      </Alert>

      {/* Form */}
      <Card title="포인트 증감 요청" subtitle="사용자의 포인트를 조정하기 위한 요청을 생성합니다">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 작업 유형 선택 */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">작업 유형</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOperationType("increase")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  operationType === "increase"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">포인트 증가</span>
              </button>
              <button
                type="button"
                onClick={() => setOperationType("decrease")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  operationType === "decrease"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <Minus className="w-5 h-5" />
                <span className="text-sm font-medium">포인트 감소</span>
              </button>
            </div>
          </div>

          {/* 사용자명 */}
          <Input
            label="사용자명 (username)"
            placeholder="예: sumi-0011"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText="GitHub 사용자명을 입력하세요."
            required
            fullWidth
            disabled={isLoading}
          />

          {/* 포인트 */}
          <Input
            label="포인트"
            type="number"
            placeholder="예: 1000"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            helperText={`${operationType === "increase" ? "증가" : "감소"}시킬 포인트를 입력하세요. (양수)`}
            required
            fullWidth
            disabled={isLoading}
            min="1"
          />

          {/* 사유 */}
          <Textarea
            label="사유"
            placeholder="포인트를 변경하는 이유를 입력하세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            helperText="승인자가 확인할 수 있도록 명확한 사유를 작성해주세요."
            required
            fullWidth
            disabled={isLoading}
            rows={4}
          />

          {/* 버튼 */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleReset} disabled={isLoading} type="button">
              초기화
            </Button>
            <Button
              type="submit"
              variant={operationType === "increase" ? "success" : "danger"}
              icon={operationType === "increase" ? Plus : Minus}
              loading={isLoading}
            >
              {isLoading
                ? "처리 중..."
                : `포인트 ${operationType === "increase" ? "증가" : "감소"} 요청`}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
