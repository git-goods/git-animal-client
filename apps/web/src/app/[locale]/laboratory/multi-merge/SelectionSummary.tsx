import { cn } from '@gitanimals/ui-tailwind/utils';
import { ScrollArea } from '@gitanimals/ui-tailwind';

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
const selectionSummaryStyle = cn(
  'bg-gray-250 rounded-xl p-4 mb-4'
);

const summaryHeaderStyle = cn(
  'flex items-center justify-between mb-1'
);

const summaryTextStyle = 'text-white font-product text-glyph-14';

const selectedPetsContainerStyle = 'flex flex-wrap gap-2 py-1.5';

const selectedPetItemStyle = cn(
  'relative w-10 h-10 bg-gray-200 rounded-lg',
  'flex items-center justify-center',
  'border border-brand-sky cursor-pointer',
  'transition-colors text-gray-400',
  'hover:border-brand-sky-light'
);

export function SelectionSummary({ targetPet, materialPets, onPetClick }: SelectionSummaryProps) {
  return (
    <div className={selectionSummaryStyle}>
      <div className={summaryHeaderStyle}>
        <span className={summaryTextStyle}>
          {targetPet ? 'Target' : 'No Target'} • Materials:{' '}
          <span className="text-brand-sky font-bold">{materialPets.length}</span>
        </span>
      </div>
      <ScrollArea className="h-[60px]">
        <div className={selectedPetsContainerStyle}>
          {materialPets.map((pet) => (
            <div key={pet.id} className={selectedPetItemStyle}>
              <MemoizedPersonaBannerItem
                persona={pet}
                isSelected={false}
                onClick={() => onPetClick(pet)}
                className="rounded-sm"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
