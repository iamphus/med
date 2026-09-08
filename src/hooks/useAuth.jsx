import { useState, useEffect, createContext, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence 
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Context để share auth state across components
const AuthContext = createContext({});

// Hook để sử dụng auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider component để wrap app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  // Session timeout duration: 30 minutes (in milliseconds)
  // For testing: use 30 seconds instead of 30 minutes
  // const SESSION_TIMEOUT_DURATION = 30 * 1000; // 30 giây (for testing)
  const SESSION_TIMEOUT_DURATION = 30 * 60 * 1000; // 30 phút (production)

  // Reset session timeout
  const resetSessionTimeout = () => {
    // Clear existing timeout
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }

    // Set new timeout only if user is logged in
    if (user) {
      const timeoutId = setTimeout(() => {
        console.log('Session timeout - Auto logout after 30 minutes of inactivity');
        signOut(auth);
      }, SESSION_TIMEOUT_DURATION);
      
      setSessionTimeout(timeoutId);
    }
  };

  // Track user activity to reset session timeout
  useEffect(() => {
    if (!user) return;

    // Events that indicate user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    // Reset timeout on any user activity
    const handleActivity = () => {
      resetSessionTimeout();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initial timeout setup
    resetSessionTimeout();

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [user]);

  // Theo dõi auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Reset session timeout when user logs in
      if (user) {
        resetSessionTimeout();
      }
    });

    return unsubscribe;
  }, []);

  // Đăng nhập
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      // Thiết lập persistence để giữ session
      await setPersistence(auth, browserLocalPersistence);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (err) {
      let errorMessage = 'Đăng nhập thất bại';
      
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = 'Email không tồn tại';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mật khẩu không đúng';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email không hợp lệ';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Tài khoản đã bị khóa';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Quá nhiều lần thử. Vui lòng thử lại sau';
          break;
        default:
          errorMessage = err.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (err) {
      setError('Đăng xuất thất bại');
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
