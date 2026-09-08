import { FiAlertTriangle, FiX, FiTrash2 } from 'react-icons/fi';
import './ConfirmDialog.css';

export default function ConfirmDialog({ 
  title = 'Xác nhận',
  message, 
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm, 
  onCancel,
  type = 'danger' // danger, warning, info
}) {
  return (
    <div className="confirm-backdrop" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="confirm-close-btn" onClick={onCancel}>
          <FiX />
        </button>
        
        <div className={`confirm-icon confirm-icon-${type}`}>
          {type === 'danger' && <FiTrash2 />}
          {type === 'warning' && <FiAlertTriangle />}
          {type === 'info' && <FiAlertTriangle />}
        </div>
        
        <div className="confirm-content">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
        </div>
        
        <div className="confirm-actions">
          <button 
            className="btn btn-outline" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`btn ${type === 'danger' ? 'btn-danger' : type === 'warning' ? 'btn-warning' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
