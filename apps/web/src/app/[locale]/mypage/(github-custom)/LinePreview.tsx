'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, cn, TextField } from '@gitanimals/ui-tailwind';
import { Github } from 'lucide-react';
import { toast } from 'sonner';

import { getGitanimalsLineString, GitanimalsLine } from '@/components/Gitanimals';
import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/hooks/clientAuth';

import { useGithubPublish } from './useGithubPublish';

const DEFAULT_SIZE = { width: 600, height: 120 };

export function LinePreview({ selectPersona }: { selectPersona: string | null }) {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();
  const publish = useGithubPublish();
  const [sizes, setSizes] = useState<{ width: number; height: number }>(DEFAULT_SIZE);

  const onPublish = () =>
    publish({
      code: getGitanimalsLineString({
        username: name,
        petId: selectPersona ?? undefined,
        sizes: [sizes.width, sizes.height],
      }),
      username: name,
      type: 'line',
    });

  return (
    <div className={cn(customScrollStyle, sectionContainerStyle)}>
      {/* TODO: 임시로 모바일에선 input 안보이게 처리 */}
      <SizeInputList onApply={(width, height) => setSizes({ width, height })} />
      <section>
        <div className={lineContainerStyle} style={{ width: sizes.width, height: sizes.height }}>
          <GitanimalsLine sizes={[sizes.width, sizes.height]} petId={selectPersona} />

          <Button size="s" className={publishButtonStyle} onClick={onPublish}>
            <Github size={16} />
            {t('GithubGuide.upload-button')}
          </Button>
        </div>
      </section>
    </div>
  );
}

const publishButtonStyle = 'absolute top-[12px] right-[12px] inline-flex items-center gap-[6px] whitespace-nowrap';

const sectionContainerStyle = 'flex flex-col gap-[24px] overflow-x-auto h-fit min-h-fit';

const lineContainerStyle =
  'w-full bg-white h-full transition-all duration-300 max-w-[1000px] rounded-[12px] relative [&_img]:max-w-full mobile:max-w-full';

function SizeInputList({ onApply }: { onApply: (width: number, height: number) => void }) {
  const t = useTranslations('Mypage');

  const [width, setWidth] = useState(DEFAULT_SIZE.width);
  const [height, setHeight] = useState(DEFAULT_SIZE.height);

  return (
    <div className={sizeInputStyle}>
      <h2 className="glyph18-bold text-white mb-[16px]">{t('customize-size')}</h2>
      <div className="flex gap-[12px]">
        <SizeInput value={width} onChange={(e) => setWidth(parseInt(e.target.value))} name="width" />
        <SizeInput value={height} onChange={(e) => setHeight(parseInt(e.target.value))} name="height" />
        <Button
          style={{ minWidth: 'fit-content' }}
          onClick={() => {
            if (width <= 0 || height <= 0) {
              toast.error(t('invalid-size-error'));
              return;
            }
            onApply(width, height);
          }}
        >
          {t('apply-button')}
        </Button>
      </div>
    </div>
  );
}

const sizeInputStyle = 'relative mobile:hidden';

function SizeInput(props: { value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string }) {
  const t = useTranslations('Mypage');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (isNaN(value)) {
      toast.error(t('invalid-size-error'));
      return;
    }

    if (value > 1000) {
      toast.error(t('line-set-error'));
      return;
    }

    props.onChange(e);
  };

  return <TextField type="number" name={props.name} id={props.name} value={props.value} onChange={onChange} />;
}
