/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import type { Persona } from '@gitanimals/api';
import { motion } from 'framer-motion';
import { EqualIcon, PlusIcon } from 'lucide-react';

import { PersonaBanner, PersonaBannerUnknown } from '../_components/PersonaBanner';

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
        {targetPersona ? (
          <PersonaBanner level={targetPersona.level} personaType={targetPersona.type} size="small" />
        ) : (
          <PersonaBannerUnknown size="small" />
        )}
        <PlusIcon width={24} height={24} className={iconStyle} color="#FFFFFFBF" />

        {materialPersona ? (
          <PersonaBanner level={materialPersona.level} personaType={materialPersona.type} size="small" />
        ) : (
          <PersonaBannerUnknown size="small" />
        )}

        <EqualIcon width={24} height={24} className={iconStyle} color="#FFFFFFBF" />

        <ResultItemAnimation isVisible={Boolean(resultPersona)} key={resultPersona?.id}>
          {resultPersona ? (
            <PersonaBanner level={resultPersona.level} personaType={resultPersona.type} size="small" />
          ) : (
            <PersonaBannerUnknown size="small" />
          )}
        </ResultItemAnimation>
      </div>
    </div>
  );
};

const containerStyle = 'relative flex justify-center pt-[16px] pb-[8px] px-0 overflow-hidden min-h-fit mobile:p-0';

const itemContainerStyle = 'flex items-center justify-between w-full max-w-[612px]';

const iconStyle = 'mb-[24px]';

const flashEffectStyle = 'absolute inset-0 bg-white rounded-[8px]';

function ResultItemAnimation({ isVisible, children }: PropsWithChildren<{ isVisible: boolean }>) {
  return (
    <motion.div
      className="relative"
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
