import { GAME_CONSTANTS } from './game-constants';

export class SpeechBubble {
  private text: string;
  private timer: number;
  private isVisible: boolean;

  constructor() {
    this.text = '';
    this.timer = 0;
    this.isVisible = false;
  }

  public show(text: string, duration: number) {
    this.text = text;
    this.timer = duration;
    this.isVisible = true;
  }

  public update(deltaTime: number) {
    if (this.isVisible) {
      this.timer -= deltaTime;
      if (this.timer <= 0) {
        this.isVisible = false;
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.isVisible) return;

    ctx.save();

    ctx.font = '14px Arial';
    const textWidth = ctx.measureText(this.text).width;
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
    ctx.fillText(this.text, x, y);

    ctx.restore();
  }

  public isShowing(): boolean {
    return this.isVisible;
  }
}
