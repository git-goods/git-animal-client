import { GAME_CONSTANTS } from './game-constants';
import type { Position } from './game-types';
import { getRandomPosition } from './game-utils';

export interface CharacterState {
  id: number;
  position: Position;
  targetPosition: Position | null;
  jumpHeight: number;
  isJumping: boolean;
  color: string;
  secondaryColor: string;
  size: number;
  speed: number;
  isIdle: boolean;
  idleTimer: number;
  showSpeechBubble: boolean;
  speechBubbleText: string;
  speechBubbleTimer: number;
  image: string;
  imageElement: HTMLImageElement | null;
  isSelected: boolean;
}

export class Character {
  private state: CharacterState;
  private jumpQueue: number = 0;
  private lastJumpTime: number = 0;
  private readonly JUMP_COOLDOWN: number = 0.5; // 점프 쿨다운 (초)
  private readonly JUMP_DURATION: number = 0.3; // 점프 지속 시간 (초)

  constructor(state: CharacterState) {
    this.state = state;
  }

  public update(deltaTime: number, canvasWidth: number, canvasHeight: number) {
    // 말풍선 타이머 업데이트
    if (this.state.showSpeechBubble) {
      this.state.speechBubbleTimer -= deltaTime;
      if (this.state.speechBubbleTimer <= 0) {
        this.state.showSpeechBubble = false;
      }
    }

    // 점프 업데이트
    if (this.state.isJumping) {
      const jumpProgress = (Date.now() - this.lastJumpTime) / (this.JUMP_DURATION * 1000);

      if (jumpProgress >= 1) {
        this.state.isJumping = false;
        this.state.jumpHeight = 0;

        // 점프 큐에 있는 다음 점프 실행
        if (this.jumpQueue > 0) {
          this.jumpQueue--;
          this.startJump();
        }
      } else {
        // 사인 함수를 사용하여 부드러운 점프 모션 구현
        this.state.jumpHeight = Math.sin(jumpProgress * Math.PI) * GAME_CONSTANTS.JUMP.HEIGHT;
      }
    }

    // 대기 상태 업데이트
    if (this.state.isIdle) {
      this.state.idleTimer -= deltaTime;
      if (this.state.idleTimer <= 0) {
        this.state.isIdle = false;
        this.state.targetPosition = getRandomPosition(canvasWidth, canvasHeight);

        if (Math.random() < GAME_CONSTANTS.SPEECH.MOVE_CHANCE) {
          const phrases = GAME_CONSTANTS.SPEECH.MOVE_PHRASES;
          this.state.speechBubbleText = phrases[Math.floor(Math.random() * phrases.length)];
          this.state.showSpeechBubble = true;
          this.state.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
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
          this.state.speechBubbleText = phrases[Math.floor(Math.random() * phrases.length)];
          this.state.showSpeechBubble = true;
          this.state.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
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
    const { position, jumpHeight, size, imageElement } = this.state;

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
    if (this.state.showSpeechBubble) {
      this.drawSpeechBubble(ctx, position.x, characterY - size * 2, this.state.speechBubbleText);
    }

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

  private drawSpeechBubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
    ctx.save();

    ctx.font = '14px Arial';
    const textWidth = ctx.measureText(text).width;
    const bubbleWidth = textWidth + 20;
    const bubbleHeight = 30;

    // 말풍선 배경
    ctx.fillStyle = GAME_CONSTANTS.COLORS.WHITE;
    ctx.beginPath();
    ctx.roundRect(x - bubbleWidth / 2, y - bubbleHeight / 2, bubbleWidth, bubbleHeight, 10);
    ctx.fill();
    ctx.strokeStyle = GAME_CONSTANTS.COLORS.BLACK;
    ctx.lineWidth = 1;
    ctx.stroke();

    // 말풍선 꼬리
    ctx.beginPath();
    ctx.moveTo(x, y + bubbleHeight / 2);
    ctx.lineTo(x - 10, y + bubbleHeight / 2 + 10);
    ctx.lineTo(x + 10, y + bubbleHeight / 2 + 10);
    ctx.closePath();
    ctx.fillStyle = GAME_CONSTANTS.COLORS.WHITE;
    ctx.fill();
    ctx.stroke();

    // 텍스트
    ctx.fillStyle = GAME_CONSTANTS.COLORS.BLACK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);

    ctx.restore();
  }

  public jump() {
    const currentTime = Date.now();
    const timeSinceLastJump = (currentTime - this.lastJumpTime) / 1000;

    // 쿨다운 체크
    if (timeSinceLastJump < this.JUMP_COOLDOWN) {
      return;
    }

    // 현재 점프 중이면 큐에 추가
    if (this.state.isJumping) {
      this.jumpQueue++;
    } else {
      this.startJump();
    }
  }

  private startJump() {
    this.state.isJumping = true;
    this.state.jumpHeight = 0;
    this.lastJumpTime = Date.now();
    this.state.speechBubbleText = GAME_CONSTANTS.SPEECH.JUMP_PHRASE;
    this.state.showSpeechBubble = true;
    this.state.speechBubbleTimer = GAME_CONSTANTS.SPEECH.SHORT_DURATION;
  }

  public startDragging() {
    this.state.isSelected = true;
    this.state.speechBubbleText = GAME_CONSTANTS.SPEECH.DRAG_PHRASE;
    this.state.showSpeechBubble = true;
    this.state.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
  }

  public stopDragging(x: number, y: number) {
    this.state.position.x = x;
    this.state.position.y = y + this.state.size;
    this.state.targetPosition = null;
    this.state.isSelected = false;
    this.state.speechBubbleText = GAME_CONSTANTS.SPEECH.DROP_PHRASE;
    this.state.showSpeechBubble = true;
    this.state.speechBubbleTimer = GAME_CONSTANTS.SPEECH.DURATION;
  }

  public updatePosition(x: number, y: number) {
    this.state.position.x = x;
    this.state.position.y = y + this.state.size;
  }

  public setSelected(selected: boolean) {
    this.state.isSelected = selected;
  }

  public isPointInside(point: Position): boolean {
    const characterY = this.state.position.y - this.state.size - this.state.jumpHeight;
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
