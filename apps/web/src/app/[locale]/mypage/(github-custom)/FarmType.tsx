'use client';

import React, { useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-tailwind';
import { Github } from 'lucide-react';

import { getGitanimalsFarmString, GitanimalsFarm } from '@/components/Gitanimals';
import { useClientUser } from '@/utils/clientAuth';

import { FarmBackgroundSelect } from './FarmBackgroundSelect';
import { FarmPersonaSelect } from './FarmPersonaSelect';
import { useGithubPublish } from './useGithubPublish';

export function FarmType() {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();
  const publish = useGithubPublish();

  const [imageKey, refreshImage] = useReducer((x: number) => x + 1, 0);

  const onPublish = () => publish({ code: getGitanimalsFarmString({ username: name }), username: name, type: 'farm' });

  return (
    <>
      <div>
        <div className={farmStyle}>
          <GitanimalsFarm
            imageKey={String(imageKey)}
            className="w-[600px] aspect-[2/1] pc:w-[400px] tablet:w-[300px] mobile:w-full"
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

const farmStyle = 'rounded-[12px] relative overflow-hidden w-fit';

const publishButtonStyle = 'absolute top-[12px] right-[12px] inline-flex items-center gap-[6px] whitespace-nowrap';
