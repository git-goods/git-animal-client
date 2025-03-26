type MINI_GAME_TYPE = 'CHARACTER' | 'BASKETBALL' | 'QUIZ';

export const GAME_BUTTON_COLOR_PALLETE = {
  green: ['#01BB66', '#00A057'],
  teal: ['#00D1A7', '#00B294'],
  blue: ['#198BE5', '#1A77C0'],
};

export const MINI_GAME: Record<
  MINI_GAME_TYPE,
  {
    TITLE: string;
    DESCRIPTION: string;
    GAME_INDEX: number;
    color: keyof typeof GAME_BUTTON_COLOR_PALLETE;
  }
> = {
  CHARACTER: {
    TITLE: '캐릭터 게임',
    DESCRIPTION: '캐릭터 게임 설명',
    GAME_INDEX: 0,
    color: 'green',
  },
  BASKETBALL: {
    TITLE: '농구 게임',
    DESCRIPTION: '농구 게임 설명',
    GAME_INDEX: 1,
    color: 'teal',
  },
  QUIZ: {
    TITLE: '퀴즈 게임',
    DESCRIPTION: '퀴즈 게임 설명',
    GAME_INDEX: 2,
    color: 'blue',
  },
};

export const MINI_GAME_KEYS = Object.keys(MINI_GAME) as MINI_GAME_TYPE[];

export const GAME_BUTTON_POSITION = {
  CHARACTER: {
    startX: 673,
    startY: 1677,
  },
  BASKETBALL: {
    startX: 955,
    startY: 1677,
  },
  QUIZ: {
    startX: 1237,
    startY: 1677,
  },
};
