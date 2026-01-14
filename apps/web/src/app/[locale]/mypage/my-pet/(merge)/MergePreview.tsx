/* eslint-disable @next/next/no-img-element */
import type { PropsWithChildren } from 'react';
import type { Persona } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind';
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
    <div className="relative flex justify-center py-8 px-8 pb-3 overflow-hidden min-h-fit max-mobile:p-0">
      <div className="flex items-center justify-between w-full max-w-[612px]">
        {targetPersona ? (
          <PersonaBanner level={targetPersona.level} personaType={targetPersona.type} />
        ) : (
          <PersonaBannerUnknown />
        )}
        <PlusIcon width={24} height={24} className="mb-[34px]" color="#FFFFFFBF" />

        {materialPersona ? (
          <PersonaBanner level={materialPersona.level} personaType={materialPersona.type} />
        ) : (
          <PersonaBannerUnknown />
        )}

        <EqualIcon width={24} height={24} className="mb-[34px]" color="#FFFFFFBF" />

        <ResultItemAnimation isVisible={Boolean(resultPersona)} key={resultPersona?.id}>
          {resultPersona ? (
            <PersonaBanner level={resultPersona.level} personaType={resultPersona.type} />
          ) : (
            <PersonaBannerUnknown />
          )}
        </ResultItemAnimation>
      </div>
    </div>
  );
};

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
          className="absolute inset-0 bg-white rounded-lg"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}
