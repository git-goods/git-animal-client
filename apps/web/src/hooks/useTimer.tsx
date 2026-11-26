import { useCallback, useEffect, useRef, useState } from 'react';

export const useTimer = (initialTime: number) => {
  const [count, setCount] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && count > 0) {
      timerRef.current = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (count === 0) {
      setIsRunning(false);
      setIsFinished(true);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, count]);

  const startTimer = useCallback(() => {
    setCount(initialTime);
    setIsRunning(true);
    setIsFinished(false);
  }, [initialTime]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (count > 0) {
      setIsRunning(true);
    }
  }, [count]);

  const resetTimer = useCallback(() => {
    setCount(initialTime);
    setIsRunning(false);
    setIsFinished(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [initialTime]);

  return { count, isRunning, isFinished, startTimer, pauseTimer, resumeTimer, resetTimer };
};
