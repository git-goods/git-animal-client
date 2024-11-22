/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { motion } from 'framer-motion';
import { EqualIcon, PlusIcon } from 'lucide-react';

import { getPersonaImage } from '@/utils/image';

type MergePersonaProps = {
  targetPersona: Persona | null;
  materialPersona: Persona | null;
};

const mergePersona = ({ targetPersona, materialPersona }: MergePersonaProps) => {
  if (!targetPersona || !materialPersona) return undefined;

  // 재료 레벨이 1 이하면 1로 처리
  // 재료 레벨의 /2 만큼 합쳐진다.
  const plusLevel = Number(materialPersona.level) <= 1 ? 1 : Math.floor(Number(materialPersona.level) / 2);
  const resultLevel = Number(targetPersona.level) + plusLevel;

  return {
    ...targetPersona,
    level: String(resultLevel),
  };
};

export const MergePreview = ({ materialPersona, targetPersona }: MergePersonaProps) => {
  const resultPersona = mergePersona({ targetPersona, materialPersona });

  return (
    <div className={containerStyle}>
      <div className={itemContainerStyle}>
        {targetPersona ? <MergeItem persona={targetPersona} /> : <MergeEmptyItem />}
        <PlusIcon width={24} height={24} className={iconStyle} color="#FFFFFFBF" />
        {materialPersona ? <MergeItem persona={materialPersona} /> : <MergeEmptyItem />}

        <EqualIcon width={24} height={24} className={iconStyle} color="#FFFFFFBF" />
        <ResultItemAnimation isVisible={Boolean(resultPersona)} key={resultPersona?.id}>
          {resultPersona ? <MergeItem persona={resultPersona} /> : <MergeEmptyItem />}
        </ResultItemAnimation>
      </div>
    </div>
  );
};

const containerStyle = css({
  position: 'relative',
  padding: '32px 32px 12px',
  overflow: 'hidden',
  minHeight: 'fit-content',
});

const itemContainerStyle = flex({
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
});

const iconStyle = css({
  marginBottom: '34px',
});

const itemStyle = css({
  position: 'relative',
  padding: '8px',
});

const flashEffectStyle = css({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'white',
  borderRadius: '8px',
});

function MergeEmptyItem() {
  return (
    <div className={itemStyle}>
      <img src="/mypage/merge/merge-empty.svg" alt="empty" className={imageStyle} />
      <div className={cx(levelTextStyle, levelEmptyTextStyle)}>Level ?</div>
    </div>
  );
}

function MergeItem({ persona }: PropsWithChildren<{ persona: Persona }>) {
  return (
    <div className={itemStyle}>
      <div className={mergeItemStyle}>
        <img src={getPersonaImage(persona.type)} alt="Level 3 Fish" className={imageStyle} />
      </div>
      <div className={levelTextStyle}>Level {persona.level}</div>
    </div>
  );
}
const imageStyle = css({
  objectFit: 'contain',
  width: '120px',
  height: '120px',
});

const levelTextStyle = css({
  textAlign: 'center',
  marginTop: '12px',
  textStyle: 'glyph18.bold',
  color: 'white.white_100',
});

const levelEmptyTextStyle = css({
  color: 'white.white_75',
});

const mergeItemStyle = css({
  borderRadius: '16px',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  background: 'rgba(255, 255, 255, 0.25)',
});

function ResultItemAnimation({ isVisible, children }: PropsWithChildren<{ isVisible: boolean }>) {
  return (
    <motion.div
      className={css({ position: 'relative' })}
      initial={{ scale: 1 }}
      animate={{
        scale: isVisible ? [1, 1.2, 1] : 1,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {children}
      {isVisible && (
        <motion.div
          className={flashEffectStyle}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}
