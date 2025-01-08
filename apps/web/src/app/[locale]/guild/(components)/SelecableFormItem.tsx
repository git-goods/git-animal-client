'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';
import { cx } from '_panda/css';

const SelecableFormItemContext = createContext<{
  selected: string | null;
  onChange: (value: string) => void;
}>({
  selected: null,
  onChange: () => {},
});

const useSelecableFormItemContext = () => {
  const context = useContext(SelecableFormItemContext);
  if (!context) {
    throw new Error('useSelecableFormItem must be used within a SelecableFormItem');
  }
  return context;
};

interface SelecableFormItemProps {
  name: string;
  className?: string;
}

/**
 * SelecableFormItem은 선택 가능한 폼 아이템을 만드는 컴포넌트입니다.
 *
 * @param props.name - 폼 데이터로 전송될 때 사용될 필드 이름
 */
export function SelecableFormItem(props: PropsWithChildren<SelecableFormItemProps>) {
  const [value, setValue] = useState<string | null>(null);

  console.log('value: ', value);

  const contextValue = {
    selected: value,
    onChange: (value: string) => setValue(value),
  };

  return (
    <SelecableFormItemContext.Provider value={contextValue}>
      <input type="text" name={props.name} className="display-none" />
      {props.children}
    </SelecableFormItemContext.Provider>
  );
}

interface SelecableFormItemOptionProps {
  className?: string;
  children: React.ReactNode | ((props: { isSelected: boolean }) => React.ReactNode);
  value: string;
}

/**
 * SelecableFormItemOption은 선택 가능한 폼 아이템의 옵션을 만드는 컴포넌트입니다.
 * 주의! children을 render pattern을 이용한 방법은 server component에서 사용이 불가능합니다.
 * 스타일을 위해서라면 _group을 이용해주세요 (ex, _groupActive)
 */
export function SelecableFormItemOption(props: SelecableFormItemOptionProps) {
  const { selected, onChange } = useSelecableFormItemContext();

  return (
    <button
      className={cx('selectable-form-item-option group', props.className)}
      onClick={() => onChange(props.value)}
      data-active={selected === props.value}
    >
      {typeof props.children === 'function' ? props.children({ isSelected: selected === props.value }) : props.children}
    </button>
  );
}
