'use client';

import { useState } from 'react';
import React from 'react';
import { css } from '_panda/css';
import { center } from '_panda/patterns';
import { auctionQueries } from '@gitanimals/react-query';
import { Banner } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoaderIcon, SearchIcon, XIcon } from 'lucide-react';

import { Modal } from '@/components/Modal';
import { getPersonaImage } from '@/utils/image';

const EVENT = {
  HALLOWEEN: {
    label: 'Halloween 2024 🎃',
    personaTypeList: ['SLIME_PUMPKIN_1', 'SLIME_PUMPKIN_2', 'GHOST', 'GHOST_KING', 'SCREAM', 'SCREAM_GHOST'],
  },
};

interface PersonaSearchProps {
  onSelect: (personaType?: string) => void;
  selected?: string;
}

const buttonWrapperStyle = center({
  w: '36px',
  h: '36px',
  backgroundColor: 'white.white_25',
  borderRadius: '10px',
});

export const PersonaSearch = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({
    fallback: (
      <button className={buttonWrapperStyle}>
        <LoaderIcon />
      </button>
    ),
  })

  .on(function PersonaSearch({ onSelect, selected }: PersonaSearchProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useSuspenseQuery(auctionQueries.productTypesOptions());

    const eventPersonaTypeList = EVENT.HALLOWEEN.personaTypeList;
    const filteredPersonaTypeList = data?.productTypes.filter((type) => !eventPersonaTypeList.includes(type.name));

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
            <div className={selectedPersonaWrapperStyle}>
              {selected && (
                <div className={selectedPersonaTagStyle}>
                  <span>Selected Persona</span>
                  <span>{selected}</span>
                  <button onClick={() => onSelect('')}>
                    <XIcon width={20} height={20} color="#ffffff5d" />
                  </button>
                </div>
              )}
            </div>
            <div className={contentStyle}>
              {Object.values(EVENT).map((event) => (
                <React.Fragment key={event.label}>
                  <h4 className={personaListHeadingStyle}>{event.label}</h4>
                  <div className={personaListStyle}>
                    {event.personaTypeList.map((type) => (
                      <button key={type} onClick={() => onClick(type)}>
                        <Banner image={getPersonaImage(type)} selected={selected === type} />
                      </button>
                    ))}
                  </div>
                </React.Fragment>
              ))}
              {filteredPersonaTypeList && (
                <>
                  <h4 className={personaListHeadingStyle}>Other</h4>
                  <div className={personaListStyle}>
                    {filteredPersonaTypeList.map((type) => (
                      <button key={type.name} onClick={() => onClick(type.name)}>
                        <Banner image={getPersonaImage(type.name)} selected={selected === type.name} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      </>
    );
  });

const containerStyle = css({
  width: '100%',
  height: '100%',
  padding: '50px 0',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (max-width: 1200px)': {
    padding: 0,
  },
});

const headingStyle = css({
  textStyle: 'glyph48.bold',
  color: 'white',
  textAlign: 'center',
  marginBottom: '40px',

  '@media (max-width: 1200px)': {
    textStyle: 'glyph32.bold',
  },
});

const selectedPersonaWrapperStyle = css({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  marginBottom: '16px',
});

const selectedPersonaTagStyle = css({
  textStyle: 'glyph16.bold',
  color: 'white.white_90',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.25)',
  h: '36px',
  display: 'flex',
  gap: '2px',
  alignItems: 'center',
  px: '8px',
});

const contentStyle = css({
  flex: 1,
  overflow: 'auto',
  gap: '4px',
  justifyContent: 'center',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'gray.gray_500',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
});

const personaListHeadingStyle = css({
  textStyle: 'glyph18.bold',
  color: 'white',
  textAlign: 'left',
  my: '12px',
});

const personaListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
});
