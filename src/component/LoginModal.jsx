import React, { useState } from 'react';
import '../styles/LoginModal.css';

export default function LoginModal({ show, onHide, onLoginSuccess }) {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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
    setSuccessMessage('Đăng nhập thành công! 🎉');
    setTimeout(() => {
      onLoginSuccess();
      handleCloseModal();
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
    setSuccessMessage('Đăng ký thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
      setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
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

    setSuccessMessage(`Mật khẩu của bạn: ${user.password}\n(Lưu ý: Đây chỉ là demo, thực tế sẽ gửi link reset qua email)`);
    setTimeout(() => {
      setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
      setSuccessMessage('');
    }, 5000);
  };

  const handleCloseModal = () => {
    setCurrentPage('login');
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
    setErrors({});
    setSuccessMessage('');
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop show d-block" onClick={handleCloseModal}>
      <div className="modal d-block" role="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleCloseModal}
              aria-label="Close"
              title="Đóng (Esc)"
            ></button>

            <div className="modal-body p-4">
              <h2 className="modal-title text-center mb-4">
                {currentPage === 'login' && '🎮 Đăng Nhập'}
                {currentPage === 'signup' && '✍️ Đăng Ký Tài Khoản'}
                {currentPage === 'forgot' && '🔑 Quên Mật Khẩu'}
              </h2>

              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage.split('\n').map((msg, i) => <div key={i}>{msg}</div>)}
                </div>
              )}

              {/* FORM ĐĂNG NHẬP */}
              {currentPage === 'login' && (
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">📧 Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">🔒 Mật Khẩu</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu"
                    />
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Đăng Nhập
                  </button>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => { setCurrentPage('forgot'); setErrors({}); }}
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                </form>
              )}

              {/* FORM ĐĂNG KÝ */}
              {currentPage === 'signup' && (
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label className="form-label">👤 Họ và Tên</label>
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Nhập họ tên"
                    />
                    {errors.fullName && <div className="invalid-feedback d-block">{errors.fullName}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">📧 Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">🔒 Mật Khẩu</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Tối thiểu 6 ký tự"
                    />
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">✓ Xác Nhận Mật Khẩu</label>
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập lại mật khẩu"
                    />
                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                  </div>

                  <button type="submit" className="btn btn-success w-100 mb-3">
                    Đăng Ký
                  </button>
                </form>
              )}

              {/* FORM QUÊN MẬT KHẨU */}
              {currentPage === 'forgot' && (
                <form onSubmit={handleForgotPassword}>
                  <p className="text-muted mb-3">Nhập email của bạn để lấy lại mật khẩu</p>
                  <div className="mb-3">
                    <label className="form-label">📧 Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <button type="submit" className="btn btn-warning w-100 mb-3">
                    Lấy Mật Khẩu
                  </button>
                </form>
              )}

              {/* NÚT CHUYỂN TRANG */}
              <div className="d-flex gap-2 mt-4">
                <button
                  className={`btn w-50 ${currentPage === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => { setCurrentPage('login'); setErrors({}); setFormData({ email: '', password: '', confirmPassword: '', fullName: '' }); }}
                >
                  Đăng Nhập
                </button>
                <button
                  className={`btn w-50 ${currentPage === 'signup' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => { setCurrentPage('signup'); setErrors({}); setFormData({ email: '', password: '', confirmPassword: '', fullName: '' }); }}
                >
                  Đăng Ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
