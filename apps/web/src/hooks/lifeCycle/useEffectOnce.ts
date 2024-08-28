import { useEffect, useRef } from 'react';

function useEffectOnce(callback: () => void) {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    if (typeof callback === 'function') {
      callback();
    }
  }, []);
}

export default useEffectOnce;
