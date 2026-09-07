import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUsers, FiGrid, FiShield, FiSliders, FiLogOut, FiMenu, FiX,
  FiActivity, FiPhone, FiMail, FiUser, FiChevronRight, FiHome, FiHelpCircle, FiAlertCircle
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import './AdminLayout.css';

export default function AdminLayout({ children, currentTab = 'patients' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Sidebar should be closed by default on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Check if we're on mobile (< 992px)
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 992;
    }
    return false;
  });
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };
  
  // Handle window resize to close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992 && sidebarOpen) {
        setSidebarOpen(false);
      } else if (window.innerWidth >= 992 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  return (
    <div className="admin-wrapper">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-mobile-overlay" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar Left */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <FiActivity />
          </div>
          <div className="brand-text">
            <h2>MedLink Band</h2>
            <span>Hệ Thống Quản Lý</span>
          </div>
        </div>

        <div className="sidebar-section-label">CHỨC NĂNG HỆ THỐNG</div>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`nav-item ${currentTab === 'patients' ? 'active' : ''}`}
          >
            <FiUsers className="nav-icon" />
            <span>Quản Lý Bệnh Nhân</span>
          </Link>

          {/* Coming soon features - temporarily disabled */}
          {/* 
          <a href="#vongtay" className="nav-item">
            <FiShield className="nav-icon" />
            <span>Quản Lý Vòng Tay QR</span>
          </a>

          <a href="#lichsu" className="nav-item">
            <FiActivity className="nav-icon" />
            <span>Nhật Ký Quét Cấp Cứu</span>
          </a>

          <a href="#cauhinh" className="nav-item">
            <FiSliders className="nav-icon" />
            <span>Cấu Hình Hệ Thống</span>
          </a>
          */}
        </nav>

        <div className="sidebar-footer">
          <div className="user-mini-profile">
            <div className="user-avatar-sm">
              <FiUser />
            </div>
            <div className="user-info-sm">
              <span className="user-email-sm">{user?.email || 'admin@medlink.vn'}</span>
              <span className="user-role-sm">Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="admin-main-container">
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Ẩn/Hiện Sidebar"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <div className="topbar-support-info">
              <span><FiPhone /> Hot-line: 1900 8888</span>
              <span className="divider">•</span>
              <span><FiMail /> hotro@medlinkband.vn</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-user-badge">
              <FiUser className="user-icon" />
              <span>{user?.email || 'admin@medlink.vn'}</span>
            </div>
            <button onClick={() => setShowLogoutModal(true)} className="btn-logout-topbar">
              <FiLogOut /> <span>Đăng xuất</span>
            </button>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="admin-content-body">
          {children}
        </main>

        {/* Footer Notice */}
        <footer className="admin-footer-bar">
          <span>Thiết kế & Phát triển hệ thống bởi <strong>MedLink Band Vietnam</strong></span>
        </footer>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <div className="logout-modal-backdrop" onClick={() => setShowLogoutModal(false)}></div>
          <div className="logout-modal">
            <div className="logout-modal-icon">
              <FiAlertCircle />
            </div>
            <h3 className="logout-modal-title">Xác nhận đăng xuất</h3>
            <p className="logout-modal-text">
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống? 
              Tất cả dữ liệu chưa lưu sẽ bị mất.
            </p>
            <div className="logout-modal-actions">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="btn btn-outline logout-cancel-btn"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={confirmLogout} 
                className="btn btn-danger logout-confirm-btn"
              >
                <FiLogOut /> Đăng xuất
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

