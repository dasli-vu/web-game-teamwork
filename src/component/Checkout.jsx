import React, { useState } from 'react';
import PaymentMethod from './PaymentMethod'; // giao diện chọn thanh toán
import OrderConfirmation from './OrderConfirmation'; // giao diện xác nhận đơn hàng


function Checkout({ cartItems, onClose, onOrderComplete, isDirectPurchase = false }) {
  const [step, setStep] = useState('info'); // info: nhập thông tin khách hàng|| paymentpayment: chọn phương thức thanh toán || confirmation : xác nhận đơn hàng
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '' // Lưu thông tin khách hàng nhập vào
  });
  const [selectedPayment, setSelectedPayment] = useState(null); // Lưu phương thức thanh toán đã chọn
  const [orderData, setOrderData] = useState(null); // Lưu thông tin đơn hàng sau khi đặt thành công

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      alert('Email không hợp lệ!'); // Kiểm tra định dạng email
      return;
    }
    if (!/^[0-9]{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) {
      alert('Số điện thoại phải có 10 chữ số!');//Kiểm tra số điện thoại có đúng 10 số
      return;
    }
    setStep('payment'); //Kiểm tra số điện thoại có đúng 10 số
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handlePaymentSubmit = (paymentDetails) => {
    const newOrder = { // Tạo object đơn hàng mới
      orderId: 'ORD-' + Date.now(), // mã đơn hàng !!!!
      date: new Date().toLocaleString('vi-VN'),
      customerInfo,
      items: cartItems,
      totalPrice,
      paymentMethod: selectedPayment, // Lưu phương thức thanh toán
      paymentDetails, // Lưu thông tin chi tiết thanh toán 
      status: selectedPayment === 'cod' ? 'pending' : 'completed'
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    setOrderData(newOrder);
    setStep('confirmation');
  };

  const handleConfirmationClose = () => {
    onOrderComplete();
  };

  if (step === 'confirmation' && orderData) {
    return <OrderConfirmation order={orderData} onClose={handleConfirmationClose} />;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
      <div className="modal d-block" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: 'transparent' }}>
        <div className="modal-dialog modal-lg" style={{ maxHeight: '90vh', overflow: 'auto' }}>
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">
                {step === 'info' && '📋 Thông tin khách hàng'}
                {step === 'payment' && '💳 Chọn phương thức thanh toán'}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {step === 'info' && (
                <form onSubmit={handleInfoSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control"
                      value={customerInfo.fullName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="Nhập email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Số điện thoại</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="Nhập số điện thoại (10 chữ số)"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Địa chỉ giao hàng</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="Nhập địa chỉ giao hàng"
                    ></textarea>
                  </div>

                  <div className="alert alert-info">
                    <strong>Tổng cộng:</strong> ${totalPrice.toFixed(2)}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    Tiếp tục →
                  </button>
                </form>
              )}

              {step === 'payment' && (
                <PaymentMethod
                  totalPrice={totalPrice}
                  selectedPayment={selectedPayment}
                  onPaymentSelect={handlePaymentSelect}
                  onPaymentSubmit={handlePaymentSubmit}
                  onBack={() => setStep('info')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
