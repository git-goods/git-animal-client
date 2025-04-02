import type { CharacterManager } from './CharacterManager';
import type { EventManager } from './EventManager';
import { GAME_CONSTANTS } from './game-constants';

export interface GameEvent {
  type: 'CLICK' | 'DRAG_START' | 'DRAG_END' | 'DRAG_MOVE';
  targetId: number | null;
  position: { x: number; y: number };
}

export class InputHandler {
  private isDragging: number | null = null;
  private longPressTarget: number | null = null;
  private longPressTimer: NodeJS.Timeout | null = null;
  private eventManager: EventManager;
  private characterManager: CharacterManager;

  constructor(eventManager: EventManager, characterManager: CharacterManager) {
    this.eventManager = eventManager;
    this.characterManager = characterManager;
  }

  public handleMouseDown(e: React.MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }

    const character = this.characterManager.findCharacterAtPosition(position);
    this.longPressTarget = character?.getId() || null;

    this.eventManager.emit('CLICK', { type: 'CLICK', targetId: this.longPressTarget, position });

    this.longPressTimer = setTimeout(() => {
      this.isDragging = this.longPressTarget;
      this.longPressTarget = null;
      this.eventManager.emit('DRAG_START', { type: 'DRAG_START', targetId: this.isDragging, position });
    }, GAME_CONSTANTS.INTERACTION.LONG_PRESS_DURATION);
  }

  public handleMouseUp(e: React.MouseEvent, canvas: HTMLCanvasElement) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    const rect = canvas.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (this.longPressTarget !== null && this.isDragging === null) {
      this.eventManager.emit('CLICK', { type: 'CLICK', targetId: this.longPressTarget, position });
    }

    if (this.isDragging !== null) {
      this.eventManager.emit('DRAG_END', { type: 'DRAG_END', targetId: this.isDragging, position });
    }

    this.longPressTarget = null;
    this.isDragging = null;
  }

  public handleMouseMove(e: React.MouseEvent, canvas: HTMLCanvasElement) {
    if (this.isDragging === null) return;

    const rect = canvas.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    this.eventManager.emit('DRAG_MOVE', { type: 'DRAG_MOVE', targetId: this.isDragging, position });
  }

  public handleMouseLeave() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    this.longPressTarget = null;
    this.isDragging = null;
  }

  public cleanup() {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }
  }

  public isDraggingCharacter(characterId: number): boolean {
    return this.isDragging === characterId;
  }
}
