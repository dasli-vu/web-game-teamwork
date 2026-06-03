import React, { useState, useEffect } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders.reverse()); // Show newest orders first
  }, []);

  const paymentMethodLabel = {
    'ewallet': '📱 Ví điện tử',
    'cod': '🚚 Thanh toán khi nhận'
  };

  const statusBadge = (status) => {
    if (status === 'completed') {
      return <span className="badge bg-success">✓ Đã thanh toán</span>;
    }
    return <span className="badge bg-warning">⏳ Chờ thanh toán</span>;
  };

  if (selectedOrder) {
    return (
      <div className="container my-5">
        <button className="btn btn-outline-secondary mb-4" onClick={() => setSelectedOrder(null)}>
          ← Quay lại danh sách đơn hàng
        </button>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-body">
                {/* Order Header */}
                <div className="bg-light p-3 rounded mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="fw-bold text-dark">Mã Đơn Hàng: <span className="text-primary">{selectedOrder.orderId}</span></h5>
                      <small className="text-muted">{selectedOrder.date}</small>
                    </div>
                    <div>
                      {statusBadge(selectedOrder.status)}
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-4">
                  <h6 className="fw-bold border-bottom pb-2 mb-3">📋 Thông Tin Khách Hàng</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <small className="text-muted">Họ và tên</small>
                      <p className="fw-bold">{selectedOrder.customerInfo.fullName}</p>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted">Email</small>
                      <p className="fw-bold">{selectedOrder.customerInfo.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <small className="text-muted">Số điện thoại</small>
                      <p className="fw-bold">{selectedOrder.customerInfo.phone}</p>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted">Địa chỉ giao hàng</small>
                      <p className="fw-bold">{selectedOrder.customerInfo.address}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h6 className="fw-bold border-bottom pb-2 mb-3">🎮 Sản Phẩm Đã Mua</h6>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
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
                <div className="mb-4">
                  <h6 className="fw-bold border-bottom pb-2 mb-3">💳 Thông Tin Thanh Toán</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <small className="text-muted">Phương thức thanh toán</small>
                      <p className="fw-bold">{paymentMethodLabel[selectedOrder.paymentMethod]}</p>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted">Trạng thái</small>
                      <p>{statusBadge(selectedOrder.status)}</p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-dark text-white p-3 rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Số lượng sản phẩm:</span>
                    <strong>{selectedOrder.items.length}</strong>
                  </div>
                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-warning">${selectedOrder.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-4 fw-bold text-dark">📜 Lịch Sử Đơn Hàng</h3>

      {orders.length === 0 ? (
        <div className="card shadow-sm p-5 text-center border-0">
          <div className="fs-1 mb-3">📭</div>
          <p className="text-muted fs-5">Bạn chưa có đơn hàng nào.</p>
          <a href="/" className="btn btn-primary fw-bold align-self-center px-4">
            Bắt đầu mua sắm
          </a>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          {orders.map((order, index) => (
            <div key={index} className="p-3 border-bottom">
              <div className="row align-items-center">
                {/* Order Info */}
                <div className="col-lg-7">
                  <h6 className="fw-bold mb-1">{order.orderId}</h6>
                  <small className="text-muted">{order.date}</small>
                  <p className="mb-2 mt-2">
                    <span className="badge bg-light text-dark">{order.items.length} sản phẩm</span>
                    <span className="ms-2">{paymentMethodLabel[order.paymentMethod]}</span>
                  </p>
                </div>

                {/* Price and Status */}
                <div className="col-lg-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fs-6 fw-bold text-success">${order.totalPrice.toFixed(2)}</span>
                      <br />
                      {statusBadge(order.status)}
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Xem Chi Tiết →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
