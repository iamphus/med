import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import EmergencyInfo from './pages/EmergencyInfo/EmergencyInfo';
import PatientManagement from './pages/PatientManagement/PatientManagement';
import DoctorAuth from './pages/DoctorAuth/DoctorAuth';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Đang kiểm tra phiên đăng nhập...
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Trang 1: Thông tin cấp cứu (Public) */}
          <Route path="/emergency/:patientId" element={<EmergencyInfo />} />

          {/* Trang 3: Xác thực bác sĩ & Bệnh án (Public nhưng cần OTP) */}
          <Route path="/medical-record/:patientId" element={<DoctorAuth />} />

          {/* Trang Login */}
          <Route path="/login" element={<Login />} />

          {/* Trang 2: Quản lý bệnh nhân (Protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PatientManagement />
              </ProtectedRoute>
            }
          />

          {/* Redirect mặc định */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
