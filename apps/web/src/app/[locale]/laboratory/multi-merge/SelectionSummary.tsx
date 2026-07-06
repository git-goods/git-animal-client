import { ScrollArea } from '@gitanimals/ui-tailwind';

import { MemoizedPersonaBannerItem } from './MergePersonaItem';

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
const selectionSummaryStyle = 'bg-gray-250 rounded-[12px] p-[16px] mb-[16px]';

const summaryHeaderStyle = 'flex items-center justify-between mb-[4px]';

const summaryTextStyle = 'text-white-100 glyph14-regular';

const selectedPetsContainerStyle = 'flex flex-wrap gap-[8px] py-[6px]';

const selectedPetItemStyle =
  'relative w-[40px] h-[40px] bg-gray-200 rounded-[8px] flex items-center justify-center border border-solid border-brand-sky cursor-pointer transition-colors text-gray-400 hover:border-brand-sky_light';

export function SelectionSummary({ targetPet, materialPets, onPetClick }: SelectionSummaryProps) {
  return (
    <div className={selectionSummaryStyle}>
      <div className={summaryHeaderStyle}>
        <span className={summaryTextStyle}>
          {targetPet ? 'Target' : 'No Target'} • Materials:{' '}
          <span className="text-brand-sky font-bold">{materialPets.length}</span>
        </span>
      </div>
      <ScrollArea height="60px">
        <div className={selectedPetsContainerStyle}>
          {materialPets.map((pet) => (
            <div key={pet.id} className={selectedPetItemStyle}>
              <MemoizedPersonaBannerItem
                persona={pet}
                isSelected={false}
                onClick={() => onPetClick(pet)}
                className="rounded-[2px]"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
