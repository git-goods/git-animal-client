'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

import { FarmPersonaSelect } from './FarmPersonaSelect';

export function FarmType() {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();

  const [selectPersonaStatus, setSelectPersonaStatus] = useState<'loading' | 'success' | 'error'>('loading');

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
          <GitanimalsFarm imageKey={selectPersonaStatus} sizes={[600, 300]} />
        </div>
        <Button onClick={onLinkCopy} mt={16} size="m">
          {t('copy-link-title')}
        </Button>
      </div>
      <FarmPersonaSelect onChangeStatus={setSelectPersonaStatus} />
    </div>
  );
}

const farmSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100%',
  py: 40,
  gap: 40,

  _mobile: {
    background: 'none',
    maxHeight: 'auto',
    height: 'auto',
    overflowY: 'auto',
    borderRadius: 0,
  },
});

const farmStyle = css({ borderRadius: '12px', overflow: 'hidden', width: 'fit-content', mt: 24 });
