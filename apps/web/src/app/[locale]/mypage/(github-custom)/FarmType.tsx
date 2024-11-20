'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
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
      await copyClipBoard(
        getGitanimalsFarmString({
          username: name,
        }),
      );

      toast.success('복사 성공!', { duration: 2000 });
    } catch (error) {}
  };

  return (
    <div className={farmSectionStyle}>
      <div>
        <div className={farmStyle}>
          <GitanimalsFarm imageKey={status} sizes={[600, 300]} />
        </div>
        <Button onClick={onLinkCopy} mt={4} size="m">
          {t('copy-link-title')}
        </Button>
      </div>
      <FarmPersonaSelect onChangeStatus={setStatus} />
      <FarmBackgroundSelect onChangeStatus={setStatus} />
    </div>
  );
}

const farmSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100%',
  py: '40px',
  gap: '40px',

  _mobile: {
    background: 'none',
    maxHeight: 'auto',
    height: 'auto',
    overflowY: 'auto',
    borderRadius: 0,
  },
});

const farmStyle = css({ borderRadius: '12px', overflow: 'hidden', width: 'fit-content', mt: '24px' });
