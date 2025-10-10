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

interface SelectionSummaryProps {
  targetPet: Persona | null;
  materialPets: Persona[];
  onPetClick: (pet: Persona) => void;
  onClearAll: () => void;
  getEmojiByType: (type: string) => string;
}

// SelectionSummary 스타일
const selectionSummaryStyle = css({
  background: 'gray.gray_250',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '16px',
});

const summaryHeaderStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '12px',
});

const summaryTextStyle = css({
  color: 'white.white_100',
  fontSize: '14px',
});

const clearButtonStyle = css({
  fontSize: '12px',
  color: 'gray.gray_400',
  transition: 'colors',
  cursor: 'pointer',
  _hover: {
    color: 'white.white_100',
  },
});

const selectedPetsContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const selectedPetItemStyle = css({
  position: 'relative',
  width: '40px',
  height: '40px',
  background: 'gray.gray_200',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: 'brand.sky',
  cursor: 'pointer',
  transition: 'colors',
  _hover: {
    borderColor: 'brand.sky_light',
  },
});

const petIndexStyle = css({
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  background: 'brand.sky',
  color: 'white.white_100',
  fontSize: '10px',
  borderRadius: '50%',
  width: '16px',
  height: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
});

export function SelectionSummary({
  targetPet,
  materialPets,
  onPetClick,
  onClearAll,
  getEmojiByType,
}: SelectionSummaryProps) {
  if (!targetPet && materialPets.length === 0) return null;

  return (
    <div className={selectionSummaryStyle}>
      <div className={summaryHeaderStyle}>
        <span className={summaryTextStyle}>
          {targetPet ? 'Target' : 'No Target'} • Materials:{' '}
          <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{materialPets.length}</span>
        </span>
        <button className={clearButtonStyle} onClick={onClearAll}>
          Clear All
        </button>
      </div>
      <div className={selectedPetsContainerStyle}>
        {targetPet && (
          <div
            className={selectedPetItemStyle}
            onClick={() => onPetClick(targetPet)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPetClick(targetPet);
              }
            }}
            role="button"
            tabIndex={0}
            title={`Target: ${targetPet.type} Lv.${targetPet.level}`}
            style={{ borderColor: '#ef4444' }}
          >
            <span style={{ fontSize: '20px' }}>{getEmojiByType(targetPet.type)}</span>
            <div className={petIndexStyle} style={{ background: '#ef4444' }}>
              T
            </div>
          </div>
        )}
        {materialPets.map((pet, index) => (
          <div
            key={pet.id}
            className={selectedPetItemStyle}
            onClick={() => onPetClick(pet)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPetClick(pet);
              }
            }}
            role="button"
            tabIndex={0}
            title={`Material: ${pet.type} Lv.${pet.level}`}
          >
            <span style={{ fontSize: '20px' }}>{getEmojiByType(pet.type)}</span>
            <div className={petIndexStyle}>{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
