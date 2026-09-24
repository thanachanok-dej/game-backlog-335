'use client';

import { useState } from 'react';
import { useGameContext } from '@/app/context/GameContext';
import { FormErrors } from '../types/Game';
import GameForm from './GameForm';
import GameCard from './GameCard';
import ConfirmModal from './ConfirmModal';

export default function GameExplorer() {
  const { state, dispatch, filteredGames, displayedTotalHours } = useGameContext();
  const [errors, setErrors] = useState<FormErrors>({});

  const gameToDelete = state.games.find((g) => g.id === state.deleteConfirmId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FORM_DATA', payload: { [name]: value } });
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!state.formData.title.trim()) newErrors.title = 'กรุณากรอกชื่อเกม';
    if (!state.formData.platform.trim()) newErrors.platform = 'กรุณาเลือกแพลตฟอร์ม';

    const hoursNum = Number(state.formData.hours);
    if (
      !state.formData.hours ||
      isNaN(hoursNum) ||
      !Number.isInteger(hoursNum) ||
      hoursNum <= 0
    ) {
      newErrors.hours = 'จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวกมากกว่า 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (state.editingId) {
      dispatch({
        type: 'UPDATE_GAME',
        payload: {
          id: state.editingId,
          data: {
            title: state.formData.title,
            platform: state.formData.platform,
            hours: Number(state.formData.hours),
            status: state.formData.status,
          },
        },
      });
    } else {
      dispatch({
        type: 'ADD_GAME',
        payload: {
          title: state.formData.title,
          platform: state.formData.platform,
          hours: Number(state.formData.hours),
          status: state.formData.status,
        },
      });
    }
    setErrors({});
  };

  return (
    <div className="game-explorer-container">
      <h1 className="game-explorer-page-title">Game Backlog</h1>

      {/* Derived State Display */}
      <div className="game-summary-banner">
        <p className="game-summary-text">
          รวมเวลาของเกม
          <strong className="game-summary-highlight">
            {state.statusFilter === 'ทั้งหมด' ? ' รวมทั้งหมด' : `ที่ [${state.statusFilter}]`}
          </strong>:{' '}
          <span className="game-summary-hours">{displayedTotalHours}</span> ชั่วโมง
        </p>
      </div>

      {/* Form */}
      <GameForm
        formData={state.formData}
        errors={errors}
        editingId={state.editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => dispatch({ type: 'CANCEL_EDIT' })}
      />

      {/* Control Panel: Search & Filter */}
      <div className="game-filter-panel">
        <div className="game-search-box">
          <input
            type="text"
            placeholder="🔍 ค้นหาชื่อเกม..."
            value={state.searchQuery}
            onChange={(e) =>
              dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
            }
            className="game-search-input"
          />
        </div>
        <div className="game-filter-box">
          <select
            value={state.statusFilter}
            onChange={(e) =>
              dispatch({ type: 'SET_STATUS_FILTER', payload: e.target.value })
            }
            className="game-filter-select"
          >
            <option value="ทั้งหมด">-- สถานะทั้งหมด --</option>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

      {/* Game List */}
      <div className="game-list-section">
        <h2 className="game-list-header">
          รายการเกม ({filteredGames.length} / {state.games.length})
        </h2>

        {filteredGames.length === 0 ? (
          <p className="game-list-empty">ไม่พบรายการเกมตรงตามเงื่อนไข</p>
        ) : (
          <div className="game-list-grid">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(state.deleteConfirmId)}
        gameTitle={gameToDelete?.title}
        onConfirm={() =>
          state.deleteConfirmId &&
          dispatch({ type: 'DELETE_GAME', payload: state.deleteConfirmId })
        }
        onCancel={() =>
          dispatch({ type: 'SET_DELETE_CONFIRM_ID', payload: null })
        }
      />
    </div>
  );
}