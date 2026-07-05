'use client';

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import {
  cn,
  TextArea,
  TextField,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@gitanimals/ui-tailwind';
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
      <div className="flex flex-col gap-[24px]">
        <div>
          <p className="glyph14-bold mb-2">Guild Information</p>
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
            <div className="absolute top-[18px] right-[14px] h-fit">
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
            className="mt-[6px]"
          />
        </div>
        <div className="flex gap-[10px] items-center justify-between">
          <div>
            <p className="glyph14-bold mb-2">Guild Join Settings</p>
            <p>Configure how users can join your guild.</p>
          </div>
          <div>
            <button
              className={cn(
                'border border-solid rounded-[6px] py-[8px] px-[16px] glyph14-regular transition-all duration-100 ease-in-out last:ml-1',
                !props.fields.autoJoin
                  ? 'bg-white-25 border-white-50 text-white'
                  : 'bg-white-10 border-white-10 text-white-25',
              )}
              onClick={() => props.onFieldChange('autoJoin', false)}
            >
              Approval Required
            </button>
            <button
              className={cn(
                'border border-solid rounded-[6px] py-[8px] px-[16px] glyph14-regular transition-all duration-100 ease-in-out last:ml-1',
                props.fields.autoJoin
                  ? 'bg-white-25 border-white-50 text-white'
                  : 'bg-white-10 border-white-10 text-white-25',
              )}
              onClick={() => props.onFieldChange('autoJoin', true)}
            >
              Auto Join
            </button>
          </div>
        </div>
        <div>
          <p className="glyph14-bold mb-2">Guild Icon</p>
          <div className="flex gap-[6px] mobile:flex-wrap">
            {props.icons?.map((icon) => (
              <button
                onClick={() => props.onFieldChange('guildIcon', icon)}
                key={icon}
                className={
                  props.fields.guildIcon === icon
                    ? 'border-[1.5px] border-solid rounded-[8px] opacity-100'
                    : 'border-none rounded-[8px] opacity-40 transition-opacity duration-100 ease-in-out'
                }
              >
                <img
                  src={icon}
                  className="border-white-90 rounded-[8px] border-none"
                  width={70}
                  height={70}
                  key={icon}
                  alt={icon}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="glyph14-bold mb-2">Guild background</p>
          <div className="flex gap-[6px] mobile:flex-wrap">
            {props.backgrounds?.map((background) => (
              <button
                onClick={() => props.onFieldChange('farmType', background)}
                key={background}
                className={
                  props.fields.farmType === background
                    ? 'border-[1.5px] border-solid rounded-[8px] opacity-100'
                    : 'border-none rounded-[8px] opacity-40 transition-opacity duration-100 ease-in-out'
                }
              >
                <img
                  src={getBackgroundImage(background)}
                  className="border-white-90 rounded-[8px] border-none"
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
