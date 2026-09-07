import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiMail, FiLock, FiArrowRight, FiShield, FiHeart, FiZap, FiUsers, FiAlertCircle } from 'react-icons/fi';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, error: authError, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setIsSubmitting(true);

    // Call Firebase login
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setLocalError(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-bg-shapes">
        <div className="login-bg-shape"></div>
        <div className="login-bg-shape"></div>
        <div className="login-bg-shape"></div>
        <div className="login-bg-shape"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="login-brand-logo">
            <div className="login-brand-icon">
              <FiHeart />
            </div>
            <div className="login-brand-text">
              <h1>Med<span>Link</span> Band</h1>
              <p>Hệ thống thông tin cấp cứu y tế thông minh</p>
            </div>
          </div>

          <div className="login-features">
            <div className="login-feature">
              <div className="login-feature-icon">
                <FiZap />
              </div>
              <div className="login-feature-content">
                <h3>Cấp cứu nhanh chóng</h3>
                <p>Quét QR/NFC để xem thông tin y tế trong 1-2 giây</p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                <FiShield />
              </div>
              <div className="login-feature-content">
                <h3>Bảo mật tuyệt đối</h3>
                <p>Dữ liệu bệnh án được mã hóa và xác thực đa lớp</p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                <FiUsers />
              </div>
              <div className="login-feature-content">
                <h3>Quản lý tập trung</h3>
                <p>Dashboard mạnh mẽ cho viện dưỡng lão & bệnh viện</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-card">
          <div className="login-card-header">
            <div className="login-card-icon">
              <FiShield />
            </div>
            <h2>Đăng nhập</h2>
            <p>Truy cập vào hệ thống quản lý</p>
          </div>

          {(localError || authError) && (
            <div className="login-error-alert">
              <FiAlertCircle className="login-error-icon" />
              <span>{localError || authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <div className="login-input-wrapper">
                <input
                  type="email"
                  id="email"
                  className="login-input"
                  placeholder="admin@medlinkband.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                <FiMail className="login-input-icon" />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="login-input-wrapper">
                <input
                  type="password"
                  id="password"
                  className="login-input"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                <FiLock className="login-input-icon" />
              </div>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <a href="#forgot" className="login-forgot">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="login-spinner"></div>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <span>Đăng nhập</span>
                  <FiArrowRight />
                </>
              )}
            </button>

            <div className="login-divider">Demo Credentials</div>

            <div className="login-demo-hint">
              <p>
                <strong>Tạo tài khoản admin đầu tiên:</strong>
                <br />
                Vào Firebase Console → Authentication → Users → Add User
                <br />
                <code>admin@medlinkband.vn</code> / <code>password của bạn</code>
              </p>
            </div>
          </form>

          <div className="login-footer">
            <p>&copy; 2024 MedLink Band Vietnam. All rights reserved.</p>
            <div className="login-footer-links">
              <a href="#privacy" className="login-footer-link">Chính sách bảo mật</a>
              <a href="#terms" className="login-footer-link">Điều khoản sử dụng</a>
              <a href="#support" className="login-footer-link">Hỗ trợ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

