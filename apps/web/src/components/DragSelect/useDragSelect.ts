import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface DragSelectItem {
  id: string;
  element: HTMLElement;
}

export interface DragSelectOptions<T> {
  items: T[];
  getItemId: (item: T) => string;
  onSelectionStart?: () => void;
  onSelectionChange?: (selectedItems: T[]) => void;
  onSelectionEnd?: (selectedItems: T[]) => void;
  isEnabled?: boolean;
  selectionProps?: {
    style?: React.CSSProperties;
  };
}

export interface DragSelectReturn<T> {
  containerRef: React.RefObject<HTMLDivElement>;
  isDragging: boolean;
  draggingItemIds: string[];
  DragSelection: React.ComponentType;
}

export function useDragSelect<T>({
  items,
  getItemId,
  onSelectionStart,
  onSelectionChange,
  onSelectionEnd,
  isEnabled = true,
  selectionProps = {
    style: {
      background: 'rgba(0, 123, 255, 0.1)',
      border: '1px solid rgba(0, 123, 255, 0.3)',
      borderRadius: '4px',
    },
  },
}: DragSelectOptions<T>): DragSelectReturn<T> {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingItemIds, setDraggingItemIds] = useState<string[]>([]);
  const [selectionBox, setSelectionBox] = useState<{ left: number; top: number; width: number; height: number } | null>(
    null,
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const dragThresholdExceeded = useRef(false);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isEnabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setIsMouseDown(true);
      setStartPos({ x, y });
      dragThresholdExceeded.current = false;
      // 드래그 상태는 실제로 움직임이 감지될 때 설정
    },
    [isEnabled],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMouseDown || !startPos || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const deltaX = Math.abs(currentX - startPos.x);
      const deltaY = Math.abs(currentY - startPos.y);
      const DRAG_THRESHOLD = 5; // 5px 이상 움직여야 드래그로 인식

      // 드래그 임계값을 넘었는지 확인
      if (!dragThresholdExceeded.current && (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD)) {
        dragThresholdExceeded.current = true;
        setIsDragging(true);
        setDraggingItemIds([]);
        onSelectionStart?.();
        // 이제부터 기본 동작 방지
        e.preventDefault();
      }

      // 드래그 임계값을 넘지 않았으면 아무것도 하지 않음 (클릭으로 처리)
      if (!dragThresholdExceeded.current) return;

      // 드래그 중 기본 동작 방지
      e.preventDefault();

      const left = Math.min(startPos.x, currentX);
      const top = Math.min(startPos.y, currentY);
      const width = Math.abs(currentX - startPos.x);
      const height = Math.abs(currentY - startPos.y);

      const box = { left, top, width, height };
      setSelectionBox(box);

      // 선택된 요소들 찾기
      const selectedElements = containerRef.current.querySelectorAll('[data-item-id]');
      const draggedItemIds: string[] = [];

      selectedElements.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        const elementLeft = elementRect.left - rect.left;
        const elementTop = elementRect.top - rect.top;
        const elementRight = elementLeft + elementRect.width;
        const elementBottom = elementTop + elementRect.height;

        // 박스와 요소가 교차하는지 확인
        if (left < elementRight && left + width > elementLeft && top < elementBottom && top + height > elementTop) {
          const itemId = element.getAttribute('data-item-id');
          if (itemId) {
            draggedItemIds.push(itemId);
          }
        }
      });

      setDraggingItemIds(draggedItemIds);

      // 드래그 중인 아이템들을 찾아서 콜백 호출
      const draggedItems = items.filter((item) => draggedItemIds.includes(getItemId(item)));
      onSelectionChange?.(draggedItems);
    },
    [isMouseDown, startPos, items, getItemId, onSelectionChange, onSelectionStart],
  );

  const handleMouseUp = useCallback(() => {
    if (!isMouseDown) return;

    const wasActuallyDragging = dragThresholdExceeded.current;

    setIsMouseDown(false);
    setStartPos(null);
    setSelectionBox(null);

    // 실제로 드래그한 경우에만 처리
    if (wasActuallyDragging) {
      if (draggingItemIds.length === 0) {
        setIsDragging(false);
        setDraggingItemIds([]);
        onSelectionEnd?.([]);
        return;
      }

      // 드래그된 아이템들을 찾아서 콜백 호출
      const draggedItems = items.filter((item) => draggingItemIds.includes(getItemId(item)));
      onSelectionEnd?.(draggedItems);

      // 드래그 상태 초기화
      setIsDragging(false);
      setDraggingItemIds([]);
    }

    // 임계값 초기화
    dragThresholdExceeded.current = false;
  }, [isMouseDown, draggingItemIds, items, getItemId, onSelectionEnd]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const DragSelection = useCallback(() => {
    if (!selectionBox) return null;

    return React.createElement('div', {
      style: {
        position: 'absolute',
        left: selectionBox.left,
        top: selectionBox.top,
        width: selectionBox.width,
        height: selectionBox.height,
        zIndex: 9999,
        ...selectionProps.style,
      },
    });
  }, [selectionBox, selectionProps.style]);

  return {
    containerRef,
    isDragging,
    draggingItemIds,
    DragSelection,
  };
}
