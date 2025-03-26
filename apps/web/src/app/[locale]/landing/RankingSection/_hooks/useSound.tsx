'use client';

import { useCallback, useEffect, useRef } from 'react';

type SoundType =
  | 'click'
  | 'coin'
  | 'bounce'
  | 'success'
  | 'error'
  | 'switch'
  | 'gameStart'
  | 'gameOver'
  | 'levelUp'
  | 'jump'
  | 'hit'
  | 'throw'
  | 'powerUp'
  | 'powerDown';

export function useSound() {
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Remove event listeners after initialization
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
      audioContext.current?.close();
    };
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!audioContext.current) return;

    // Create oscillator-based sounds
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    // Configure sound based on type
    switch (type) {
      case 'click':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.current.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.1);
        break;

      case 'coin':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.current.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.1);
        break;

      case 'bounce':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.current.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.15);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.15);
        break;

      case 'success':
        // Play two notes in sequence
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioContext.current.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.3);
        break;

      case 'error':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.current.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.2);
        break;

      case 'switch':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, audioContext.current.currentTime);
        oscillator.frequency.linearRampToValueAtTime(500, audioContext.current.currentTime + 0.05);
        oscillator.frequency.linearRampToValueAtTime(300, audioContext.current.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.1);
        break;

      case 'gameStart':
        // Ascending arpeggio
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, audioContext.current.currentTime);
        oscillator.frequency.setValueAtTime(400, audioContext.current.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(500, audioContext.current.currentTime + 0.4);
        oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.6);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.8);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.8);
        break;

      case 'gameOver':
        // Descending arpeggio
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime);
        oscillator.frequency.setValueAtTime(500, audioContext.current.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(400, audioContext.current.currentTime + 0.4);
        oscillator.frequency.setValueAtTime(300, audioContext.current.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.6);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.8);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.8);
        break;

      case 'levelUp':
        // Fanfare
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(400, audioContext.current.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.current.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(800, audioContext.current.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.5);
        break;

      case 'jump':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.current.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.2);
        break;

      case 'hit':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.current.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.3);
        break;

      case 'throw':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(500, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.current.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.2);
        break;

      case 'powerUp':
        // Power on sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.current.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.01, audioContext.current.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.current.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.5);
        break;

      case 'powerDown':
        // Power off sound
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.current.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.current.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.current.currentTime + 0.5);
        break;
    }
  }, []);

  return { playSound };
}
