import { css } from '_panda/css';

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
const mergeSlotsContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
});

const slotContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const slotStyle = css({
  width: '96px',
  height: '96px',
  background: 'gray.gray_200',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid',
  borderColor: 'gray.gray_300',
});

const slotLabelStyle = css({
  color: 'gray.gray_400',
  fontSize: '14px',
  marginTop: '8px',
});

const operatorStyle = css({
  fontSize: '24px',
  color: 'gray.gray_500',
  marginBottom: '24px',
});

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
              <span className={css({ color: 'brand.sky' })} style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {materialPets.length}
              </span>
              <span
                className={css({
                  color: 'gray.gray_500',
                })}
                style={{ fontSize: '12px', marginTop: '4px' }}
              >
                materials
              </span>
            </div>
          ) : (
            <span className={css({ fontSize: '60px', color: 'gray.gray_500' })}>?</span>
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
