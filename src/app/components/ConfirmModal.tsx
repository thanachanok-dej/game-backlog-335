// ทำหน้าที่ยืนยันการลบเกม

'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  gameTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  gameTitle,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-card">
        <h3 className="confirm-modal-heading">ยืนยันการลบ</h3>
        <p className="confirm-modal-message">
          คุณแน่ใจหรือไม่ว่าต้องการลบเกม{' '}
          <span className="confirm-modal-target-title">"{gameTitle}"</span>?
        </p>
        <div className="confirm-modal-actions">
          <button onClick={onCancel} className="confirm-modal-cancel-btn">
            ยกเลิก
          </button>
          <button onClick={onConfirm} className="confirm-modal-delete-btn">
            ยืนยันลบ
          </button>
        </div>
      </div>
    </div>
  );
}