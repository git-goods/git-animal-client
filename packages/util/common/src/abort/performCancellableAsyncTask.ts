/**
 *
 * 비동기적으로 동작합니다.
 * AbortController를 통해 취소 가능합니다.
 * 지연된 실행을 사용합니다 (setTimeout).
 *
 * @param payload  처리할 데이터. 타입은 unknown으로, 어떤 타입의 데이터도 받을 수 있습니다.
 * @param signal  AbortSignal 객체입니다. 이를 통해 작업을 취소할 수 있습니다.
 */
function performCancellableAsyncTask(payload: unknown, { signal }: { signal?: AbortSignal } = {}): Promise<unknown> {
  if (signal?.aborted) {
    return Promise.reject(new AbortException());
  }

  return new Promise((resolve, reject) => {
    const abortHandler = () => {
      reject(new AbortException());
    };

    setTimeout(() => {
      signal?.removeEventListener('abort', abortHandler);
      resolve(payload);
    }, 0);

    signal?.addEventListener('abort', abortHandler);
  });
}

class AbortException extends DOMException {
  constructor() {
    super('Aborted', 'AbortError');
  }
}

export { performCancellableAsyncTask, AbortException };
