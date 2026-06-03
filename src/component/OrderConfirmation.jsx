import React from 'react';

function OrderConfirmation({ order, onClose }) {
  const paymentMethodLabel = {
    'ewallet': '📱 Ví điện tử',
    'cod': '🚚 Thanh toán khi nhận'
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center py-5">
              {/* Success Icon */}
              <div style={{ fontSize: '4rem', color: '#28a745', marginBottom: '20px' }}>
                ✅
              </div>

              <h2 className="card-title fw-bold text-success mb-2">Đơn Hàng Đã Được Xác Nhận!</h2>
              <p className="text-muted mb-4">Cảm ơn bạn đã mua hàng. Dưới đây là chi tiết đơn hàng của bạn.</p>

              {/* Order ID */}
              <div className="bg-light p-3 rounded mb-4">
                <h5 className="fw-bold text-dark">Mã Đơn Hàng</h5>
                <h3 className="text-primary fw-bold">{order.orderId}</h3>
                <small className="text-muted">{order.date}</small>
              </div>

              {/* Customer Info */}
              <div className="text-start mb-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2">📋 Thông Tin Khách Hàng</h5>
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">Họ và tên</small>
                    <p className="fw-bold">{order.customerInfo.fullName}</p>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Email</small>
                    <p className="fw-bold">{order.customerInfo.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">Số điện thoại</small>
                    <p className="fw-bold">{order.customerInfo.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Địa chỉ giao hàng</small>
                    <p className="fw-bold">{order.customerInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="text-start mb-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2">🎮 Sản Phẩm Đã Mua</h5>
                {order.items.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center py-2">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded me-3"
                        style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                      />
                      <div className="text-start">
                        <p className="mb-1 fw-bold">{item.title}</p>
                        <small className="text-muted">{item.category}</small>
                      </div>
                    </div>
                    <span className="fw-bold text-info">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="text-start mb-4">
                <h5 className="fw-bold mb-3 border-bottom pb-2">💳 Thông Tin Thanh Toán</h5>
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">Phương thức thanh toán</small>
                    <p className="fw-bold">{paymentMethodLabel[order.paymentMethod]}</p>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Trạng thái thanh toán</small>
                    <p className="fw-bold">
                      <span className={`badge ${order.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                        {order.status === 'completed' ? '✓ Đã thanh toán' : '⏳ Chờ thanh toán'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-dark text-white p-3 rounded mb-4">
                <div className="d-flex justify-content-between mb-3">
                  <span>Số lượng sản phẩm:</span>
                  <strong>{order.items.length}</strong>
                </div>
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-warning">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Messages */}
              <div className="alert alert-info mb-4">
                <strong>📧 Xác nhận đơn hàng</strong> đã được gửi tới email <strong>{order.customerInfo.email}</strong>
              </div>

              {order.paymentMethod === 'cod' && (
                <div className="alert alert-warning">
                  <strong>🚚 Thông báo COD:</strong> Bạn sẽ thanh toán tiền mặt khi nhân viên giao hàng tới địa chỉ của bạn.
                </div>
              )}

              <div className="alert alert-success">
                <strong>📦 Tiếp theo:</strong> Chúng tôi sẽ liên hệ xác nhận đơn hàng trong 1-2 ngày. Vui lòng chờ thông báo từ chúng tôi.
              </div>

              {/* Action Button */}
              <button className="btn btn-primary btn-lg w-100 fw-bold" onClick={onClose}>
                ← Quay lại trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
