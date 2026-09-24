'use client';

import Link from 'next/link';
import { Game, GameStatus } from '../types/Game';
import { useGameContext } from '@/app/context/GameContext';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { dispatch } = useGameContext();

  return (
    <div className="game-card">
      <div className="game-card-content">
        <Link href={`/games/${game.id}`} className="game-card-title-link">
          {game.title}
        </Link>
        <div className="game-card-meta">
          <span className="game-platform">แพลตฟอร์ม: {game.platform}</span> |{' '}
          <span className="game-estimated-hours">คาดว่าเล่น: {game.hours} ชม.</span> |{' '}
          
          <label className="game-status-label">
            สถานะ:
            <select
              value={game.status}
              onChange={(e) =>
                dispatch({
                  type: 'QUICK_UPDATE_STATUS',
                  payload: { id: game.id, status: e.target.value as GameStatus },
                })
              }
              className="game-status-dropdown"
            >
              <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
              <option value="กำลังเล่น">กำลังเล่น</option>
              <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
            </select>
          </label>
        </div>
      </div>

      <div className="game-card-actions">
        <button
          onClick={() => dispatch({ type: 'START_EDIT_GAME', payload: game })}
          className="game-edit-btn"
        >
          แก้ไข
        </button>
        <button
          onClick={() =>
            dispatch({ type: 'SET_DELETE_CONFIRM_ID', payload: game.id })
          }
          className="game-delete-btn"
        >
          ลบ
        </button>
      </div>
    </div>
  );
}