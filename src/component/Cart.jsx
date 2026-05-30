import React from 'react';

function Cart({ cartItems, removeFromCart, clearCart }) {
  // Hàm tính tổng tiền của tất cả các game trong giỏ
  const totalPayment = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container my-5">
      <h3 className="mb-4 fw-bold text-dark">🛒 Giỏ Hàng Của Bạn</h3>
      
      <div className="row">
        {/* Cột hiển thị danh sách sản phẩm trong giỏ (Bên trái) */}
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <div className="card shadow-sm p-5 text-center border-0">
              <div className="fs-1 mb-3">📭</div>
              <p className="text-muted fs-5">Giỏ hàng của bạn đang trống rỗng.</p>
              <a href="#shop" className="btn btn-warning fw-bold align-self-center px-4">
                Quay lại cửa hàng
              </a>
            </div>
          ) : (
            <div className="card shadow-sm p-4 border-0">
              {cartItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between border-bottom py-3">
                  {/* Ảnh và Tên Game */}
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="rounded me-3" 
                      style={{ width: '80px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-1 fw-bold text-dark">{item.title}</h6>
                      <small className="text-muted">{item.category}</small>
                    </div>
                  </div>

                  {/* Giá và Nút xóa */}
                  <div className="d-flex align-items-center">
                    <span className="text-info fw-bold me-4">${item.price}</span>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => removeFromCart(index)} // Xóa món hàng dựa trên vị trí index
                      title="Xóa khỏi giỏ hàng"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              ))}

              {/* Nút xóa sạch giỏ hàng */}
              <div className="text-start mt-3">
                <button className="btn btn-sm btn-link text-danger p-0 text-decoration-none" onClick={clearCart}>
                  ❌ Xóa toàn bộ giỏ hàng
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cột hiển thị Tổng kết hóa đơn (Bên phải) */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow-sm p-4 border-0 bg-dark text-white">
            <h5 className="fw-bold mb-4 text-warning">Tóm tắt đơn hàng</h5>
            <div className="d-flex justify-content-between mb-3">
              <span>Số lượng sản phẩm:</span>
              <span className="fw-bold">{cartItems.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-4 border-top pt-3 fs-5">
              <span className="text-muted">Tổng cộng:</span>
              <span className="text-warning fw-bold">${totalPayment.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn btn-warning w-100 fw-bold py-2 shadow-sm" 
              disabled={cartItems.length === 0}
              onClick={() => alert("Chức năng thanh toán sẽ được hoàn thiện ở bài sau!")}
            >
              💳 TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
