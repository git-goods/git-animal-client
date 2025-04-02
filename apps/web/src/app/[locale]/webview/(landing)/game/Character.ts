import { GAME_CONSTANTS } from './game-constants';
import type { Position } from './game-types';
import { getRandomPosition } from './game-utils';
import { Jump } from './Jump';
import { SpeechBubble } from './SpeechBubble';

export interface CharacterState {
  id: number;
  position: Position;
  targetPosition: Position | null;
  color: string;
  secondaryColor: string;
  size: number;
  speed: number;
  isIdle: boolean;
  idleTimer: number;
  image: string;
  imageElement: HTMLImageElement | null;
  isSelected: boolean;
}

export class Character {
  private state: CharacterState;
  private speechBubble: SpeechBubble;
  private jumpController: Jump;

  constructor(state: CharacterState) {
    this.state = state;
    this.speechBubble = new SpeechBubble();
    this.jumpController = new Jump();
  }

  public update(deltaTime: number, canvasWidth: number, canvasHeight: number) {
    // 말풍선 업데이트
    this.speechBubble.update(deltaTime);

    // 점프 업데이트
    const jumpHeight = this.jumpController.update(deltaTime);

    // 대기 상태 업데이트
    if (this.state.isIdle) {
      this.state.idleTimer -= deltaTime;
      if (this.state.idleTimer <= 0) {
        this.state.isIdle = false;
        this.state.targetPosition = getRandomPosition(canvasWidth, canvasHeight);

        if (Math.random() < GAME_CONSTANTS.SPEECH.MOVE_CHANCE) {
          const phrases = GAME_CONSTANTS.SPEECH.MOVE_PHRASES;
          this.speechBubble.show(phrases[Math.floor(Math.random() * phrases.length)], GAME_CONSTANTS.SPEECH.DURATION);
        }
      }
      return;
    }

    // 목표 위치가 없으면 새로 설정
    if (!this.state.targetPosition) {
      this.state.targetPosition = getRandomPosition(canvasWidth, canvasHeight);
    }

    // 목표 위치로 이동
    const dx = this.state.targetPosition.x - this.state.position.x;
    const dy = this.state.targetPosition.y - this.state.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.state.speed) {
      if (Math.random() < GAME_CONSTANTS.MOVEMENT.IDLE_CHANCE) {
        this.state.isIdle = true;
        this.state.idleTimer =
          Math.random() * GAME_CONSTANTS.MOVEMENT.MAX_IDLE_TIME + GAME_CONSTANTS.MOVEMENT.MIN_IDLE_TIME;

        if (Math.random() < GAME_CONSTANTS.SPEECH.IDLE_CHANCE) {
          const phrases = GAME_CONSTANTS.SPEECH.IDLE_PHRASES;
          this.speechBubble.show(phrases[Math.floor(Math.random() * phrases.length)], GAME_CONSTANTS.SPEECH.DURATION);
        }
      } else {
        this.state.targetPosition = getRandomPosition(canvasWidth, canvasHeight);
      }
    } else {
      const moveX = (dx / distance) * this.state.speed * deltaTime;
      const moveY = (dy / distance) * this.state.speed * deltaTime;
      this.state.position.x += moveX;
      this.state.position.y += moveY;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { position, size, imageElement } = this.state;
    const jumpHeight = this.jumpController.getJumpHeight();

    ctx.save();

    // 그림자
    ctx.beginPath();
    ctx.ellipse(position.x, position.y, size * 0.8, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = GAME_CONSTANTS.COLORS.SHADOW;
    ctx.fill();

    // 캐릭터 이미지 그리기
    const characterY = position.y - size - jumpHeight;
    const imageSize = size * 2;
    const imageX = position.x - imageSize / 2;
    const imageY = characterY - imageSize / 2;

    if (imageElement) {
      ctx.globalAlpha = 1;
      ctx.drawImage(imageElement, imageX, imageY, imageSize, imageSize);
    }

    // 말풍선
    this.speechBubble.draw(ctx, position.x, characterY - size * 2);

    // 선택된 캐릭터 표시
    if (this.state.isSelected) {
      ctx.beginPath();
      ctx.arc(position.x, characterY, size * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = GAME_CONSTANTS.COLORS.SELECTION;
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }

  public jump() {
    if (this.jumpController.jump()) {
      this.speechBubble.show(GAME_CONSTANTS.SPEECH.JUMP_PHRASE, GAME_CONSTANTS.SPEECH.SHORT_DURATION);
    }
  }

  public startDragging() {
    this.state.isSelected = true;
    this.speechBubble.show(GAME_CONSTANTS.SPEECH.DRAG_PHRASE, GAME_CONSTANTS.SPEECH.DURATION);
  }

  public stopDragging(x: number, y: number) {
    this.state.position.x = x;
    this.state.position.y = y + this.state.size;
    this.state.targetPosition = null;
    this.state.isSelected = false;
    this.speechBubble.show(GAME_CONSTANTS.SPEECH.DROP_PHRASE, GAME_CONSTANTS.SPEECH.DURATION);
  }

  public updatePosition(x: number, y: number) {
    this.state.position.x = x;
    this.state.position.y = y + this.state.size;
  }

  public setSelected(selected: boolean) {
    this.state.isSelected = selected;
  }

  public isPointInside(point: Position): boolean {
    const characterY = this.state.position.y - this.state.size - this.jumpController.getJumpHeight();
    const dx = point.x - this.state.position.x;
    const dy = point.y - characterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.state.size * 1.5;
  }

  public getId(): number {
    return this.state.id;
  }

  public getState(): CharacterState {
    return this.state;
  }

  public setImageElement(imageElement: HTMLImageElement) {
    this.state.imageElement = imageElement;
  }
}
