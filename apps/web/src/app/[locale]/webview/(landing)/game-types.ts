export interface Position {
  x: number;
  y: number;
}

export interface Character {
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
}
