'use client';

import { css } from '_panda/css';

import { OrderTypeSelect, SortDirectionSelect } from '../SearchOption';
import { useSearchOptions } from '../useSearchOptions';

import { PersonaSearch } from './PersonaSearch';

export function DefaultTabRight() {
  const { searchOptions, onSearchOptionChange } = useSearchOptions();

  return (
    <div className={divCss}>
      <OrderTypeSelect onSelect={(option) => onSearchOptionChange('orderType', option)} />
      <SortDirectionSelect onSelect={(option) => onSearchOptionChange('sortDirection', option)} />
      {/* <PersonaType
        onSelect={(option) => onSearchOptionChange('personaType', option)}
        selected={searchOptions.personaType}
      /> */}
      <PersonaSearch
        onSelect={(option) => onSearchOptionChange('personaType', option)}
        selected={searchOptions.personaType}
      />
    </div>
  );
}

const divCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});
