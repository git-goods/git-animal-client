import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "@/components/ds";

const REASON_PRESETS: Record<"primary" | "danger", { label: string; value: string }[]> = {
  primary: [
    { label: "적절한 퀴즈", value: "퀴즈 내용과 정답이 적절하여 승인합니다." },
    { label: "내용 검증 완료", value: "문제 내용과 정답을 검증하였으며, 퀴즈 풀에 반영합니다." },
    { label: "수정 후 승인", value: "일부 수정 후 승인합니다." },
  ],
  danger: [
    { label: "부적절한 내용", value: "퀴즈 내용이 부적절하여 삭제합니다." },
    { label: "중복 퀴즈", value: "기존 퀴즈와 중복되어 삭제합니다." },
    { label: "오답", value: "정답이 올바르지 않아 삭제합니다." },
    { label: "품질 미달", value: "퀴즈 품질 기준에 미달하여 삭제합니다." },
  ],
};

const DEFAULT_REASON: Record<"primary" | "danger", string> = {
  primary: "퀴즈 내용과 정답을 확인 완료하여 승인합니다.",
  danger: "기존 퀴즈와 중복되어 삭제합니다.",
};

interface QuizActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  variant: "primary" | "danger";
  isPending: boolean;
  onConfirm: (reason: string) => void;
}

export const QuizActionDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  variant,
  isPending,
  onConfirm,
}: QuizActionDialogProps) => {
  const [reason, setReason] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const presets = REASON_PRESETS[variant];

  useEffect(() => {
    if (open) {
      setReason(DEFAULT_REASON[variant]);
      setSelectedPreset(null);
    }
  }, [open, variant]);

  const handlePresetClick = (value: string) => {
    if (selectedPreset === value) {
      setSelectedPreset(null);
      setReason(DEFAULT_REASON[variant]);
    } else {
      setSelectedPreset(value);
      setReason(value);
    }
  };

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
    setSelectedPreset(null);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setReason("");
      setSelectedPreset(null);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">사유 선택</p>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                    selectedPreset === preset.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                  onClick={() => handlePresetClick(preset.value)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <Textarea
            label="사유"
            rows={3}
            placeholder="사유를 입력해주세요"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setSelectedPreset(null);
            }}
            fullWidth
          />
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => handleOpenChange(false)}>
            취소
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            size="sm"
            loading={isPending}
            disabled={!reason.trim()}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
