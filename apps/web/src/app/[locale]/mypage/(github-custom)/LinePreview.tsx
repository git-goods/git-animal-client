'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { Button, TextField } from '@gitanimals/ui-tailwind';
import { ClipboardIcon } from 'lucide-react';
import { toast } from 'sonner';

import { getGitanimalsLineString, GitanimalsLine } from '@/components/Gitanimals';
import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

const DEFAULT_SIZE = { width: 600, height: 120 };

export function LinePreview({ selectPersona }: { selectPersona: string | null }) {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();
  const [sizes, setSizes] = useState<{ width: number; height: number }>(DEFAULT_SIZE);

  const onLinkCopy = async () => {
    try {
      await copyClipBoard(
        getGitanimalsLineString({
          username: name,
          petId: selectPersona ?? undefined,
          sizes: [sizes.width, sizes.height],
        }),
      );

      toast.success(t('copy-link-success'), { duration: 2000 });
    } catch (error) {}
  };

  return (
    <div className={cn(customScrollStyle, 'flex flex-col gap-6 overflow-x-auto h-fit min-h-fit')}>
      {/* TODO: 임시로 모바일에선 input 안보이게 처리 */}
      <SizeInputList onApply={(width, height) => setSizes({ width, height })} />
      <section>
        <div
          className={cn(
            'w-full bg-white h-full transition-all duration-300',
            'max-w-[1000px] rounded-xl relative',
            '[&_img]:max-w-full',
            'max-mobile:max-w-full'
          )}
          style={{ width: sizes.width, height: sizes.height }}
        >
          <GitanimalsLine sizes={[sizes.width, sizes.height]} petId={selectPersona} />

          <button
            className={cn(
              'w-7 h-7 flex items-center justify-center',
              'bg-black/25 rounded-md',
              'absolute top-3 right-3 text-white'
            )}
            onClick={onLinkCopy}
          >
            <ClipboardIcon size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

function SizeInputList({ onApply }: { onApply: (width: number, height: number) => void }) {
  const t = useTranslations('Mypage');

  const [width, setWidth] = useState(DEFAULT_SIZE.width);
  const [height, setHeight] = useState(DEFAULT_SIZE.height);

  return (
    <div
      className={cn(
        'relative',
        '[&_.heading]:font-product [&_.heading]:text-glyph-18 [&_.heading]:font-bold',
        '[&_.heading]:text-white [&_.heading]:mb-4',
        'max-mobile:hidden'
      )}
    >
      <h2 className="heading">{t('customize-size')}</h2>
      <div className="flex gap-3">
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
