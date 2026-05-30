import React from 'react';

function Product({ game, addToCart }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0 bg-dark text-light">
        <img 
          src={game.image} 
          className="card-img-top" 
          alt={game.title} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 text-start align-self-start">{game.category}</span>
          <h5 className="card-title text-warning text-truncate">{game.title}</h5>
          <p className="card-text text-muted small flex-grow-1">{game.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-info fw-bold">${game.price}</span>
            <button 
              className="btn btn-sm btn-warning fw-bold" 
              onClick={() => addToCart(game)}
            >
              + Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;