'use client';

import { css } from '_panda/css';
import { Flex } from '_panda/jsx';

import { OrderTypeSelect, SortDirectionSelect } from '@/components/SortSelect';

import { useSearchOptions } from '../useSearchOptions';

import { PersonaSearch } from './PersonaSearch';

export function DefaultTabRight() {
  const { searchOptions, onSearchOptionChange } = useSearchOptions();

  return (
    <div className={containerStyle}>
      <Flex gap="4px" alignItems="center">
        <OrderTypeSelect onSelect={(option) => onSearchOptionChange('orderType', option)} />
        <SortDirectionSelect onSelect={(option) => onSearchOptionChange('sortDirection', option)} />
      </Flex>
      <PersonaSearch
        onSelect={(option) => onSearchOptionChange('personaType', option)}
        selected={searchOptions.personaType}
      />
    </div>
  );
}

const containerStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '4px',
  width: '100%',

  _mobile: {
    justifyContent: 'space-between',
  },
});
