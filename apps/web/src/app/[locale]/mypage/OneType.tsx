'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button, TextField } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import { getGitanimalsLineString, GitanimalsLine } from '@/components/Gitanimals';
import { useClientUser } from '@/utils/clientAuth';
import { copyClipBoard } from '@/utils/copy';

import { SelectPersonaList } from './PersonaList';

const DEFAULT_SIZE = { width: 600, height: 120 };

interface Props {}

export function OneType({}: Props) {
  const t = useTranslations('Mypage');

  const { name } = useClientUser();

  const [selectPersona, setSelectPersona] = useState<string | null>();
  const [sizes, setSizes] = useState<{ width: number; height: number }>(DEFAULT_SIZE);
  const [isExtend, setIsExtend] = useState(false);

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
    } catch (error) {}
  };

  return (
    <section className={sectionStyle}>
      {name && (
        <section className={selectPetContainerStyle}>
          <h2 className="heading">{t('change-pet')}</h2>
          <Button className="extend-button" onClick={() => setIsExtend((prev) => !prev)}>
            {isExtend ? t('shrink-button') : t('extend-button')}
          </Button>

          <SelectPersonaList
            name={name}
            selectPersona={selectPersona ? [selectPersona] : []}
            onSelectPersona={(persona) => setSelectPersona(persona.id)}
            isExtend={isExtend}
          />
        </section>
      )}

      <SizeInputList onApply={(width, height) => setSizes({ width, height })} />
      <div>
        <div className={lineContainerStyle} style={{ width: sizes.width, height: sizes.height }}>
          <GitanimalsLine sizes={[sizes.width, sizes.height]} petId={selectPersona} />
        </div>
        <Button onClick={onLinkCopy} mt={16} size="m">
          {t('copy-link-title')}
        </Button>
      </div>
    </section>
  );
}

const selectPetContainerStyle = css({
  position: 'relative',
  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '16px',
  },
  '& .extend-button': {
    position: 'absolute',
    top: '-16px',
    right: 0,
  },
});

const sectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  padding: '40px 0',
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
});

function SizeInputList({ onApply }: { onApply: (width: number, height: number) => void }) {
  const t = useTranslations('Mypage');

  const [width, setWidth] = useState(DEFAULT_SIZE.width);
  const [height, setHeight] = useState(DEFAULT_SIZE.height);

  return (
    <div className={sizeInputStyle}>
      <h2 className="heading">{t('customize-size')}</h2>
      <div className={flex({ gap: 12 })}>
        <SizeInput value={width} onChange={(e) => setWidth(parseInt(e.target.value))} name="width" />
        <SizeInput value={height} onChange={(e) => setHeight(parseInt(e.target.value))} name="height" />
        <Button onClick={() => onApply(width, height)}>{t('apply-button')}</Button>
      </div>
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
});

function SizeInput(props: { value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string }) {
  const t = useTranslations('Mypage');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value > 1000) {
      toast.error(t('line-set-error'));
      return;
    }

    props.onChange(e);
  };

  return <TextField type="number" name={props.name} id={props.name} value={props.value} onChange={onChange} />;
}
