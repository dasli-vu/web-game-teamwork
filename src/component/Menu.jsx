import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Menu({ cartCount, cartItems = [], currentUser, isLoggedIn, isAdminLoggedIn, onLogout, onAdminLogout, onLoginClick, onNavigate, onCheckout }) {
  const [showCartDropdown, setShowCartDropdown] = React.useState(false);
  
  const totalPayment = cartItems.reduce((total, item) => total + item.price, 0);
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
            {!isAdminLoggedIn && (
              <li className="nav-item">
                <a 
                  className="nav-link" 
                  href="#cart"
                  onClick={() => onNavigate('cart')}
                >
                  🛒 Giỏ Hàng Chi Tiết
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
            {/* Language Switcher */}
            <LanguageSwitcher />

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
              <div className="position-relative cart-dropdown-wrapper">
                <button 
                  className="btn btn-outline-warning position-relative me-2"
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                >
                  🛒 Giỏ hàng
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                {/* Cart Dropdown Summary */}
                {showCartDropdown && (
                  <div className="cart-dropdown-menu bg-dark text-white p-3 rounded mt-2 position-absolute end-0" 
                       style={{
                         minWidth: '300px',
                         maxWidth: '350px',
                         zIndex: 1000,
                         boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                       }}>
                    <h6 className="text-warning fw-bold mb-3 text-uppercase">📊 Tóm tắt đơn hàng</h6>
                    
                    {cartItems.length === 0 ? (
                      <div className="text-center py-3">
                        <p className="text-muted mb-0">Giỏ hàng trống</p>
                      </div>
                    ) : (
                      <>
                        {/* Số lượng sản phẩm */}
                        <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-secondary">
                          <span className="text-white">Số lượng sản phẩm:</span>
                          <span className="fw-bold text-info badge bg-info text-dark">{cartItems.length}</span>
                        </div>
                        
                        {/* Danh sách sản phẩm */}
                        <div className="mb-3 pb-3 border-bottom border-secondary">
                          <small className="text-muted d-block mb-2">Chi tiết sản phẩm:</small>
                          <div className="cart-items-dropdown" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {cartItems.map((item, index) => (
                              <div key={index} className="d-flex justify-content-between mb-2">
                                <small className="text-white" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.title}
                                </small>
                                <small className="text-warning fw-bold">${item.price.toFixed(2)}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Tổng cộng */}
                        <div className="d-flex justify-content-between py-3 border-top border-warning mb-3">
                          <span className="text-white fw-bold">Tổng cộng:</span>
                          <span className="text-warning fw-bold fs-6">${totalPayment.toFixed(2)}</span>
                        </div>
                        
                         {/* Nút Xem Giỏ Hàng */}
                         <button 
                           className="btn btn-warning w-100 fw-bold py-2"
                           onClick={() => {
                             onNavigate('cart');
                             setShowCartDropdown(false);
                          }}
                        >
                          🛒 Xem Giỏ Hàng
                        </button>
                        <button 
                          className="btn btn-success w-100 fw-bold py-2 mt-2"
                          onClick={() => {
                            setShowCartDropdown(false);
                            onCheckout();
                          }}
                        >
                          💳 Thanh Toán Ngay
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Nút đăng nhập - chỉ hiển thị khi chưa login */}
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
