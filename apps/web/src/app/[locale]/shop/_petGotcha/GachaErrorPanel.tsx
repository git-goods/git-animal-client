/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-tailwind';

import type { GachaFailureKind } from './gachaError';

const MESSAGE_KEY: Record<GachaFailureKind, string> = {
  server: 'error-server',
  timeout: 'error-timeout',
  network: 'error-network',
  unknown: 'many-error-message',
};

interface Props {
  kind: GachaFailureKind;
  onRetry: () => void;
  onClose: () => void;
}

export function GachaErrorPanel({ kind, onRetry, onClose }: Props) {
  const t = useTranslations('Gotcha');
  const tCommon = useTranslations('Common');

  return (
    // 스테이지 클릭 핸들러가 닫기/스킵으로 해석하지 않도록 막는다
    <div
      className="z-30 flex max-w-[420px] flex-col items-center gap-[16px] px-6 text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="glyph24-bold text-white mobile:glyph20-bold">{t('get-persona-fail')}</p>
      <p className="glyph16-regular text-white/70">{t(MESSAGE_KEY[kind])}</p>
      <p className="glyph16-regular text-white/50">{t('points-not-charged')}</p>
      <div className="mt-[8px] flex gap-[8px]">
        <Button size="m" onClick={onRetry}>
          {t('retry')}
        </Button>
        <Button size="m" variant="secondary" onClick={onClose}>
          {tCommon('close')}
        </Button>
      </div>
    </div>
  );
}
