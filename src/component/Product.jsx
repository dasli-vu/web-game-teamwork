import React, { useState } from 'react';

function Product({ game, addToCart, onCardClick, onBuyNow }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError ? '/placeholder-game.svg' : game.image;

  return (
    <div className="col-md-4 mb-4">
      <div 
        className="card h-100 shadow-sm border-0 bg-dark text-light"
        style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
        onClick={() => onCardClick(game)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 193, 7, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <img 
          src={imageUrl}
          onError={handleImageError}
          className="card-img-top" 
          alt={game.title} 
          style={{ height: '200px', objectFit: 'cover', cursor: 'pointer', backgroundColor: '#2a2a2a' }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 text-start align-self-start">{game.category}</span>
          <h5 className="card-title text-warning text-truncate">{game.title}</h5>
          <p className="card-text text-muted small flex-grow-1">{game.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
            <span className="text-info fw-bold">${game.price}</span>
            <div className="d-flex gap-1">
              <button 
                className="btn btn-sm btn-outline-warning fw-bold flex-grow-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(game);
                }}
                title="Thêm vào giỏ hàng"
              >
                🛒
              </button>
              <button 
                className="btn btn-sm btn-warning fw-bold flex-grow-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyNow(game);
                }}
                title="Mua ngay"
              >
                💳
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;