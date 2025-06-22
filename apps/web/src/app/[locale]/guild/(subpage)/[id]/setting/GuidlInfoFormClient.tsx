'use client';

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { TextArea, TextField, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@gitanimals/ui-panda';
import { InfoIcon } from 'lucide-react';

import { getBackgroundImage } from '@/utils/image';

export interface FormState {
  message: string;
}

interface GuildInfoFormProps {
  icons: string[];
  backgrounds: string[];
  onFieldChange: (key: string, value: string | boolean) => void;
  fields: {
    title: string;
    body: string;
    guildIcon: string;
    farmType: string;
    autoJoin: boolean;
  };
  setFormError?: (error: Record<string, string>) => void;
  formError?: Record<string, string>;
}

export function GuildInfoFormClient({ setFormError, formError, ...props }: GuildInfoFormProps) {
  const t = useTranslations();

  return (
    <>
      <Flex flexDirection="column" gap="24px">
        <div>
          <p className={headingStyle}>Guild Information</p>
          <div className={css({ position: 'relative' })}>
            <TextField
              placeholder="Enter guild name"
              value={props.fields.title}
              onChange={(e) => {
                setFormError?.({ title: '' });
                const value = e.target.value
                  .replace(/[^a-zA-Z-]/g, '')
                  .replace(/-+/g, '-')
                  .replace(/^-|-$/g, '');
                if (value !== e.target.value) {
                  setFormError?.({ title: t('Guild.invalid-guild-name') });
                  console.log('setFormError: ', setFormError);
                }
                props.onFieldChange('title', e.target.value);
              }}
              error={formError?.title}
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
            placeholder="Enter guild description"
            value={props.fields.body}
            onChange={(e) => props.onFieldChange('body', e.target.value)}
            className={css({ mt: '6px' })}
          />
        </div>
        <div className={joinSettingStyle}>
          <div>
            <p className={headingStyle}>Guild Join Settings</p>
            <p>Configure how users can join your guild.</p>
          </div>
          <div>
            <button
              className={cx(
                joinSettingButtonStyle,
                !props.fields.autoJoin ? joinSettingButtonSelectedStyle : joinSettingButtonNotSelectedStyle,
              )}
              onClick={() => props.onFieldChange('autoJoin', false)}
            >
              Approval Required
            </button>
            <button
              className={cx(
                joinSettingButtonStyle,
                props.fields.autoJoin ? joinSettingButtonSelectedStyle : joinSettingButtonNotSelectedStyle,
              )}
              onClick={() => props.onFieldChange('autoJoin', true)}
            >
              Auto Join
            </button>
          </div>
        </div>
        <div>
          <p className={headingStyle}>Guild Icon</p>
          <Flex gap="6px" className={css({ _mobile: { flexWrap: 'wrap' } })}>
            {props.icons?.map((icon) => (
              <button
                onClick={() => props.onFieldChange('guildIcon', icon)}
                key={icon}
                className={props.fields.guildIcon === icon ? selectedStyle : unselectedStyle}
              >
                <img src={icon} className={itemStyle} width={70} height={70} key={icon} alt={icon} />
              </button>
            ))}
          </Flex>
        </div>
        <div>
          <p className={headingStyle}>Guild background</p>
          <Flex gap="6px" className={css({ _mobile: { flexWrap: 'wrap' } })}>
            {props.backgrounds?.map((background) => (
              <button
                onClick={() => props.onFieldChange('farmType', background)}
                key={background}
                className={props.fields.farmType === background ? selectedStyle : unselectedStyle}
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

const headingStyle = css({
  textStyle: 'glyph14.bold',
  mb: 2,
});

const itemStyle = css({
  borderColor: 'white.white_90',
  borderRadius: '8px',
  border: 'none',
});

const tooltipStyle = css({
  position: 'absolute',
  top: '18px',
  right: '14px  ',
  height: 'fit-content',
});

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

const joinSettingStyle = css({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const joinSettingButtonStyle = css({
  border: '1px solid',
  borderRadius: '6px',
  padding: '8px 16px',
  textStyle: 'glyph14.regular',
  transition: 'all 0.1s ease-in-out',
  _last: {
    ml: 1,
  },
});

const joinSettingButtonNotSelectedStyle = css({
  background: 'white.white_10',
  borderColor: 'white.white_10',
  color: 'white.white_25',
});

const joinSettingButtonSelectedStyle = css({
  background: 'white.white_25',
  borderColor: 'white.white_50',
  color: 'white',
});
