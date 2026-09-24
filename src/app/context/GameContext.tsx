// สร้าง Context + Reducer ไว้ตรงนี้ ที่ทำให้สามารถแชร์ state และ dispatch ไปยัง component อื่น ๆ ได้

'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Game, GameFormData, GameStatus } from '../types/Game';
import { initialGames } from '@/app/data/gamedata';

interface State {
  games: Game[];
  formData: GameFormData;
  editingId: string | null;
  searchQuery: string;
  statusFilter: string;
  deleteConfirmId: string | null;
}

type Action =
  | { type: 'SET_FORM_DATA'; payload: Partial<GameFormData> }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: string }
  | { type: 'SET_DELETE_CONFIRM_ID'; payload: string | null }
  | { type: 'ADD_GAME'; payload: Omit<Game, 'id'> }
  | { type: 'UPDATE_GAME'; payload: { id: string; data: Partial<Game> } }
  | { type: 'DELETE_GAME'; payload: string }
  | { type: 'QUICK_UPDATE_STATUS'; payload: { id: string; status: GameStatus } }
  | { type: 'START_EDIT_GAME'; payload: Game }
  | { type: 'CANCEL_EDIT' };

const initialFormState: GameFormData = {
  title: '',
  platform: '',
  hours: '',
  status: 'ยังไม่เริ่ม',
};

const initialState: State = {
  games: initialGames,
  formData: initialFormState,
  editingId: null,
  searchQuery: '',
  statusFilter: 'ทั้งหมด',
  deleteConfirmId: null,
};

function gameReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload };

    case 'SET_DELETE_CONFIRM_ID':
      return { ...state, deleteConfirmId: action.payload };

    case 'ADD_GAME': {
      const newGame: Game = {
        ...action.payload,
        id: Date.now().toString(),
      };
      return {
        ...state,
        games: [...state.games, newGame],
        formData: initialFormState,
      };
    }

    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map((g) =>
          g.id === action.payload.id ? { ...g, ...action.payload.data } : g
        ),
        editingId: null,
        formData: initialFormState,
      };

    case 'DELETE_GAME':
      return {
        ...state,
        games: state.games.filter((g) => g.id !== action.payload),
        deleteConfirmId: null,
        editingId: state.editingId === action.payload ? null : state.editingId,
        formData: state.editingId === action.payload ? initialFormState : state.formData,
      };

    case 'QUICK_UPDATE_STATUS':
      return {
        ...state,
        games: state.games.map((g) =>
          g.id === action.payload.id ? { ...g, status: action.payload.status } : g
        ),
      };

    case 'START_EDIT_GAME':
      return {
        ...state,
        editingId: action.payload.id,
        formData: {
          title: action.payload.title,
          platform: action.payload.platform,
          hours: action.payload.hours.toString(),
          status: action.payload.status,
        },
      };

    case 'CANCEL_EDIT':
      return {
        ...state,
        editingId: null,
        formData: initialFormState,
      };

    default:
      return state;
  }
}

interface GameContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  filteredGames: Game[];
  displayedTotalHours: number; // เปลี่ยนชื่อตัวแปรให้ตรงกับการใช้งาน
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Derived State 1: ค้นหาชื่อเกมร่วมกับตัวกรองสถานะ
  const filteredGames = state.games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(state.searchQuery.toLowerCase());
    const matchesStatus =
      state.statusFilter === 'ทั้งหมด' || game.status === state.statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Derived State 2: คำนวณชั่วโมงรวมแบบ Dynamic
  // ถ้าเลือก "ทั้งหมด" -> รวมชั่วโมงทุกเกม
  // ถ้าเลือกสถานะเจาะจง -> รวมชั่วโมงเฉพาะสถานะนั้นๆ
  const displayedTotalHours = state.games
    .filter((game) =>
      state.statusFilter === 'ทั้งหมด'
        ? true
        : game.status === state.statusFilter
    )
    .reduce((sum, game) => sum + Number(game.hours || 0), 0);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        filteredGames,
        displayedTotalHours,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}