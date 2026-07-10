import { MemoizedPersonaItem } from './MergePersonaItem';

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
const mergeSlotsContainerStyle = 'flex items-center justify-center gap-[16px]';

const slotContainerStyle = 'flex flex-col items-center';

const slotStyle =
  'w-[96px] h-[96px] bg-gray-200 rounded-[16px] flex items-center justify-center border-2 border-solid border-gray-300';

const slotLabelStyle = 'text-gray-400 text-[14px] mt-[8px]';

const operatorStyle = 'text-[24px] text-gray-500 mb-[24px]';

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
              <span className="text-brand-sky" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {materialPets.length}
              </span>
              <span className="text-gray-500" style={{ fontSize: '12px', marginTop: '4px' }}>
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
