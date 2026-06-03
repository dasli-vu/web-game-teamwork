import React from 'react';

function Menu({ cartCount, onNavigate }) {
function Menu({ cartCount, currentUser, isLoggedIn, onLogout, onLoginClick }) {
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
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#orders"
                onClick={() => onNavigate('orders')}
              >
                📜 Lịch sử đơn hàng
              </a>
            </li>
          </ul>
          <button 
            className="btn btn-outline-warning position-relative"
            onClick={() => onNavigate('home')}
          >
            🛒 Giỏ hàng
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
          <div className="d-flex align-items-center gap-3">
            {/* Hiển thị thông tin user nếu đã login */}
            {isLoggedIn && (
              <span className="text-light">
                👤 {currentUser?.fullName}
              </span>
            )}
            
            {/* Nút giỏ hàng */}
            <button className="btn btn-outline-warning position-relative">
              🛒 Giỏ hàng
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Nút đăng nhập - chỉ hiển thị khi chưa login */}
            {!isLoggedIn && (
              <button 
                className="btn btn-outline-success" 
                onClick={onLoginClick}
              >
                👤 Đăng Nhập
              </button>
            )}

            {/* Nút đăng xuất - chỉ hiển thị khi đã login */}
            {isLoggedIn && (
              <button 
                className="btn btn-danger" 
                onClick={onLogout}
              >
                🚪 Đăng Xuất
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;