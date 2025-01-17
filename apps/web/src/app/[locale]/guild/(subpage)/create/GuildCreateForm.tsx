'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { guildQueries } from '@gitanimals/react-query';
import { TextArea, TextField, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@gitanimals/ui-panda';
import { useQuery } from '@tanstack/react-query';
import { InfoIcon } from 'lucide-react';

import { getBackgroundImage } from '@/utils/image';

export interface GuildCreateFormProps {
  formData: Record<string, string>;
  onDataChange: (key: string, value: string) => void;
  error: Record<string, string>;
  setError: (error: Record<string, string>) => void;
}

export function GuildCreateForm({ formData, onDataChange, error, setError }: GuildCreateFormProps) {
  const t = useTranslations();

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
          <div className={css({ position: 'relative' })}>
            <TextField
              placeholder="Type guild name"
              onChange={(e) => {
                //
                const value = e.target.value
                  .replace(/[^a-zA-Z0-9-]/g, '')
                  .replace(/-+/g, '-')
                  .replace(/^-|-$/g, '');
                if (value !== e.target.value) {
                  setError({ title: t('Guild.invalid-guild-name') });
                  return;
                }
                onDataChange('title', e.target.value);
              }}
              error={error.title}
            />
            <div className={tooltipStyle}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon size={20} color="#FFFFFF80" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <li>Only english & hyphen</li>
                    <li>50 characters</li>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <TextArea
            placeholder="Type guild description"
            onChange={(e) => onDataChange('body', e.target.value)}
            className={css({ mt: '6px' })}
          />
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

const tooltipStyle = css({
  position: 'absolute',
  top: 0,
  right: '14px  ',
  bottom: 0,
  margin: 'auto',
  height: 'fit-content',
});
