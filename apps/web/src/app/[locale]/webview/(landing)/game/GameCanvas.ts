import type { CharacterState } from './Character';
import { Character } from './Character';
import { GAME_CONSTANTS } from './game-constants';

export class GameCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private characters: Character[];
  private lastTimestamp: number = 0;
  private isDragging: number | null = null;
  private longPressTarget: number | null = null;
  private longPressTimer: NodeJS.Timeout | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context를 가져올 수 없습니다.');
    this.ctx = context;

    // 캔버스 크기 설정
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // 초기 캐릭터 설정
    this.characters = this.initializeCharacters();
  }

  private resizeCanvas() {
    const container = this.canvas.parentElement;
    if (container) {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
    }
  }

  private initializeCharacters(): Character[] {
    const characterStates: CharacterState[] = [
      {
        id: 1,
        position: { x: 200, y: 150 },
        targetPosition: null,
        color: GAME_CONSTANTS.COLORS.RED,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_RED,
        size: 20,
        speed: GAME_CONSTANTS.MOVEMENT.SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        image: '',
        imageElement: null,
        isSelected: false,
      },
      {
        id: 2,
        position: { x: 300, y: 250 },
        targetPosition: null,
        color: GAME_CONSTANTS.COLORS.TEAL,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_TEAL,
        size: 18,
        speed: GAME_CONSTANTS.MOVEMENT.VERY_SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        image: '',
        imageElement: null,
        isSelected: false,
      },
      {
        id: 3,
        position: { x: 400, y: 350 },
        targetPosition: null,
        color: GAME_CONSTANTS.COLORS.YELLOW,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_YELLOW,
        size: 22,
        speed: GAME_CONSTANTS.MOVEMENT.MEDIUM_SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        image: '',
        imageElement: null,
        isSelected: false,
      },
      {
        id: 4,
        position: { x: 500, y: 200 },
        targetPosition: null,
        color: GAME_CONSTANTS.COLORS.PURPLE,
        secondaryColor: GAME_CONSTANTS.COLORS.DARK_PURPLE,
        size: 19,
        speed: GAME_CONSTANTS.MOVEMENT.SLOW_SPEED,
        isIdle: false,
        idleTimer: 0,
        image: '',
        imageElement: null,
        isSelected: false,
      },
    ];

    return characterStates.map((state) => new Character(state));
  }

  public startAnimation() {
    const animate = (timestamp: number) => {
      // 델타 타임 계산 (밀리초를 초 단위로 변환)
      const deltaTime = this.lastTimestamp ? (timestamp - this.lastTimestamp) / 100 : 0;
      this.lastTimestamp = timestamp;

      // 캔버스 지우기
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 배경 그리기
      this.drawBackground();

      // 모든 캐릭터 업데이트 및 그리기
      this.characters.forEach((character) => {
        if (this.isDragging !== character.getId()) {
          character.update(deltaTime, this.canvas.width, this.canvas.height);
        }
        character.draw(this.ctx);
      });

      // 다음 프레임 요청
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  private drawBackground() {
    // 그라데이션 배경
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, GAME_CONSTANTS.COLORS.SKY_BLUE);
    gradient.addColorStop(1, GAME_CONSTANTS.COLORS.LIGHT_BLUE);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 바닥 그리드
    this.ctx.strokeStyle = GAME_CONSTANTS.COLORS.GRID_LINE;
    this.ctx.lineWidth = 1;

    const gridSize = GAME_CONSTANTS.GRID.SIZE;
    const offsetX = this.canvas.width / 2;
    const offsetY = this.canvas.height / 2;

    // 아이소메트릭 그리드 그리기
    for (let i = -20; i < 20; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(offsetX + i * gridSize - 1000, offsetY - 500);
      this.ctx.lineTo(offsetX + i * gridSize + 1000, offsetY + 500);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(offsetX + i * gridSize - 1000, offsetY + 500);
      this.ctx.lineTo(offsetX + i * gridSize + 1000, offsetY - 500);
      this.ctx.stroke();
    }

    // 바닥 타일 그리기
    for (let x = 0; x < this.canvas.width; x += gridSize) {
      for (let y = 0; y < this.canvas.height; y += gridSize) {
        if ((Math.floor(x / gridSize) + Math.floor(y / gridSize)) % 2 === 0) {
          this.ctx.fillStyle = GAME_CONSTANTS.COLORS.TILE_HIGHLIGHT;
          this.ctx.fillRect(x, y, gridSize, gridSize);
        }
      }
    }
  }

  public handleMouseDown(e: React.MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const point = { x: mouseX, y: mouseY };

    for (const character of this.characters) {
      if (character.isPointInside(point)) {
        if (this.longPressTimer) {
          clearTimeout(this.longPressTimer);
        }

        this.longPressTarget = character.getId();
        character.setSelected(true);

        this.longPressTimer = setTimeout(() => {
          this.isDragging = character.getId();
          this.longPressTarget = null;
          character.startDragging();
        }, GAME_CONSTANTS.INTERACTION.LONG_PRESS_DURATION);

        break;
      }
    }
  }

  public handleMouseUp(e: React.MouseEvent) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    if (this.longPressTarget !== null && this.isDragging === null) {
      const character = this.characters.find((c) => c.getId() === this.longPressTarget);
      if (character) {
        character.jump();
      }
    }

    if (this.isDragging !== null) {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const character = this.characters.find((c) => c.getId() === this.isDragging);
      if (character) {
        character.stopDragging(mouseX, mouseY);
      }
    }

    this.longPressTarget = null;
    this.isDragging = null;
  }

  public handleMouseMove(e: React.MouseEvent) {
    if (this.isDragging === null) return;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const character = this.characters.find((c) => c.getId() === this.isDragging);
    if (character) {
      character.updatePosition(mouseX, mouseY);
    }
  }

  public handleMouseLeave() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    this.longPressTarget = null;
    this.isDragging = null;

    // 모든 캐릭터의 선택 상태 해제
    this.characters.forEach((character) => character.setSelected(false));
  }

  public getCharacters(): Character[] {
    return this.characters;
  }

  public cleanup() {
    window.removeEventListener('resize', () => this.resizeCanvas());
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }
  }
}
