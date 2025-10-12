import { css } from '_panda/css';
import { ScrollArea } from '@gitanimals/ui-panda';

import { MemoizedPersonaBannerItem } from './PersonaItem';

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
  marginBottom: '4px',
});

const summaryTextStyle = css({
  color: 'white.white_100',
  textStyle: 'glyph14.regular',
});

const selectedPetsContainerStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  py: '6px',
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
  color: 'gray.gray_400',
  _hover: {
    borderColor: 'brand.sky_light',
  },
});

export function SelectionSummary({ targetPet, materialPets, onPetClick }: SelectionSummaryProps) {
  return (
    <div className={selectionSummaryStyle}>
      <div className={summaryHeaderStyle}>
        <span className={summaryTextStyle}>
          {targetPet ? 'Target' : 'No Target'} • Materials:{' '}
          <span className={css({ color: 'brand.sky', fontWeight: 'bold' })}>{materialPets.length}</span>
        </span>
      </div>
      <ScrollArea h="60px">
        <div className={selectedPetsContainerStyle}>
          {materialPets.map((pet) => (
            <div key={pet.id} className={selectedPetItemStyle}>
              <MemoizedPersonaBannerItem
                persona={pet}
                isSelected={false}
                onClick={() => onPetClick(pet)}
                className={css({ borderRadius: '2px' })}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
