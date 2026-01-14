'use client';

import { useState } from 'react';
import React from 'react';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { auctionQueries } from '@gitanimals/react-query';
import { cn, Dialog, Banner } from '@gitanimals/ui-tailwind';
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

const buttonWrapperStyle = cn(
  'flex items-center justify-center',
  'w-9 h-9 bg-white/25 rounded-[10px]'
);

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
          <Dialog.Content size="large" className="flex flex-col items-center justify-center">
            <Dialog.Title>Select Find Persona</Dialog.Title>
            <div className={cn(
              'flex justify-start w-full mb-4',
              'max-mobile:mb-0 max-mobile:my-6'
            )}>
              {selected && (
                <div className={cn(
                  'font-product text-glyph-16 font-bold text-white/90',
                  'rounded-lg bg-white/25 h-9',
                  'flex gap-0.5 items-center px-2',
                  'max-mobile:text-glyph-12 max-mobile:font-normal max-mobile:text-white/50',
                  'max-mobile:h-[30px] max-mobile:px-3'
                )}>
                  <span>Selected Persona</span>
                  <span>{selected}</span>
                  <button onClick={() => onSelect('')}>
                    <XIcon width={20} height={20} color="#ffffff5d" />
                  </button>
                </div>
              )}
            </div>
            <div className={cn('flex-1 overflow-auto gap-1 justify-center', customScrollStyle)}>
              {Object.values(EVENT).map((event) => (
                <React.Fragment key={event.label}>
                  <h4 className={cn(
                    'font-product text-glyph-18 font-bold text-white text-left my-3',
                    'max-mobile:text-glyph-16'
                  )}>
                    {event.label}
                  </h4>
                  <div className="flex flex-wrap gap-1">
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
                  <h4 className={cn(
                    'font-product text-glyph-18 font-bold text-white text-left my-3',
                    'max-mobile:text-glyph-16'
                  )}>
                    Other
                  </h4>
                  <div className="flex flex-wrap gap-1">
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
