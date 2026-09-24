'use client';

import { GameProvider } from '@/app/context/GameContext';
import GameExplorer from '@/app/components/GameExplorer';

export default function GamesPage() {
  return (
    <GameProvider>
      <GameExplorer />
    </GameProvider>
  );
}