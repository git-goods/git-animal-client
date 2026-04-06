'use client';

import { useState } from 'react';
import React from 'react';
import { auctionQueries } from '@gitanimals/react-query';
import { Banner, Dialog } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';
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
  selected?: string | null;
}

const buttonWrapperStyle =
  'flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/25';

const containerStyle = 'flex flex-col items-center justify-center';

const selectedPersonaWrapperStyle = 'mb-4 flex w-full justify-start max-mobile:my-6';

const selectedPersonaTagStyle =
  'flex h-9 items-center gap-0.5 rounded-lg bg-white/25 px-2 text-glyph-16 font-bold text-white/90 max-mobile:h-[30px] max-mobile:px-3 max-mobile:text-glyph-12 max-mobile:font-normal max-mobile:text-white/50';

const personaListHeadingStyle =
  'my-3 text-left text-glyph-18 font-bold text-white max-mobile:text-glyph-16';

const personaListStyle = 'flex flex-wrap gap-1';

export const PersonaSearch = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({
    fallback: (
      <button type="button" className={buttonWrapperStyle}>
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
        <button type="button" className={buttonWrapperStyle} onClick={() => setIsOpen(true)}>
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
                  <button type="button" onClick={() => onSelect('')}>
                    <XIcon width={20} height={20} color="#ffffff5d" />
                  </button>
                </div>
              )}
            </div>
            <div
              className={cn(
                'flex flex-1 flex-col justify-center gap-1 overflow-auto',
                customScrollStyle,
              )}
            >
              {Object.values(EVENT).map((event) => (
                <React.Fragment key={event.label}>
                  <h4 className={personaListHeadingStyle}>{event.label}</h4>
                  <div className={personaListStyle}>
                    {event.personaTypeList.map((type) => (
                      <button key={type} type="button" onClick={() => onClick(type)}>
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
                      <button key={type.name} type="button" onClick={() => onClick(type.name)}>
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
