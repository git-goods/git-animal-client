import { useState } from "react";

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

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) setReason("");
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Textarea
          label="사유"
          rows={3}
          placeholder="사유를 입력해주세요"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
        />
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
