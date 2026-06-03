import React from 'react';

function Menu({ cartCount, currentView, onViewChange }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <button className="navbar-brand fw-bold text-warning btn bg-transparent border-0 p-0" onClick={() => onViewChange('shop')}>
          🎮 GAME STORE
        </button>
        <div className="collapse navbar-collapse id=navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button className={`nav-link btn border-0 ${currentView === 'shop' ? 'active fw-bold text-warning' : 'text-light'}`} onClick={() => onViewChange('shop')}>
                Cửa hàng
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn border-0 ${currentView === 'admin' ? 'active fw-bold text-warning' : 'text-light'}`} onClick={() => onViewChange('admin')}>
                💼 Dashboard Admin
              </button>
            </li>
          </ul>
          
          {currentView === 'shop' && (
            <button className="btn btn-outline-warning position-relative">
              🛒 Giỏ hàng
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
