import { type ReactNode, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

interface SwipeAction {
  type: "approve" | "delete";
  onAction: () => void;
}

interface SwipeableCardProps {
  children: ReactNode;
  leftAction?: SwipeAction;
  rightAction?: SwipeAction;
}

const ACTION_WIDTH = 80;
const SNAP_THRESHOLD = 40;

const actionConfig = {
  approve: {
    icon: Check,
    label: "승인",
    bg: "bg-green-500",
    activeScale: "scale-110",
  },
  delete: {
    icon: Trash2,
    label: "삭제",
    bg: "bg-red-500",
    activeScale: "scale-110",
  },
} as const;

export const SwipeableCard = ({ children, leftAction, rightAction }: SwipeableCardProps) => {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const leftOpacity = useTransform(x, [0, ACTION_WIDTH], [0, 1]);
  const rightOpacity = useTransform(x, [-ACTION_WIDTH, 0], [1, 0]);
  const leftScale = useTransform(x, [0, SNAP_THRESHOLD, ACTION_WIDTH], [0.6, 0.8, 1]);
  const rightScale = useTransform(x, [-ACTION_WIDTH, -SNAP_THRESHOLD, 0], [1, 0.8, 0.6]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info;
    const swipe = offset.x + velocity.x * 0.2;

    if (swipe > SNAP_THRESHOLD && rightAction) {
      animate(x, ACTION_WIDTH, { type: "spring", stiffness: 300, damping: 30 });
      setTimeout(() => {
        rightAction.onAction();
        animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      }, 200);
    } else if (swipe < -SNAP_THRESHOLD && leftAction) {
      animate(x, -ACTION_WIDTH, { type: "spring", stiffness: 300, damping: 30 });
      setTimeout(() => {
        leftAction.onAction();
        animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      }, 200);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Right action (revealed on swipe right) */}
      {rightAction && (
        <motion.div
          className={`absolute inset-y-0 left-0 flex items-center justify-center ${actionConfig[rightAction.type].bg}`}
          style={{ width: ACTION_WIDTH, opacity: leftOpacity }}
        >
          <motion.div className="flex flex-col items-center gap-1 text-white" style={{ scale: leftScale }}>
            {(() => {
              const Icon = actionConfig[rightAction.type].icon;
              return <Icon className="h-5 w-5" />;
            })()}
            <span className="text-xs font-medium">{actionConfig[rightAction.type].label}</span>
          </motion.div>
        </motion.div>
      )}

      {/* Left action (revealed on swipe left) */}
      {leftAction && (
        <motion.div
          className={`absolute inset-y-0 right-0 flex items-center justify-center ${actionConfig[leftAction.type].bg}`}
          style={{ width: ACTION_WIDTH, opacity: rightOpacity }}
        >
          <motion.div className="flex flex-col items-center gap-1 text-white" style={{ scale: rightScale }}>
            {(() => {
              const Icon = actionConfig[leftAction.type].icon;
              return <Icon className="h-5 w-5" />;
            })()}
            <span className="text-xs font-medium">{actionConfig[leftAction.type].label}</span>
          </motion.div>
        </motion.div>
      )}

      {/* Draggable card content */}
      <motion.div
        className="relative z-10 bg-white"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: leftAction ? -ACTION_WIDTH : 0,
          right: rightAction ? ACTION_WIDTH : 0,
        }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(...args) => {
          setIsDragging(false);
          handleDragEnd(...args);
        }}
        onPointerDownCapture={(e) => {
          if (isDragging) e.stopPropagation();
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
