export type Persona = {
  id: string;
  type: string;
  level: string;
  visible: boolean;
  dropRate: string;
  grade: 'DEFAULT' | 'EVOLUTION' | 'COLLABORATOR';
  isEvolutionable?: boolean;
};

// 샘플 펫 데이터
export const samplePets: Persona[] = [
  { id: '1', type: 'CAT', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '2', type: 'DOG', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '3', type: 'MOUSE', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '4', type: 'HAMSTER', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '5', type: 'RABBIT', level: '64', visible: true, dropRate: '0.05', grade: 'EVOLUTION', isEvolutionable: true },
  { id: '6', type: 'BEAR', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '7', type: 'PANDA', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '8', type: 'KOALA', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '9', type: 'TIGER', level: '72', visible: true, dropRate: '0.03', grade: 'EVOLUTION', isEvolutionable: true },
  { id: '10', type: 'LION', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '11', type: 'COW', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '12', type: 'PIG', level: '64', visible: true, dropRate: '0.05', grade: 'EVOLUTION' },
  { id: '13', type: 'FROG', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '14', type: 'MONKEY', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '15', type: 'CHICKEN', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '16', type: 'FOX', level: '65', visible: true, dropRate: '0.02', grade: 'COLLABORATOR' },
  { id: '17', type: 'WOLF', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '18', type: 'RACCOON', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '19', type: 'HORSE', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '20', type: 'UNICORN', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '21', type: 'BEE', level: '65', visible: true, dropRate: '0.02', grade: 'COLLABORATOR' },
  { id: '22', type: 'BUG', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '23', type: 'BUTTERFLY', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
  { id: '24', type: 'SNAIL', level: '3', visible: true, dropRate: '0.1', grade: 'DEFAULT' },
];

// 타입에 따른 이모지 매핑
export const getEmojiByType = (type: string): string => {
  const emojiMap: Record<string, string> = {
    CAT: '🐱',
    DOG: '🐶',
    MOUSE: '🐭',
    HAMSTER: '🐹',
    RABBIT: '🐰',
    BEAR: '🐻',
    PANDA: '🐼',
    KOALA: '🐨',
    TIGER: '🐯',
    LION: '🦁',
    COW: '🐮',
    PIG: '🐷',
    FROG: '🐸',
    MONKEY: '🐵',
    CHICKEN: '🐔',
    FOX: '🦊',
    WOLF: '🐺',
    RACCOON: '🦝',
    HORSE: '🐴',
    UNICORN: '🦄',
    BEE: '🐝',
    BUG: '🐛',
    BUTTERFLY: '🦋',
    SNAIL: '🐌',
  };
  return emojiMap[type] || '❓';
};
