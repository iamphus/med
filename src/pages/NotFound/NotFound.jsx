import { Link } from 'react-router-dom';
import { FiAlertCircle, FiHome, FiArrowLeft } from 'react-icons/fi';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <FiAlertCircle />
        </div>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Trang Không Tồn Tại</h2>
        <p className="not-found-text">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <FiHome /> Về Trang Chủ
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-outline">
            <FiArrowLeft /> Quay Lại
          </button>
        </div>
      </div>
    </div>
  );
}
