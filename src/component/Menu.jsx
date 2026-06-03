import React from 'react';

function Menu({ cartCount, currentUser, isLoggedIn, isAdminLoggedIn, onLogout, onAdminLogout, onLoginClick, onAdminLoginClick, onNavigate }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <a 
          className="navbar-brand fw-bold text-warning cursor-pointer" 
          href="#home"
          onClick={() => onNavigate('home')}
        >
          🎮 GAME STORE
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a 
                className="nav-link active" 
                href="#shop"
                onClick={() => onNavigate('home')}
              >
                Cửa hàng
              </a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a 
                  className="nav-link" 
                  href="#orders"
                  onClick={() => onNavigate('orders')}
                >
                  📜 Lịch sử đơn hàng
                </a>
              </li>
            )}
            {isAdminLoggedIn && (
              <li className="nav-item">
                <a 
                  className="nav-link" 
                  href="#admin"
                  onClick={() => onNavigate('admin')}
                >
                  ⚙️ Dashboard Admin
                </a>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            {/* Hiển thị thông tin user nếu đã login */}
            {isLoggedIn && !isAdminLoggedIn && (
              <span className="text-light me-2">
                👤 {currentUser?.fullName}
              </span>
            )}

            {isAdminLoggedIn && (
              <span className="text-warning me-2 fw-bold">
                🔐 Admin Mode
              </span>
            )}
            
            {/* Nút giỏ hàng - chỉ hiển thị khi không phải admin */}
            {!isAdminLoggedIn && (
              <button className="btn btn-outline-warning position-relative me-2">
                🛒 Giỏ hàng
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Nút Admin Login - chỉ hiển thị khi chưa login admin */}
            {!isAdminLoggedIn && (
              <button 
                className="btn btn-outline-danger me-2" 
                onClick={onAdminLoginClick}
              >
                🔐 Admin
              </button>
            )}

            {/* Nút đăng nhập - chỉ hiển thị khi chưa login user */}
            {!isLoggedIn && !isAdminLoggedIn && (
              <button 
                className="btn btn-outline-success me-2" 
                onClick={onLoginClick}
              >
                👤 Đăng Nhập
              </button>
            )}

            {/* Nút đăng xuất user - chỉ hiển thị khi đã login user */}
            {isLoggedIn && !isAdminLoggedIn && (
              <button 
                className="btn btn-danger" 
                onClick={onLogout}
              >
                🚪 Đăng Xuất
              </button>
            )}

            {/* Nút đăng xuất admin - chỉ hiển thị khi đã login admin */}
            {isAdminLoggedIn && (
              <button 
                className="btn btn-danger" 
                onClick={onAdminLogout}
              >
                🚪 Exit Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
