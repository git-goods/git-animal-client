'use client';

import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import { SearchIcon } from 'lucide-react';
import { ComponentProps } from 'react';

export function SearchBar({ onSubmit, onKeyDown, ...props }: ComponentProps<'input'> & { onSubmit?: () => void }) {
  return (
    <div className={containerStyle}>
      <input
        type="text"
        {...props}
        className={cx(inputStyle, props.className)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit?.();
          }
          onKeyDown?.(e);
        }}
      />
      <button className={iconStyle} onClick={onSubmit}>
        <SearchIcon size={20} color="rgba(255, 255, 255, 0.5)" />
      </button>
    </div>
  );
}

const containerStyle = flex({
  width: '100%',
  height: '40px',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'white.white_25',
  flexShrink: 0,
  position: 'relative',
  transition: 'border-color 0.1s ease-in-out',
  _focusWithin: {
    borderColor: 'white.white_75',
  },
});

const inputStyle = css({
  width: '100%',
  height: '100%',
  border: 'none',
  outline: 'none',
  textStyle: 'glyph16.regular',
  padding: '8px 12px',
  color: 'white.white_75',
  _placeholder: {
    color: 'white.white_25',
  },
});

const iconStyle = css({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
});
