type EventCallback = (data: any) => void;

/**
 * 게임 내의 이벤트를 관리하는 클래스
 * 이벤트 구독(on), 발생(emit), 구독 해제(off) 기능을 제공합니다.
 */
export class EventManager {
  private eventEmitter: Map<string, EventCallback[]>;

  constructor() {
    this.eventEmitter = new Map();
  }

  /**
   * 특정 이벤트에 대한 콜백 함수를 등록합니다.
   */
  public on(event: string, callback: EventCallback) {
    if (!this.eventEmitter.has(event)) {
      this.eventEmitter.set(event, []);
    }
    this.eventEmitter.get(event)?.push(callback);
  }

  /**
   * 특정 이벤트를 발생시키고 등록된 모든 콜백 함수를 실행합니다.
   */
  public emit(event: string, data: any) {
    const callbacks = this.eventEmitter.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  /**
   * 특정 이벤트에 대한 콜백 함수를 제거합니다.
   */
  public off(event: string, callback: EventCallback) {
    const callbacks = this.eventEmitter.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}
