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

interface PetGridProps {
  pets: Persona[];
  onPetClick: (pet: Persona) => void;
  isSelected: (petId: string) => string | false;
  getEmojiByType: (type: string) => string;
}

// PetGrid 스타일
const petsGridStyle = css({
  flex: '1',
  overflowY: 'auto',
  padding: '0 32px 24px',
});

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '8px',
  '@media (min-width: 640px)': {
    gridTemplateColumns: 'repeat(10, 1fr)',
  },
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(13, 1fr)',
  },
});

const petCardStyle = css({
  position: 'relative',
  aspectRatio: '1',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all',
  background: 'gray.gray_200',
  border: '2px solid',
  borderColor: 'transparent',
  _hover: {
    borderColor: 'gray.gray_400',
  },
});

const petCardSelectedStyle = css({
  background: 'brand.sky_dark',
  borderColor: 'brand.sky',
  transform: 'scale(0.95)',
});

const checkIconStyle = css({
  position: 'absolute',
  top: '4px',
  left: '4px',
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
  zIndex: '10',
});

const petLevelStyle = css({
  color: 'white.white_100',
  fontSize: '10px',
  fontWeight: 'medium',
  background: 'black.black_50',
  padding: '2px 8px',
  borderRadius: '4px',
});

export function PetGrid({ pets, onPetClick, isSelected, getEmojiByType }: PetGridProps) {
  return (
    <div className={petsGridStyle}>
      <div className={gridStyle}>
        {pets.map((pet) => {
          const selected = isSelected(pet.id);
          return (
            <div
              key={pet.id}
              className={`${petCardStyle} ${selected ? petCardSelectedStyle : ''}`}
              onClick={() => onPetClick(pet)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPetClick(pet);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {selected && <div className={checkIconStyle}>✓</div>}
              <span style={{ fontSize: '24px', marginBottom: '4px' }}>{getEmojiByType(pet.type)}</span>
              <span className={petLevelStyle}>Lv.{pet.level}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
