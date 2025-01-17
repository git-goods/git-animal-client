'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { guildQueries } from '@gitanimals/react-query';
import { TextArea, TextField } from '@gitanimals/ui-panda';
import { useQuery } from '@tanstack/react-query';

import { getBackgroundImage } from '@/utils/image';

export interface GuildCreateFormProps {
  formData: Record<string, string>;
  onDataChange: (key: string, value: string) => void;
}

export function GuildCreateForm({ formData, onDataChange }: GuildCreateFormProps) {
  const { data: icons } = useQuery(guildQueries.getGuildIconsOptions());
  const { data: backgrounds } = useQuery(guildQueries.getGuildBackgroundsOptions());

  useEffect(() => {
    if (icons && icons.length > 0 && !formData.icon) {
      onDataChange('icon', icons[0]);
    }
    if (backgrounds && backgrounds.length > 0 && !formData.background) {
      onDataChange('background', backgrounds[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icons, backgrounds]);

  return (
    <>
      <Flex flexDirection="column" gap="24px">
        <div>
          <p className={headingStyle}>Guild info</p>
          <TextField
            placeholder="Type guild name"
            className={css({ mb: '6px' })}
            onChange={(e) => onDataChange('title', e.target.value)}
          />
          <TextArea placeholder="Type guild description" onChange={(e) => onDataChange('body', e.target.value)} />
        </div>
        <div>
          <p className={headingStyle}>Guild thumbnail</p>
          <Flex gap="6px">
            {icons?.map((icon) => (
              <button
                onClick={() => onDataChange('icon', icon)}
                key={icon}
                className={formData.icon === icon ? selectedStyle : unselectedStyle}
              >
                <img src={icon} className={itemStyle} width={70} height={70} key={icon} alt={icon} />
              </button>
            ))}
          </Flex>
        </div>
        <div>
          <p className={headingStyle}>Guild background</p>
          <Flex gap="6px">
            {backgrounds?.map((background) => (
              <button
                onClick={() => onDataChange('background', background)}
                key={background}
                className={formData.background === background ? selectedStyle : unselectedStyle}
              >
                <img
                  src={getBackgroundImage(background)}
                  className={itemStyle}
                  width={284}
                  height={124}
                  key={background}
                  alt={background}
                />
              </button>
            ))}
          </Flex>
        </div>
      </Flex>
    </>
  );
}

const selectedStyle = css({
  border: '1.5px solid',
  borderRadius: '8px',
  opacity: 1,
});

const unselectedStyle = css({
  border: 'none',
  borderRadius: '8px',
  opacity: 0.4,
  transition: 'opacity 0.1s ease-in-out',
});

const headingStyle = css({
  textStyle: 'glyph14.bold',
  mb: 2,
});

const itemStyle = css({
  borderColor: 'white.white_90',
  borderRadius: '8px',
});
