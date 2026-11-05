import { useEffect } from 'react';
import { useGameStore } from '../stores/useGameStore';

export function useGameLoop() {
  const gameTick = useGameStore((state) => state.gameTick);

  useEffect(() => {
    const timer = setInterval(() => {
      gameTick();
    }, 1000);

    return () => clearInterval(timer);
  }, [gameTick]);
}
