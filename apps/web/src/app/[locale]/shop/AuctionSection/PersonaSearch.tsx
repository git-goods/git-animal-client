'use client';

import { memo, useState } from 'react';
import { css } from '_panda/css';
import { center } from '_panda/patterns';
import { Banner } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoaderIcon, SearchIcon } from 'lucide-react';

import { Modal } from '@/components/Modal/Modal2';
import { useProductTypesQueryOptions } from '@/lib/react-query/auction';
import { getPersonaImage } from '@/utils/image';

interface PersonaSearchProps {
  onSelect: (personaType?: string) => void;
  selected?: string;
}

const buttonWrapperStyle = center({
  w: 36,
  h: 36,
  backgroundColor: 'white.white_25',
  borderRadius: 10,
});

export const PersonaSearch = memo(
  wrap
    .ErrorBoundary({ fallback: <></> })
    .Suspense({
      fallback: (
        <button className={buttonWrapperStyle}>
          {/* <SearchIcon color="rgba(255, 255, 255, 0.5)" /> */}
          <LoaderIcon />
        </button>
      ),
    })

    .on(function PersonaSearch({ onSelect, selected }: PersonaSearchProps) {
      const [isOpen, setIsOpen] = useState(false);

      const { data } = useSuspenseQuery(useProductTypesQueryOptions);

      const onClick = (personaType: string) => {
        onSelect(personaType);
        setIsOpen(false);
      };

      return (
        <>
          <button className={buttonWrapperStyle} onClick={() => setIsOpen(true)}>
            <SearchIcon color="rgba(255, 255, 255, 0.5)" width={20} height={20} />
          </button>

          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onOutsideClick={() => setIsOpen(false)}>
            <div className={containerStyle}>
              <h3 className={headingStyle}>Select Find Persona</h3>
              <div className={contentStyle}>
                {data?.productTypes.map((type) => (
                  <button key={type.name} onClick={() => onClick(type.name)}>
                    <Banner image={getPersonaImage(type.name)} selected={selected === type.name} />
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        </>
      );
    }),
);

const containerStyle = css({
  width: '100%',
  height: '100%',
  padding: '50px 0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 40,

  '@media (max-width: 1200px)': {
    padding: 0,
  },
});
const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',

  '@media (max-width: 1200px)': {
    textStyle: 'glyph32.bold',
  },
});

const contentStyle = css({
  flex: 1,
  overflow: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  justifyContent: 'center',
});
