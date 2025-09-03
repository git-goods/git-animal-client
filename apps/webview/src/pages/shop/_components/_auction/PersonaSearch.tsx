'use client';

import { useState } from 'react';
import React from 'react';
import { css, cx } from '_panda/css';
import { center } from '_panda/patterns';
import { auctionQueries } from '@gitanimals/react-query';
import { Banner, Dialog } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoaderIcon, SearchIcon, XIcon } from 'lucide-react';

import { customScrollStyle } from '@/styles/scrollStyle';
import { getPersonaImage } from '@/utils/image';

const EVENT = {
  CHRISTMAS: {
    label: 'Christmas 2024 🎄',
    personaTypeList: [
      'SNOWMAN',
      'DESSERT_FOX_RUDOLPH',
      'LITTLE_CHICK_SANTA',
      'RABBIT_BROWN_RUDOLPH',
      'SNOWMAN_MELT',
      'HAMSTER_SANTA',
    ],
  },
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

    const eventPersonaTypeList = Object.values(EVENT).flatMap((event) => event.personaTypeList);
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

        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <Dialog.Content size="large" className={containerStyle}>
            <Dialog.Title>Select Find Persona</Dialog.Title>
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
                        <Banner
                          size="small"
                          image={getPersonaImage(type)}
                          status={selected === type ? 'selected' : 'default'}
                        />
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
                        <Banner
                          size="small"
                          image={getPersonaImage(type.name)}
                          status={selected === type.name ? 'selected' : 'default'}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Dialog.Content>
        </Dialog>
      </>
    );
  });

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const selectedPersonaWrapperStyle = css({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  marginBottom: '16px',

  _mobile: {
    mb: 0,
    margin: '24px 0',
  },
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

  _mobile: {
    textStyle: 'glyph12.regular',
    color: 'white.white_50',
    h: '30px',
    px: '12px',
  },
});

const contentStyle = cx(
  css({
    flex: 1,
    overflow: 'auto',
    gap: '4px',
    justifyContent: 'center',
  }),
  customScrollStyle,
);

const personaListHeadingStyle = css({
  textStyle: 'glyph18.bold',
  color: 'white',
  textAlign: 'left',
  my: '12px',

  _mobile: {
    textStyle: 'glyph16.bold',
  },
});

const personaListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
});
