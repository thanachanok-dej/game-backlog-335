'use client';

import { GameFormData, FormErrors } from '../types/Game';

interface GameFormProps {
  formData: GameFormData;
  errors: FormErrors;
  editingId: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function GameForm({
  formData,
  errors,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}: GameFormProps) {
  return (
    <form onSubmit={onSubmit} className="game-form-container">
      <h2 className="game-form-title">
        {editingId ? 'แก้ไขรายการเกม' : 'เพิ่มเกมใหม่'}
      </h2>

      <div className="game-form-field">
        <label className="game-form-label">ชื่อเกม</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          className="game-form-input"
          placeholder="กรุณากรอกชื่อเกม"
        />
        {errors.title && <p className="game-form-error">{errors.title}</p>}
      </div>

      <div className="game-form-field">
        <label className="game-form-label">แพลตฟอร์ม</label>
        <select
          name="platform"
          value={formData.platform}
          onChange={onChange}
          className="game-form-select"
        >
          <option value="">-- กรุณาเลือกแพลตฟอร์ม --</option>
          <option value="PC">PC</option>
          <option value="Mobile">Mobile</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
        {errors.platform && <p className="game-form-error">{errors.platform}</p>}
      </div>

      <div className="game-form-field">
        <label className="game-form-label">จำนวนชั่วโมงที่คาดว่าจะใช้เล่น</label>
        <input
          type="number"
          name="hours"
          value={formData.hours}
          onChange={onChange}
          className="game-form-input"
          placeholder="กรุณากรอกจำนวนชั่วโมง"
        />
        {errors.hours && <p className="game-form-error">{errors.hours}</p>}
      </div>

      <div className="game-form-field">
        <label className="game-form-label">สถานะ</label>
        <select
          name="status"
          value={formData.status}
          onChange={onChange}
          className="game-form-select"
        >
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
      </div>

      <div className="game-form-buttons">
        <button type="submit" className="game-form-submit-btn">
          {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มเกม'}
        </button>
        {editingId && (
          <button type="button" onClick={onCancel} className="game-form-cancel-btn">
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}