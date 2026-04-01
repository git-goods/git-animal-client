'use client';

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { TextArea, TextField, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@gitanimals/ui-tailwind';
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
      <div className="flex flex-col gap-6">
        <div>
          <p className={headingStyle}>Guild Information</p>
          <div className="relative">
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
            className="mt-1.5"
          />
        </div>
        <div className={joinSettingStyle}>
          <div>
            <p className={headingStyle}>Guild Join Settings</p>
            <p>Configure how users can join your guild.</p>
          </div>
          <div>
            <button
              className={cn(
                joinSettingButtonStyle,
                !props.fields.autoJoin ? joinSettingButtonSelectedStyle : joinSettingButtonNotSelectedStyle,
              )}
              onClick={() => props.onFieldChange('autoJoin', false)}
            >
              Approval Required
            </button>
            <button
              className={cn(
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
          <div className={cn('flex gap-1.5', 'max-mobile:flex-wrap')}>
            {props.icons?.map((icon) => (
              <button
                onClick={() => props.onFieldChange('guildIcon', icon)}
                key={icon}
                className={props.fields.guildIcon === icon ? selectedStyle : unselectedStyle}
              >
                <img src={icon} className={itemStyle} width={70} height={70} key={icon} alt={icon} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className={headingStyle}>Guild background</p>
          <div className={cn('flex gap-1.5', 'max-mobile:flex-wrap')}>
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
          </div>
        </div>
      </div>
    </>
  );
}

const headingStyle = cn(
  'font-product text-glyph-14 font-bold mb-2'
);

const itemStyle = cn(
  'border-white/90 rounded-lg border-none'
);

const tooltipStyle = cn(
  'absolute top-[18px] right-3.5 h-fit'
);

const selectedStyle = cn(
  'border border-solid rounded-lg opacity-100'
);

const unselectedStyle = cn(
  'border-none rounded-lg opacity-40',
  'transition-opacity duration-100 ease-in-out'
);

const joinSettingStyle = cn(
  'flex gap-2.5 items-center justify-between'
);

const joinSettingButtonStyle = cn(
  'border border-solid rounded-md px-4 py-2',
  'font-product text-glyph-14',
  'transition-all duration-100 ease-in-out',
  'last:ml-1'
);

const joinSettingButtonNotSelectedStyle = cn(
  'bg-white/10 border-white/10 text-white/25'
);

const joinSettingButtonSelectedStyle = cn(
  'bg-white/25 border-white/50 text-white'
);
