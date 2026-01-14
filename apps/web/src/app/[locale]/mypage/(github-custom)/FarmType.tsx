'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { ClipboardIcon } from 'lucide-react';
import { toast } from 'sonner';

import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

import { FarmBackgroundSelect } from './FarmBackgroundSelect';
import { FarmPersonaSelect } from './FarmPersonaSelect';

export function FarmType() {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const onLinkCopy = async () => {
    try {
      await copyClipBoard(getGitanimalsFarmString({ username: name }));

      toast.success(t('copy-link-success'), { duration: 2000 });
    } catch (error) {}
  };

  return (
    <>
      <div>
        <div className="rounded-xl relative overflow-hidden w-fit">
          <GitanimalsFarm
            imageKey={status}
            className={cn(
              'w-[600px] aspect-[2/1]',
              'max-pc:w-[400px]',
              'max-tablet:w-[300px]',
              'max-mobile:w-full'
            )}
          />
          <button
            className={cn(
              'w-7 h-7 flex items-center justify-center',
              'bg-white/25 rounded-md',
              'absolute top-3 right-3 text-white'
            )}
            onClick={onLinkCopy}
          >
            <ClipboardIcon size={16} />
          </button>
        </div>
      </div>
      <div>
        <FarmPersonaSelect onChangeStatus={setStatus} />
      </div>
      <FarmBackgroundSelect onChangeStatus={setStatus} />
    </>
  );
}
