import React from 'react';
// giới thiệu thẻ game


function GameModal({ game, onClose, onBuyNow }) {
  if (!game) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-light border-warning">
          <div className="modal-header border-warning">
            <h3 className="modal-title text-warning fw-bold">{game.title}</h3>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-5">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="img-fluid rounded"
                  style={{ height: '300px', objectFit: 'cover', width: '100%' }}
                />
              </div>

              <div className="col-md-7">
                <div className="mb-3">
                  <span className="badge bg-secondary mb-2">{game.category}</span>
                  <p className="text-muted">{game.description}</p>
                </div>

                <div className="mb-3">
                  <p className="mb-1"><strong className="text-warning">Mô tả chi tiết:</strong></p>
                  <p className="text-light">{game.details.fullDescription}</p>
                </div>

                <div className="mb-3">
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="mb-1"><strong className="text-warning">Ngày phát hành:</strong></p>
                      <p className="text-info">{game.details.releaseDate}</p>
                    </div>
                    <div className="col-6">
                      <p className="mb-1"><strong className="text-warning">Đánh giá:</strong></p>
                      <p className="text-info">⭐ {game.details.rating}</p>
                    </div>
                  </div>

                  <p className="mb-1"><strong className="text-warning">Nhà phát triển:</strong></p>
                  <p className="text-info mb-2">{game.details.developer}</p>

                  <p className="mb-1"><strong className="text-warning">Nền tảng:</strong></p>
                  <p className="text-info">{game.details.platform}</p>
                </div>

                <div className="mb-3">
                  <p className="mb-2"><strong className="text-warning">Tính năng nổi bật:</strong></p>
                  <ul className="text-light">
                    {game.details.features.map((feature, idx) => (
                      <li key={idx} className="mb-1">✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-warning">
            <span className="text-info fw-bold fs-5">${game.price}</span>
            <button 
              type="button" 
              className="btn btn-warning fw-bold"
              onClick={() => {
                onBuyNow(game);
                onClose();
              }}
            >
              💳 Mua Ngay
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameModal;
