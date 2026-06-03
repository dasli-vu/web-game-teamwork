import React, { useState } from 'react';

// Mặc định admin credentials - có thể thay đổi
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export default function AdminLogin({ show, onHide, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setErrors({ general: '❌ Tài khoản bị khóa. Vui lòng thử lại sau 1 phút.' });
      return;
    }

    const newErrors = {};

    if (!formData.username) newErrors.username = '👤 Username không được để trống';
    if (!formData.password) newErrors.password = '🔒 Password không được để trống';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Kiểm tra credentials
    if (formData.username === ADMIN_CREDENTIALS.username && 
        formData.password === ADMIN_CREDENTIALS.password) {
      
      localStorage.setItem('adminUser', JSON.stringify({
        username: formData.username,
        loginTime: new Date().toISOString()
      }));
      
      setSuccessMessage('✨ Đăng nhập Admin thành công!');
      setAttemptCount(0);
      
      setTimeout(() => {
        handleClose();
        onLoginSuccess();
      }, 1500);
    } else {
      const newCount = attemptCount + 1;
      setAttemptCount(newCount);
      
      if (newCount >= 3) {
        setIsLocked(true);
        setErrors({ general: '❌ Đăng nhập thất bại 3 lần. Tài khoản bị khóa!' });
        
        setTimeout(() => {
          setIsLocked(false);
          setAttemptCount(0);
        }, 60000); // Khóa 1 phút
      } else {
        setErrors({ 
          general: `❌ Username hoặc Password không chính xác! (Lần ${newCount}/3)` 
        });
      }
    }
  };

  const handleClose = () => {
    setFormData({ username: '', password: '' });
    setErrors({});
    setSuccessMessage('');
    setAttemptCount(0);
    setIsLocked(false);
    onHide();
  };

  if (!show) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-header" style={{ borderBottom: '3px solid #ff6b35' }}>
          <h2>🔐 Admin Dashboard Login</h2>
          <button className="btn-close-modal" onClick={handleClose}>✕</button>
        </div>

        {successMessage && (
          <div className="alert-success-modal">
            {successMessage}
          </div>
        )}

        <div className="login-modal-body">
          <form onSubmit={handleLogin}>
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label>👤 Username</label>
              <input
                type="text"
                className={`form-input ${errors.username ? 'error' : ''}`}
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Nhập username"
                disabled={isLocked}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label>🔒 Password</label>
              <input
                type="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập password"
                disabled={isLocked}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-submit" 
              disabled={isLocked}
              style={{ opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
            >
              {isLocked ? '🔒 Tài khoản bị khóa' : '✅ Đăng Nhập Admin'}
            </button>
          </form>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px', fontSize: '13px' }}>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>📝 Demo Credentials:</p>
            <p>👤 Username: <code style={{ backgroundColor: '#fff', padding: '2px 5px', borderRadius: '3px' }}>admin</code></p>
            <p>🔒 Password: <code style={{ backgroundColor: '#fff', padding: '2px 5px', borderRadius: '3px' }}>admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
