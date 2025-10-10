import { css } from '_panda/css';

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
  getEmojiByType: (type: string) => string;
}

// MergeSlots 스타일
const mergeSlotsContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '24px',
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

export function MergeSlots({ targetPet, materialPets, totalLevel, resultLevel, getEmojiByType }: MergeSlotsProps) {
  return (
    <div className={mergeSlotsContainerStyle}>
      {/* Target Slot */}
      <div className={slotContainerStyle}>
        <div className={slotStyle}>
          {targetPet ? (
            <span style={{ fontSize: '48px' }}>{getEmojiByType(targetPet.type)}</span>
          ) : (
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
              <span style={{ fontSize: '24px', color: '#60a5fa', fontWeight: 'bold' }}>{materialPets.length}</span>
              <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>materials</span>
            </div>
          ) : (
            <span style={{ fontSize: '60px', color: '#6b7280' }}>?</span>
          )}
        </div>
        <span className={slotLabelStyle}>{materialPets.length > 0 ? `Total Lv. ${totalLevel}` : 'Materials'}</span>
      </div>

      <span className={operatorStyle}>=</span>

      {/* Result Slot */}
      <div className={slotContainerStyle}>
        <div className={slotStyle}>
          {targetPet && materialPets.length > 0 ? (
            <span style={{ fontSize: '32px', color: '#4ade80', fontWeight: 'bold' }}>✨</span>
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
