'use client';

import React, { useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
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

  const [imageKey, refreshImage] = useReducer((x: number) => x + 1, 0);

  const onLinkCopy = async () => {
    try {
      await copyClipBoard(getGitanimalsFarmString({ username: name }));

      toast.success(t('copy-link-success'), { duration: 2000 });
    } catch (error) {}
  };

  return (
    <>
      <div>
        <div className={farmStyle}>
          <GitanimalsFarm
            imageKey={String(imageKey)}
            className={css({
              width: '600px',
              aspectRatio: '2/1',
              _pc: { width: '400px' },
              _tablet: { width: '300px' },
              _mobile: { width: '100%' },
            })}
          />
          <button
            className={css({
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white.white_25',
              borderRadius: '6px',
              position: 'absolute',
              top: '12px',
              right: '12px',
              color: 'white',
            })}
            onClick={onLinkCopy}
          >
            <ClipboardIcon size={16} />
          </button>
        </div>
      </div>
      <div>
        <FarmPersonaSelect onImageRefresh={refreshImage} />
      </div>
      <FarmBackgroundSelect onImageRefresh={refreshImage} />
    </>
  );
}

const farmStyle = css({ borderRadius: '12px', position: 'relative', overflow: 'hidden', width: 'fit-content' });
