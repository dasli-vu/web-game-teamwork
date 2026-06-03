import React, { useState } from 'react';

function CODPayment({ totalPrice, onSubmit, onBack }) {
  const [isProcessing, setIsProcessing] = useState(false); // Theo dõi trạng thái xác nhận đơn hàng
  const [agreeTerms, setAgreeTerms] = useState(false); // Quản lý việc đồng ý điều khoản

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản trước khi tiếp tục!');
      return; // Không cho đặt hàng nếu chưa đồng ý điều khoản
    }

    setIsProcessing(true); 
    // Hiển thị trạng thái đang xử lý
    setTimeout(() => {
      onSubmit({
        method: 'Cash on Delivery',
        amount: totalPrice,
        note: 'Thanh toán khi nhận hàng'
      });
      setIsProcessing(false);
    }, 1500); // hệ thống xử lý trong 1.5s
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3 fw-bold">Thanh Toán Khi Nhận Hàng</h5>
      <div className="alert alert-success" role="alert"> 
        <div className="d-flex align-items-center">
          <div style={{ fontSize: '2rem' }} className="me-3">🚚</div>
          <div>
            <strong>Phương thức COD (Cash on Delivery)</strong>
            <p className="mb-0 small mt-1">Bạn sẽ thanh toán tiền mặt khi nhân viên giao hàng tới địa chỉ của bạn.</p>
          </div>
        </div>
      </div>

      <div className="card bg-light mb-3">
        <div className="card-body">
          <h6 className="fw-bold mb-3">📋 Lợi ích của phương thức COD:</h6>
          <ul className="mb-0">
            <li>Không cần nhập thông tin thẻ tín dụng</li>
            <li>Thanh toán an toàn khi nhận hàng</li>
            <li>Có thể kiểm tra sản phẩm trước khi thanh toán</li>
            <li>Hỗ trợ thanh toán bằng tiền mặt hoặc chuyển khoản</li>
          </ul>
        </div>
      </div>

      <div className="card bg-light mb-3">
        <div className="card-body">
          <h6 className="fw-bold mb-3">⏱️ Thời gian xử lý đơn hàng:</h6>
          <ul className="mb-0">
            <li><strong>Xác nhận đơn hàng:</strong> 1-2 giờ sau khi đặt</li>
            <li><strong>Chuẩn bị hàng:</strong> 24 giờ</li>
            <li><strong>Giao hàng:</strong> 1-3 ngày làm việc tùy vào địa chỉ</li>
          </ul>
        </div>
      </div>

      <div className="alert alert-info">
        <strong>Tổng cộng:</strong> <span className="float-end text-success fw-bold">${totalPrice.toFixed(2)}</span>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="agreeTerms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="agreeTerms">
          Tôi đồng ý với <span className="btn btn-link p-0 text-decoration-none">điều khoản và điều kiện</span> của cửa hàng
        </label>
      </div>

      <div className="d-flex gap-2">
        <button type="button" className="btn btn-secondary w-100" onClick={onBack} disabled={isProcessing}>
          ← Quay lại
        </button>
        <button
          type="submit"
          className="btn btn-success w-100 fw-bold"
          disabled={isProcessing || !agreeTerms}
        >
          {isProcessing ? '⏳ Đang xử lý...' : '✓ Xác Nhận Đơn Hàng'}
        </button>
      </div>
    </form>
  );
}

export default CODPayment;
