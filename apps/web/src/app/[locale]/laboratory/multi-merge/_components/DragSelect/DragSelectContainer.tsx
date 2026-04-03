import React from 'react';

import type { DragSelectOptions } from './useDragSelect';
import { useDragSelect } from './useDragSelect';

import './DragSelect.css';

const dragSelectContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
};

export interface DragSelectContainerProps<T> extends DragSelectOptions<T> {
  renderItem: (
    item: T,
    props: {
      isDragging: boolean;
      isSelected: boolean;
    },
  ) => React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export function DragSelectContainer<T>({
  renderItem,
  className,
  itemClassName,
  ...dragSelectOptions
}: DragSelectContainerProps<T>) {
  const dragSelectProps = useDragSelect(dragSelectOptions);

  return (
    <div
      ref={dragSelectProps.containerRef}
      style={dragSelectContainerStyle}
      className={`drag-select-container ${dragSelectProps.isDragging ? 'dragging' : ''} ${className || ''}`}
    >
      <dragSelectProps.DragSelection />
      {dragSelectOptions.items.map((item) => {
        const itemId = dragSelectOptions.getItemId(item);
        const isSelected = dragSelectProps.draggingItemIds.includes(itemId);

        return (
          <div
            key={itemId}
            data-item-id={itemId}
            className={itemClassName}
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              WebkitTouchCallout: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {renderItem(item, {
              isDragging: dragSelectProps.isDragging,
              isSelected,
            })}
          </div>
        );
      })}
    </div>
  );
}
