export class Character {
  private element: HTMLElement | null = null;
  private isJumping: boolean = false;
  private jumpHeight: number = 30; // 점프 높이 조정
  private jumpDuration: number = 500;
  private currentY: number = 100; // 초기 Y 위치

  constructor(elementId: string) {
    this.element = document.getElementById(elementId);
    this.init();
  }

  private init() {
    if (!this.element) return;

    this.element.style.cursor = 'pointer';
    this.element.addEventListener('click', () => this.jump());
  }

  private jump() {
    if (!this.element || this.isJumping) return;

    this.isJumping = true;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.jumpDuration, 1);

      // 점프 곡선 계산 (포물선)
      const jumpProgress = Math.sin(progress * Math.PI);
      const newY = this.currentY - this.jumpHeight * jumpProgress;

      // transform 속성 업데이트
      const currentTransform = this.element!.getAttribute('transform') || '';
      const translateMatch = currentTransform.match(/translate\(([^,]+),([^)]+)\)/);

      if (translateMatch) {
        const x = translateMatch[1];
        const newTransform = `translate(${x}, ${newY})`;
        this.element!.setAttribute('transform', newTransform);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.currentY = newY;
        this.isJumping = false;
      }
    };

    requestAnimationFrame(animate);
  }

  public destroy() {
    if (!this.element) return;
    this.element.removeEventListener('click', () => this.jump());
    this.element = null;
  }
}
