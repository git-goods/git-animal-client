'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';
import { cx } from '_panda/css';

const SelectableFormItemContext = createContext<{
  selected: string | null;
  onChange: (value: string) => void;
}>({
  selected: null,
  onChange: () => {},
});

const useSelectableFormItemContext = () => {
  const context = useContext(SelectableFormItemContext);
  if (!context) {
    throw new Error('useSelectableFormItem must be used within a SelectableFormItem');
  }
  return context;
};

interface SelectableFormItemProps {
  name: string;
  className?: string;
  defaultValue?: string;
}

/**
 * SelecableFormItem은 선택 가능한 폼 아이템을 만드는 컴포넌트입니다.
 *
 * @param props.name - 폼 데이터로 전송될 때 사용될 필드 이름
 */
export function SelectableFormItem(props: PropsWithChildren<SelectableFormItemProps>) {
  const [value, setValue] = useState<string | null>(props.defaultValue ?? null);

  const contextValue = {
    selected: value,
    onChange: (value: string) => setValue(value),
  };

  return (
    <SelectableFormItemContext.Provider value={contextValue}>
      <input type="text" name={props.name} className="display-none" value={value ?? ''} hidden />
      {props.children}
    </SelectableFormItemContext.Provider>
  );
}

interface SelectableFormItemOptionProps {
  className?: string;
  children: React.ReactNode | ((props: { isSelected: boolean }) => React.ReactNode);
  value: string;
}

/**
 * SelectableFormItemOption은 선택 가능한 폼 아이템의 옵션을 만드는 컴포넌트입니다.
 * 주의! children을 render pattern을 이용한 방법은 server component에서 사용이 불가능합니다.
 * 스타일을 위해서라면 _group을 이용해주세요 (ex, _groupActive)
 */
export function SelectableFormItemOption(props: SelectableFormItemOptionProps) {
  const { selected, onChange } = useSelectableFormItemContext();

  return (
    <button
      type="button"
      className={cx('selectable-form-item-option group', props.className)}
      onClick={() => onChange(props.value)}
      data-active={selected === props.value}
    >
      {typeof props.children === 'function' ? props.children({ isSelected: selected === props.value }) : props.children}
    </button>
  );
}
