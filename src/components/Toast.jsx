import { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import './Toast.css';

export default function Toast({ 
  message, 
  type = 'success', // success, error, warning, info
  duration = 3000, 
  onClose 
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle />;
      case 'error':
        return <FiXCircle />;
      case 'warning':
        return <FiAlertCircle />;
      case 'info':
        return <FiInfo />;
      default:
        return <FiCheckCircle />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Thành công!';
      case 'error':
        return 'Lỗi!';
      case 'warning':
        return 'Cảnh báo!';
      case 'info':
        return 'Thông tin';
      default:
        return 'Thông báo';
    }
  };

  return (
    <div className={`toast-notification toast-${type}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-content">
        <div className="toast-title">{getTitle()}</div>
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={onClose}>
        <FiX />
      </button>
      <div className="toast-progress" style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
}
