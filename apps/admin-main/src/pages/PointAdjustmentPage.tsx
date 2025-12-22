import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Coins, Minus, Plus } from "lucide-react";

import ComingSoon from "@/components/ComingSoon";
import { Alert, Button, Card, StatCard, Textarea } from "@/components/ds";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  decreaseUserPoint,
  increaseUserPointAdmin,
  type PointChangeRequest,
} from "@/lib/api/points";

export default function PointAdjustmentPage() {
  const [username, setUsername] = useState("");
  const [point, setPoint] = useState("");
  const [reason, setReason] = useState("");
  const [operationType, setOperationType] = useState<"increase" | "decrease">("increase");

  const increasePointMutation = useMutation({
    mutationFn: ({ username, data }: { username: string; data: PointChangeRequest }) =>
      increaseUserPointAdmin(username, data),
    onError: (error) => {
      console.error("포인트 증가 실패:", error);
    },
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

    const mutationPayload = {
      username: username.trim(),
      data: {
        point: pointNumber,
        reason: reason.trim(),
      },
    };

    if (operationType === "increase") {
      increasePointMutation.mutate(mutationPayload);
    } else {
      decreasePointMutation.mutate(mutationPayload);
    }
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
          <Label>사용자명 (username)</Label>
          <Input
            placeholder="예: sumi-0011"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
          <p className="text-xs text-slate-500">GitHub 사용자명을 입력하세요.</p>

          {/* 포인트 */}
          <Label>포인트</Label>
          <Input
            type="number"
            placeholder="예: 1000"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            required
            disabled={isLoading}
            min="1"
          />
          <p className="text-xs text-slate-500">{`${operationType === "increase" ? "증가" : "감소"}시킬 포인트를 입력하세요. (양수)`}</p>

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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 relative">
        <ComingSoon type="icon" />
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
    </div>
  );
}
