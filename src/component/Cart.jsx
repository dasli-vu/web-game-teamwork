import React from 'react';

function Cart({ cartItems, removeFromCart, clearCart, onCheckout, onNavigateHome }) {
  const totalPayment = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container-fluid my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 fw-bold text-dark ps-3">🛒 Giỏ Hàng Của Bạn</h3>
        {onNavigateHome && (
          <button 
            className="btn btn-outline-secondary me-3"
            onClick={onNavigateHome}
          >
            ← Quay lại cửa hàng
          </button>
        )}
      </div>
      
      <div className="row g-4">
        {/* Cột hiển thị danh sách sản phẩm trong giỏ (Bên trái) */}
        <div className="col-lg-8">
            {cartItems.length === 0 ? (
            <div className="card shadow-lg p-5 text-center border-0 empty-cart">
              <div className="fs-1 mb-3">📭</div>
              <p className="text-muted fs-5 mb-4">Giỏ hàng của bạn đang trống rỗng.</p>
              {onNavigateHome ? (
                <button 
                  className="btn btn-warning fw-bold px-4 py-2"
                  onClick={onNavigateHome}
                >
                  🛍️ Quay lại cửa hàng
                </button>
              ) : (
                <a href="#home" className="btn btn-warning fw-bold px-4 py-2">
                  🛍️ Quay lại cửa hàng
                </a>
              )}
            </div>
          ) :(
            <div className="cart-items-container">
              <div className="card shadow-lg border-0 overflow-hidden">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item d-flex align-items-center justify-content-between p-3 border-bottom hover-effect">
                    {/* Ảnh và Tên Game */}
                    <div className="d-flex align-items-center flex-grow-1">
                      <div className="game-image-wrapper me-3">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="rounded game-thumbnail" 
                          style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                          onError={(e) => e.target.src = 'https://via.placeholder.com/100x60?text=No+Image'}
                        />
                      </div>
                      <div className="game-info flex-grow-1">
                        <h6 className="mb-1 fw-bold text-dark game-title">{item.title}</h6>
                        <small className="text-muted">{item.category}</small>
                      </div>
                    </div>

                    {/* Giá và Nút xóa */}
                    <div className="d-flex align-items-center gap-3 ms-3">
                      <span className="text-warning fw-bold price-tag">${item.price.toFixed(2)}</span>
                      <button 
                        className="btn btn-sm btn-danger remove-btn" 
                        onClick={() => removeFromCart(index)}
                        title="Xóa khỏi giỏ hàng"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}

                {/* Nút xóa sạch giỏ hàng */}
                {cartItems.length > 0 && (
                  <div className="p-3 bg-light border-top">
                    <button className="btn btn-sm btn-link text-danger p-0 text-decoration-none" onClick={clearCart}>
                      ❌ Xóa toàn bộ giỏ hàng
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Cột hiển thị Tóm tắt hóa đơn (Bên phải - Sidebar Style) */}
        <div className="col-lg-4">
          <div className="card shadow-lg p-4 border-0 bg-dark text-white sticky-top cart-summary">
            <h5 className="fw-bold mb-4 text-warning text-uppercase">📊 Tóm tắt đơn hàng</h5>
            
            {/* Chi tiết giỏ hàng */}
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-white">Số lượng sản phẩm:</span>
                <span className="fw-bold text-info badge bg-info text-dark">{cartItems.length}</span>
              </div>

              {/* Hiển thị từng sản phẩm trong giỏ */}
              {cartItems.length > 0 && (
                <div className="cart-item-details mb-3 pb-3 border-bottom">
                  <small className="text-muted d-block mb-2">Chi tiết sản phẩm:</small>
                  <div className="cart-items-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {cartItems.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between mb-2">
                        <small className="text-white truncate" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</small>
                        <small className="text-warning fw-bold">${item.price.toFixed(2)}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tổng cộng */}
              <div className="d-flex justify-content-between py-3 border-top border-warning">
                <span className="text-white fw-bold fs-6">Tổng cộng:</span>
                <span className="text-warning fw-bold fs-5">${totalPayment.toFixed(2)}</span>
              </div>
            </div>

            {/* Nút checkout */}
            <button 
              className="btn btn-warning w-100 fw-bold py-3 shadow-lg checkout-btn" 
              disabled={cartItems.length === 0}
              onClick={onCheckout}
            >
              💳 TIẾN HÀNH THANH TOÁN
            </button>

            {/* Thông tin hỗ trợ */}
            {cartItems.length === 0 && (
              <small className="text-muted text-center d-block mt-3">
                Thêm game vào giỏ hàng để bắt đầu thanh toán
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
