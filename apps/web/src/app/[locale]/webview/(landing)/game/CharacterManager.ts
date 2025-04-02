import type { CharacterState } from './Character';
import { Character } from './Character';
import { GAME_CONSTANTS } from './game-constants';
import type { Position } from './game-types';

export class CharacterManager {
  private characters: Character[];

  constructor() {
    this.characters = this.initializeCharacters();
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

  public findCharacterAtPosition(position: Position): Character | null {
    return this.characters.find((character) => character.isPointInside(position)) || null;
  }

  public findCharacterById(id: number): Character | null {
    return this.characters.find((character) => character.getId() === id) || null;
  }

  public updateCharacters(deltaTime: number, canvasWidth: number, canvasHeight: number) {
    this.characters.forEach((character) => character.update(deltaTime, canvasWidth, canvasHeight));
  }

  public drawCharacters(ctx: CanvasRenderingContext2D) {
    this.characters.forEach((character) => character.draw(ctx));
  }

  public getCharacters(): Character[] {
    return this.characters;
  }

  public setCharacterImage(id: number, imageElement: HTMLImageElement) {
    const character = this.findCharacterById(id);
    if (character) {
      character.setImageElement(imageElement);
    }
  }
}
