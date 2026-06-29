import './ConfirmDialog.css';

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', cancelText = 'Cancel', isDangerous = false }) {
  if (!isOpen) return null;
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="confirm-btn confirm-btn-cancel" onClick={onCancel}>{cancelText}</button>
          <button className={`confirm-btn confirm-btn-confirm ${isDangerous ? 'confirm-btn-danger' : ''}`} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
