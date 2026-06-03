import React, { useState } from 'react';
import '../styles/Login.css';

export default function Login({ show, onHide, onLoginSuccess }) {
  const [currentPage, setCurrentPage] = useState('login');//KHởi tạo State
  const [formData, setFormData] = useState({//Lưu dữ liệu người dùng nhập vào form
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({});//Lưu các lỗi validation.
  const [successMessage, setSuccessMessage] = useState('');//Hiển thị thông báo thành công.

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
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
    setErrors({});
    setSuccessMessage('');
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

  if (!show) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-header">
          <h2>
            {currentPage === 'login' && '🎮 Đăng Nhập'}
            {currentPage === 'signup' && '✍️ Đăng Ký'}
            {currentPage === 'forgot' && '🔑 Quên Mật Khẩu'}
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
        </div>
      </div>
    </div>
  );
}
