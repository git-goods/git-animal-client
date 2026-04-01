import { cn } from '@gitanimals/ui-tailwind/utils';

import { MemoizedPersonaItem } from './PersonaItem';

type Persona = {
  id: string;
  type: string;
  level: string;
  visible: boolean;
  dropRate: string;
  grade: 'DEFAULT' | 'EVOLUTION' | 'COLLABORATOR';
  isEvolutionable?: boolean;
};

interface MergeSlotsProps {
  targetPet: Persona | null;
  materialPets: Persona[];
  totalLevel: number;
  resultLevel: number;
}

// MergeSlots 스타일
const mergeSlotsContainerStyle = 'flex items-center justify-center gap-4';

const slotContainerStyle = 'flex flex-col items-center';

const slotStyle = cn(
  'w-24 h-24 bg-gray-200 rounded-2xl',
  'flex items-center justify-center',
  'border-2 border-gray-300'
);

const slotLabelStyle = 'text-gray-400 text-sm mt-2';

const operatorStyle = 'text-2xl text-gray-500 mb-6';

export function MergeSlots({ targetPet, materialPets, totalLevel, resultLevel }: MergeSlotsProps) {
  return (
    <div className={mergeSlotsContainerStyle}>
      <div className={slotContainerStyle}>
        <div className={slotStyle}>
          {targetPet ? (
            <MemoizedPersonaItem persona={targetPet} isSelected={false} onClick={() => {}} />
          ) : (
            // <span style={{ fontSize: '48px' }}>{getEmojiByType(targetPet.type)}</span>
            <span style={{ fontSize: '60px', color: '#6b7280' }}>?</span>
          )}
        </div>
        <span className={slotLabelStyle}>{targetPet ? `Level ${targetPet.level}` : 'Target Pet'}</span>
      </div>

      <span className={operatorStyle}>+</span>

      {/* Material Slot - Shows count of material pets */}
      <div className={slotContainerStyle}>
        <div className={slotStyle}>
          {materialPets.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="text-brand-sky text-2xl font-bold">
                {materialPets.length}
              </span>
              <span className="text-gray-500 text-xs mt-1">
                materials
              </span>
            </div>
          ) : (
            <span className="text-[60px] text-gray-500">?</span>
          )}
        </div>
        <span className={slotLabelStyle}>Materials</span>
      </div>

      <span className={operatorStyle}>=</span>

      {/* Result Slot */}
      <div className={slotContainerStyle}>
        <div className={slotStyle}>
          {targetPet && materialPets.length > 0 ? (
            // <span style={{ fontSize: '32px', color: '#4ade80', fontWeight: 'bold' }}>✨</span>
            <MemoizedPersonaItem
              persona={{ ...targetPet, level: resultLevel.toString() }}
              isSelected={false}
              onClick={() => {}}
            />
          ) : (
            <span style={{ fontSize: '60px', color: '#6b7280' }}>?</span>
          )}
        </div>
        <span className={slotLabelStyle}>
          {targetPet && materialPets.length > 0 ? `Level ${resultLevel}` : 'Result'}
        </span>
      </div>
    </div>
  );
}
