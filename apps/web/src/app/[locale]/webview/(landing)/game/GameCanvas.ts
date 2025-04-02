import { CharacterManager } from './CharacterManager';
import { EventManager } from './EventManager';
import { GAME_CONSTANTS } from './game-constants';
import { InputHandler } from './InputHandler';

export class GameCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lastTimestamp: number = 0;
  private inputHandler: InputHandler;
  private characterManager: CharacterManager;
  private eventManager: EventManager;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context를 가져올 수 없습니다.');
    this.ctx = context;

    // 초기화
    this.eventManager = new EventManager();
    this.characterManager = new CharacterManager();
    this.inputHandler = new InputHandler(this.eventManager, this.characterManager);

    // 캔버스 크기 설정
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // 이벤트 리스너 설정
    this.setupEventListeners();
  }

  private resizeCanvas() {
    const container = this.canvas.parentElement;
    if (container) {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
    }
  }

  private setupEventListeners() {
    this.eventManager.on('CLICK', (event: any) => {
      const character = this.characterManager.findCharacterById(event.targetId);
      if (character) {
        character.jump();
      }
    });

    this.eventManager.on('DRAG_START', (event: any) => {
      const character = this.characterManager.findCharacterById(event.targetId);
      if (character) {
        character.startDragging();
      }
    });

    this.eventManager.on('DRAG_END', (event: any) => {
      const character = this.characterManager.findCharacterById(event.targetId);
      if (character) {
        character.stopDragging(event.position.x, event.position.y);
      }
    });

    this.eventManager.on('DRAG_MOVE', (event: any) => {
      const character = this.characterManager.findCharacterById(event.targetId);
      if (character) {
        character.updatePosition(event.position.x, event.position.y);
      }
    });
  }

  public startAnimation() {
    const animate = (timestamp: number) => {
      const deltaTime = this.lastTimestamp ? (timestamp - this.lastTimestamp) / 100 : 0;
      this.lastTimestamp = timestamp;

      // 캔버스 지우기
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 배경 그리기
      this.drawBackground();

      // 캐릭터 업데이트 및 그리기
      this.characterManager.updateCharacters(deltaTime, this.canvas.width, this.canvas.height);
      this.characterManager.drawCharacters(this.ctx);

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
    this.inputHandler.handleMouseDown(e, this.canvas);
  }

  public handleMouseUp(e: React.MouseEvent) {
    this.inputHandler.handleMouseUp(e, this.canvas);
  }

  public handleMouseMove(e: React.MouseEvent) {
    this.inputHandler.handleMouseMove(e, this.canvas);
  }

  public handleMouseLeave() {
    this.inputHandler.handleMouseLeave();
  }

  public getCharacters() {
    return this.characterManager.getCharacters();
  }

  public setCharacterImage(id: number, imageElement: HTMLImageElement) {
    this.characterManager.setCharacterImage(id, imageElement);
  }

  public cleanup() {
    window.removeEventListener('resize', () => this.resizeCanvas());
    this.inputHandler.cleanup();
  }
}
