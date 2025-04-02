export const GAME_CONSTANTS = {
  COLORS: {
    RED: '#FF6B6B',
    DARK_RED: '#C23636',
    TEAL: '#4ECDC4',
    DARK_TEAL: '#2A9D8F',
    YELLOW: '#FFD166',
    DARK_YELLOW: '#E09F3E',
    PURPLE: '#9D8DF1',
    DARK_PURPLE: '#6A5ACD',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    SKY_BLUE: '#87CEEB',
    LIGHT_BLUE: '#E0F7FA',
    GRID_LINE: 'rgba(255, 255, 255, 0.2)',
    TILE_HIGHLIGHT: 'rgba(255, 255, 255, 0.05)',
    SHADOW: 'rgba(0, 0, 0, 0.3)',
    SELECTION: 'rgba(255, 255, 255, 0.5)',
  },

  GRID: {
    SIZE: 40,
  },

  MOVEMENT: {
    VERY_SLOW_SPEED: 0.25,
    SLOW_SPEED: 0.3,
    MEDIUM_SLOW_SPEED: 0.35,
    IDLE_CHANCE: 0.4, // 40% 확률로 대기 상태
    MIN_IDLE_TIME: 100, // 최소 대기 시간 (프레임)
    MAX_IDLE_TIME: 300, // 최대 대기 시간 (프레임)
    MARGIN: 50, // 화면 가장자리 여백
  },

  JUMP: {
    HEIGHT: 10, // 점프 높이
    SPEED: 0.5, // 점프 속도
  },

  SPEECH: {
    DURATION: 100, // 말풍선 표시 시간 (프레임)
    SHORT_DURATION: 60, // 짧은 말풍선 표시 시간 (프레임)
    MOVE_CHANCE: 0.3, // 이동 시 말풍선 표시 확률
    IDLE_CHANCE: 0.5, // 대기 시 말풍선 표시 확률
    MOVE_PHRASES: ['어디 가볼까?', '산책 시간!', '저기 가보자!', '움직이자!'],
    IDLE_PHRASES: ['휴식 중...', '여기 좋네!', '잠시 쉬자', '음..'],
    JUMP_PHRASE: '점프!',
    DRAG_PHRASE: '움직여줘!',
    DROP_PHRASE: '여기가 좋아!',
  },

  INTERACTION: {
    LONG_PRESS_DURATION: 500, // 롱프레스 감지 시간 (밀리초)
  },

  CANVAS: {
    DEFAULT_WIDTH: 800,
    DEFAULT_HEIGHT: 600,
    MIN_WIDTH: 400,
    MIN_HEIGHT: 300,
    MAX_WIDTH: 1600,
    MAX_HEIGHT: 1200,
    STEP: 50, // 크기 조절 단계
  },
};
