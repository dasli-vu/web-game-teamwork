import React, { useState } from 'react';
import '../styles/Login.css';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export default function Login({ show, onHide, onLoginSuccess, onAdminLoginSuccess }) {
  const [currentPage, setCurrentPage] = useState('login');//KHởi tạo State
  const [formData, setFormData] = useState({//Lưu dữ liệu người dùng nhập vào form
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    adminUsername: '',
    adminPassword: ''
  });
  const [errors, setErrors] = useState({});//Lưu các lỗi validation.
  const [successMessage, setSuccessMessage] = useState('');//Hiển thị thông báo thành công.
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '', adminUsername: '', adminPassword: '' });
    setErrors({});
    setSuccessMessage('');
    setAttemptCount(0);
    setIsLocked(false);
  };

  const handleClose = () => {
    resetForm();
    setCurrentPage('login');
    onHide();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email không được để trống';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email không hợp lệ';

    if (!formData.password) newErrors.password = 'Mật khẩu không được để trống';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải ít nhất 6 ký tự';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === formData.email);

    if (!user) {
      setErrors({ email: 'Email chưa được đăng ký' });
      return;
    }

    if (user.password !== formData.password) {
      setErrors({ password: 'Mật khẩu không chính xác' });
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      fullName: user.fullName
    }));
    setSuccessMessage('✨ Đăng nhập thành công!');
    setTimeout(() => {
      handleClose();
      onLoginSuccess();
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Tên không được để trống';
    if (!formData.email) newErrors.email = 'Email không được để trống';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email không hợp lệ';

    if (!formData.password) newErrors.password = 'Mật khẩu không được để trống';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải ít nhất 6 ký tự';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === formData.email)) {
      setErrors({ email: 'Email đã được sử dụng' });
      return;
    }

    users.push({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccessMessage('✨ Đăng ký thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
      resetForm();
      setCurrentPage('login');
      setSuccessMessage('');
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email không được để trống';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email không hợp lệ';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === formData.email);

    if (!user) {
      setErrors({ email: 'Email chưa được đăng ký' });
      return;
    }

    setSuccessMessage(`✨ Mật khẩu: ${user.password}`);
    setTimeout(() => {
      resetForm();
      setSuccessMessage('');
    }, 5000);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setErrors({ adminGeneral: '❌ Tài khoản bị khóa. Vui lòng thử lại sau 1 phút.' });
      return;
    }

    const newErrors = {};

    if (!formData.adminUsername) newErrors.adminUsername = '👤 Username không được để trống';
    if (!formData.adminPassword) newErrors.adminPassword = '🔒 Password không được để trống';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.adminUsername === ADMIN_CREDENTIALS.username && 
        formData.adminPassword === ADMIN_CREDENTIALS.password) {
      
      localStorage.setItem('adminUser', JSON.stringify({
        username: formData.adminUsername,
        loginTime: new Date().toISOString()
      }));
      
      setSuccessMessage('✨ Đăng nhập Admin thành công!');
      setAttemptCount(0);
      
      setTimeout(() => {
        handleClose();
        onAdminLoginSuccess();
      }, 1500);
    } else {
      const newCount = attemptCount + 1;
      setAttemptCount(newCount);
      
      if (newCount >= 3) {
        setIsLocked(true);
        setErrors({ adminGeneral: '❌ Đăng nhập thất bại 3 lần. Tài khoản bị khóa!' });
        
        setTimeout(() => {
          setIsLocked(false);
          setAttemptCount(0);
          setFormData(prev => ({ ...prev, adminUsername: '', adminPassword: '' }));
        }, 60000);
      } else {
        setErrors({ 
          adminGeneral: `❌ Username hoặc Password không chính xác! (Lần ${newCount}/3)` 
        });
      }
    }
  };

  if (!show) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-header">
          <h2>
            {currentPage === 'login' && '🎮 Đăng Nhập'}
            {currentPage === 'signup' && '✍️ Đăng Ký'}
            {currentPage === 'forgot' && '🔑 Quên Mật Khẩu'}
            {currentPage === 'admin' && '🔐 Admin Dashboard Login'}
          </h2>
          <button className="btn-close-modal" onClick={handleClose}>✕</button>
        </div>

        {successMessage && (
          <div className="alert-success-modal">
            {successMessage.split('\n').map((msg, i) => <div key={i}>{msg}</div>)}
          </div>
        )}

        <div className="login-modal-body">
          {currentPage === 'login' && (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>📧 Email</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>🔒 Mật Khẩu</label>
                <input
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <button type="submit" className="btn-submit">Đăng Nhập</button>

              <button
                type="button"
                className="btn-link-modal"
                onClick={() => { setCurrentPage('forgot'); setErrors({}); }}
              >
                Quên mật khẩu?
              </button>
            </form>
          )}

          {currentPage === 'signup' && (
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>👤 Họ và Tên</label>
                <input
                  type="text"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nhập họ tên"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>📧 Email</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>🔒 Mật Khẩu</label>
                <input
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Tối thiểu 6 ký tự"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>✓ Xác Nhận Mật Khẩu</label>
                <input
                  type="password"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="btn-submit btn-signup">Đăng Ký</button>
            </form>
          )}

          {currentPage === 'forgot' && (
            <form onSubmit={handleForgotPassword}>
              <p className="text-muted-modal">Nhập email để lấy lại mật khẩu</p>
              <div className="form-group">
                <label>📧 Email</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <button type="submit" className="btn-submit btn-forgot">Lấy Mật Khẩu</button>
            </form>
          )}

          {currentPage === 'admin' && (
            <form onSubmit={handleAdminLogin}>
              {errors.adminGeneral && (
                <div className="alert alert-danger" role="alert">
                  {errors.adminGeneral}
                </div>
              )}

              <div className="form-group">
                <label>👤 Username</label>
                <input
                  type="text"
                  className={`form-input ${errors.adminUsername ? 'error' : ''}`}
                  name="adminUsername"
                  value={formData.adminUsername}
                  onChange={handleInputChange}
                  placeholder="Nhập username"
                  disabled={isLocked}
                />
                {errors.adminUsername && <span className="error-text">{errors.adminUsername}</span>}
              </div>

              <div className="form-group">
                <label>🔒 Password</label>
                <input
                  type="password"
                  className={`form-input ${errors.adminPassword ? 'error' : ''}`}
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleInputChange}
                  placeholder="Nhập password"
                  disabled={isLocked}
                />
                {errors.adminPassword && <span className="error-text">{errors.adminPassword}</span>}
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
          )}
        </div>

        <div className="login-modal-tabs">
          <button
            className={`tab-btn ${currentPage === 'login' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('login'); setErrors({}); }}
          >
            Đăng Nhập
          </button>
          <button
            className={`tab-btn ${currentPage === 'signup' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('signup'); setErrors({}); }}
          >
            Đăng Ký
          </button>
          <button
            className={`tab-btn ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('admin'); setErrors({}); }}
          >
            🔐 Admin
          </button>
        </div>
      </div>
    </div>
  );
}
