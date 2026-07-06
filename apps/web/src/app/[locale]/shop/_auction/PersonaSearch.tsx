'use client';

import { useState } from 'react';
import React from 'react';
import { useIsMobile } from '@gitanimals/react';
import { auctionQueries } from '@gitanimals/react-query';
import { Banner, cn, Dialog } from '@gitanimals/ui-tailwind';
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

const buttonWrapperStyle = 'flex items-center justify-center w-[36px] h-[36px] bg-white-25 rounded-[10px]';

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
    const isMobile = useIsMobile();

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
                          size={isMobile ? 'small' : 'medium'}
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
                          size={isMobile ? 'small' : 'medium'}
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

const containerStyle = 'flex flex-col items-center justify-center';

const selectedPersonaWrapperStyle =
  'flex justify-start w-full mb-[16px] mobile:mb-0 mobile:mx-0 mobile:my-[24px]';

const selectedPersonaTagStyle =
  'glyph16-bold text-white-90 rounded-[8px] bg-[rgba(255,255,255,0.25)] h-[36px] flex gap-[2px] items-center px-[8px] mobile:glyph12-regular mobile:text-white-50 mobile:h-[30px] mobile:px-[12px]';

const contentStyle = cn('flex-1 overflow-auto gap-[4px] justify-center', customScrollStyle);

const personaListHeadingStyle = 'glyph18-bold text-white text-left my-[12px] mobile:glyph16-bold';

const personaListStyle = 'flex flex-wrap gap-[4px]';
