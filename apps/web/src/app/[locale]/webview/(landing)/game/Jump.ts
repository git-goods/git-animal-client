import { GAME_CONSTANTS } from './game-constants';

export class Jump {
  private isJumping: boolean;
  private jumpHeight: number;
  private jumpQueue: number;
  private lastJumpTime: number;
  private readonly JUMP_COOLDOWN: number = 0.5; // 점프 쿨다운 (초)
  private readonly JUMP_DURATION: number = 0.3; // 점프 지속 시간 (초)

  constructor() {
    this.isJumping = false;
    this.jumpHeight = 0;
    this.jumpQueue = 0;
    this.lastJumpTime = 0;
  }

  public update(deltaTime: number): number {
    if (!this.isJumping) return 0;

    const jumpProgress = (Date.now() - this.lastJumpTime) / (this.JUMP_DURATION * 1000);

    if (jumpProgress >= 1) {
      this.isJumping = false;
      this.jumpHeight = 0;

      // 점프 큐에 있는 다음 점프 실행
      if (this.jumpQueue > 0) {
        this.jumpQueue--;
        this.startJump();
      }
      return 0;
    }

    // 사인 함수를 사용하여 부드러운 점프 모션 구현
    this.jumpHeight = Math.sin(jumpProgress * Math.PI) * GAME_CONSTANTS.JUMP.HEIGHT;
    return this.jumpHeight;
  }

  public jump(): boolean {
    const currentTime = Date.now();
    const timeSinceLastJump = (currentTime - this.lastJumpTime) / 1000;

    // 쿨다운 체크
    if (timeSinceLastJump < this.JUMP_COOLDOWN) {
      return false;
    }

    // 현재 점프 중이면 큐에 추가
    if (this.isJumping) {
      this.jumpQueue++;
    } else {
      this.startJump();
    }
    return true;
  }

  private startJump() {
    this.isJumping = true;
    this.jumpHeight = 0;
    this.lastJumpTime = Date.now();
  }

  public isActive(): boolean {
    return this.isJumping;
  }

  public getJumpHeight(): number {
    return this.jumpHeight;
  }
}
