import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 카운트다운 타이머를 관리하는 커스텀 훅
 *
 * @param initialTime - 타이머의 초기 시간(초 단위)
 * @returns 타이머 상태와 제어 함수들을 포함하는 객체
 *  - count: 현재 남은 시간(초 단위)
 *  - isRunning: 타이머 실행 중 여부
 *  - isFinished: 타이머 종료 여부
 *  - startTimer: 타이머 시작 함수
 *  - pauseTimer: 타이머 일시 정지 함수
 *  - resumeTimer: 타이머 재개 함수
 *  - resetTimer: 타이머 리셋 함수
 *
 * @example
 * // 기본 사용
 * const { count, isRunning, startTimer, pauseTimer } = useTimer(60);
 *
 * @example
 * // 타이머 완료 시 동작 추가
 * const { count, isFinished } = useTimer(5);
 *
 * useEffect(() => {
 *   if (isFinished) {
 *     alert('타이머가 완료되었습니다!');
 *   }
 * }, [isFinished]);
 */
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
