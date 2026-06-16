'use client';

import React, { useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { Github } from 'lucide-react';
import { overlay } from 'overlay-kit';

import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { trackEvent } from '@/lib/analytics';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

import { FarmBackgroundSelect } from './FarmBackgroundSelect';
import { FarmPersonaSelect } from './FarmPersonaSelect';
import { GithubGuideModal } from './GithubGuideModal';

export function FarmType() {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();

  const [imageKey, refreshImage] = useReducer((x: number) => x + 1, 0);

  const onPublish = async () => {
    const code = getGitanimalsFarmString({ username: name });
    try {
      await copyClipBoard(code);
    } catch {}
    trackEvent('github_guide_opened', { type: 'farm' });
    overlay.open(({ isOpen, close }) => (
      <GithubGuideModal isOpen={isOpen} onClose={close} username={name} code={code} type="farm" />
    ));
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
          <Button size="s" className={publishButtonStyle} onClick={onPublish}>
            <Github size={16} />
            {t('GithubGuide.upload-button')}
          </Button>
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

const publishButtonStyle = css({
  position: 'absolute',
  top: '12px',
  right: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  whiteSpace: 'nowrap',
});
