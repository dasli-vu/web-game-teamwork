import React, { useState } from 'react';

function EWalletPayment({ totalPrice, onSubmit, onBack }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const wallets = [
    {
      id: 'momo',
      name: 'Momo',
      icon: '🔴',
      color: '#EF5350',
      description: 'Ví điện tử Momo',
      placeholder: 'Số điện thoại Momo'
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      icon: '⚪',
      color: '#0099FF',
      description: 'Ví điện tử ZaloPay',
      placeholder: 'Số điện thoại ZaloPay'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedWallet) {
      alert('Vui lòng chọn ví điện tử!');
      return;
    }
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length !== 10) {
      alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số)!');
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const walletName = wallets.find(w => w.id === selectedWallet)?.name;
      onSubmit({
        walletType: walletName,
        phoneNumber: phoneNumber,
        amount: totalPrice
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3 fw-bold">Chọn ví điện tử</h5>

      <div className="row g-3 mb-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="col-md-6">
            <div
              className={`card cursor-pointer transition ${
                selectedWallet === wallet.id ? 'border-primary border-3' : 'border-0 shadow-sm'
              }`}
              onClick={() => setSelectedWallet(wallet.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <div style={{ fontSize: '3rem' }}>{wallet.icon}</div>
                <h6 className="card-title fw-bold mt-2">{wallet.name}</h6>
                <small className="text-muted">{wallet.description}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedWallet && (
        <div className="mb-3">
          <label className="form-label fw-bold">Số điện thoại đã đăng ký</label>
          <input
            type="tel"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="Nhập số điện thoại (10 chữ số)"
            maxLength="10"
          />
          <small className="text-muted">Nhập số điện thoại liên kết với tài khoản {wallets.find(w => w.id === selectedWallet)?.name}</small>
        </div>
      )}

      <div className="alert alert-warning">
        <strong>Tổng cộng:</strong> <span className="float-end text-success fw-bold">${totalPrice.toFixed(2)}</span>
      </div>

      <div className="alert alert-info">
        <small>
          <strong>Lưu ý:</strong> Bạn sẽ được chuyển hướng đến ứng dụng {selectedWallet ? wallets.find(w => w.id === selectedWallet)?.name : 'ví điện tử'} để hoàn tất thanh toán.
        </small>
      </div>

      <div className="d-flex gap-2">
        <button type="button" className="btn btn-secondary w-100" onClick={onBack} disabled={isProcessing}>
          ← Quay lại
        </button>
        <button
          type="submit"
          className="btn btn-primary w-100 fw-bold"
          disabled={isProcessing || !selectedWallet}
        >
          {isProcessing ? '⏳ Đang xử lý...' : '✓ Thanh Toán'}
        </button>
      </div>
    </form>
  );
}

export default EWalletPayment;
