export class Character {
  private element: SVGElement | null = null;
  private isJumping: boolean = false;
  private jumpHeight: number = 24; // 점프 높이 조정
  private jumpDuration: number = 300;
  private currentY: number = 0; // 초기 Y 위치

  constructor(element: SVGElement) {
    this.element = element;
    this.init();
  }

  private init() {
    if (!this.element) return;

    // SVG 요소에 스타일 적용
    this.element.style.cursor = 'pointer';
    this.element.style.transition = `transform ${this.jumpDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    // 클릭 이벤트 리스너 추가
    this.element.addEventListener('click', () => this.jump());
  }

  private jump() {
    if (!this.element || this.isJumping) return;

    this.isJumping = true;
    this.element.style.transform = `translateY(-${this.jumpHeight}px)`;

    // 점프 후 원위치
    setTimeout(() => {
      if (this.element) {
        this.element.style.transform = 'translateY(0)';
        this.isJumping = false;
      }
    }, this.jumpDuration);
  }

  public destroy() {
    if (!this.element) return;
    this.element.removeEventListener('click', () => this.jump());
    this.element = null;
  }
}
