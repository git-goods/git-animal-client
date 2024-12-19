'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { Button, TextField } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import { getGitanimalsLineString, GitanimalsLine } from '@/components/Gitanimals';
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

      toast.success('복사 성공!', { duration: 2000 });
    } catch (error) { }
  };

  return (
    <div className={sectionContainerStyle}>
      {/* TODO: 임시로 모바일에선 input 안보이게 처리 */}
      <SizeInputList onApply={(width, height) => setSizes({ width, height })} />
      <section>
        <div className={lineContainerStyle} style={{ width: sizes.width, height: sizes.height }}>
          <GitanimalsLine sizes={[sizes.width, sizes.height]} petId={selectPersona} />
        </div>
        <Button onClick={onLinkCopy} mt={4} size="m">
          {t('copy-link-title')}
        </Button>
      </section>
    </div>
  );
}

const sectionContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  overflowX: 'scroll',
});

const lineContainerStyle = css({
  width: '100%',
  background: 'white',
  height: '100%',
  transition: 'all 0.3s',
  maxWidth: '1000px',
  borderRadius: '12px',

  '& img': {
    maxWidth: '100%',
  },

  _mobile: {
    maxWidth: '100%',
  },
});

function SizeInputList({ onApply }: { onApply: (width: number, height: number) => void }) {
  const t = useTranslations('Mypage');

  const [width, setWidth] = useState(DEFAULT_SIZE.width);
  const [height, setHeight] = useState(DEFAULT_SIZE.height);

  return (
    <div className={sizeInputStyle}>
      <h2 className="heading">{t('customize-size')}</h2>
      <Flex gap="12px">
        <SizeInput value={width} onChange={(e) => setWidth(parseInt(e.target.value))} name="width" />
        <SizeInput value={height} onChange={(e) => setHeight(parseInt(e.target.value))} name="height" />
        <Button
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
      </Flex>
    </div>
  );
}

const sizeInputStyle = css({
  position: 'relative',

  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '16px',
  },

  _mobile: {
    display: 'none',
  },
});

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
