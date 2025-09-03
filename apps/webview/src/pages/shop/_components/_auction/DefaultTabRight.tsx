'use client';

import { Flex } from '_panda/jsx';

import { OrderTypeSelect, SortDirectionSelect } from '@/components/SortSelect';

import { useSearchOptions } from './useSearchOptions';

import { PersonaSearch } from './PersonaSearch';

export function DefaultTabRight() {
  const { searchOptions, onSearchOptionChange } = useSearchOptions();

  return (
    <Flex gap="4px" alignItems="center">
      <OrderTypeSelect onSelect={(option) => onSearchOptionChange('orderType', option)} />
      <SortDirectionSelect onSelect={(option) => onSearchOptionChange('sortDirection', option)} />
      <PersonaSearch
        onSelect={(option) => onSearchOptionChange('personaType', option)}
        selected={searchOptions.personaType}
      />
    </Flex>
  );
}
