import React, { useState } from 'react';
import EWalletPayment from './EWalletPayment';
import CODPayment from './CODPayment';

function PaymentMethod({
  totalPrice,
  selectedPayment,
  onPaymentSelect,
  onPaymentSubmit,
  onBack
}) {
  const [step, setStep] = useState('select');

  const handlePaymentMethodClick = (method) => {
    onPaymentSelect(method);
    setStep('details');
  };

  if (step === 'details') {
    if (selectedPayment === 'ewallet') {
      return (
        <EWalletPayment
          totalPrice={totalPrice}
          onSubmit={onPaymentSubmit}
          onBack={() => setStep('select')}
        />
      );
    }

    if (selectedPayment === 'cod') {
      return (
        <CODPayment
          totalPrice={totalPrice}
          onSubmit={onPaymentSubmit}
          onBack={() => setStep('select')}
        />
      );
    }
  }

  return (
    <div>
      <h5 className="mb-4 fw-bold">
        Chọn phương thức thanh toán
      </h5>

      <div className="row g-3 mb-4">

        {/* E-Wallet */}
        <div className="col-md-6">
          <div
            className={`card ${
              selectedPayment === 'ewallet'
                ? 'border-primary border-3'
                : 'border-0 shadow-sm'
            }`}
            onClick={() => handlePaymentMethodClick('ewallet')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center py-4">
              <div className="fs-1 mb-2">📱</div>
              <h6 className="card-title fw-bold">
                Ví Điện Tử
              </h6>
              <small className="text-muted">
                Momo, ZaloPay
              </small>
            </div>
          </div>
        </div>

        {/* COD */}
        <div className="col-md-6">
          <div
            className={`card ${
              selectedPayment === 'cod'
                ? 'border-primary border-3'
                : 'border-0 shadow-sm'
            }`}
            onClick={() => handlePaymentMethodClick('cod')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-body text-center py-4">
              <div className="fs-1 mb-2">🚚</div>
              <h6 className="card-title fw-bold">
                Thanh Toán Khi Nhận
              </h6>
              <small className="text-muted">
                COD - Giao hàng tận nơi
              </small>
            </div>
          </div>
        </div>

      </div>

      <div className="alert alert-warning">
        <strong>Tổng cộng:</strong>
        <span className="float-end fs-5 text-success fw-bold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-secondary w-100"
          onClick={onBack}
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;