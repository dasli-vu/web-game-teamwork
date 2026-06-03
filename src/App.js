import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './component/Menu';
import Home from './component/Home';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import OrderHistory from './component/OrderHistory';
import Login from './component/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [directPurchaseItems, setDirectPurchaseItems] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Kiểm tra user đã login hay chưa khi component load
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('currentUser');
      setIsLoggedIn(false);
      setCurrentUser(null);
      setCart([]);
    }
  };

  // Hàm thêm game vào giỏ
  const addToCart = (game) => {
    setCart([...cart, game]);
  };

  // Hàm xóa 1 game khỏi giỏ dựa vào vị trí index
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  // Hàm xóa sạch bách giỏ hàng
  const clearCart = () => {
    if(window.confirm("Bạn có chắc chắn muốn xóa hết giỏ hàng không?")) {
      setCart([]);
    }
  };

  // Hàm mua ngay - bỏ qua giỏ hàng
  const handleBuyNow = (game) => {
    setDirectPurchaseItems([game]);
    setShowCheckout(true);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Truyền số lượng giỏ hàng vào Menu để hiển thị số lượng */}
      <Menu cartCount={cart.length} onNavigate={setCurrentPage} />
  // Nếu chưa login, hiển thị Home + Menu + Login Modal
  return (
    <div className="bg-light min-vh-100">
      {/* Menu navbar */}
      <Menu 
        cartCount={cart.length} 
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />
      
      {/* Login Modal */}
      <Login 
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Hiển thị trang chủ danh sách sản phẩm */}
      <Home addToCart={addToCart} />
      
      {/* Hiển thị trang dựa vào currentPage */}
      {currentPage === 'home' && (
        <>
          {/* Hiển thị trang chủ danh sách sản phẩm */}
          <Home addToCart={addToCart} onBuyNow={handleBuyNow} />
          
          <hr className="my-5" />

          {/* Hiển thị khu vực Giỏ hàng ở phía dưới */}
          <Cart 
            cartItems={cart} 
            removeFromCart={removeFromCart} 
            clearCart={clearCart}
            onCheckout={() => setShowCheckout(true)}
          />
        </>
      )}

      {currentPage === 'orders' && <OrderHistory />}

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          cartItems={directPurchaseItems || cart}
          onClose={() => {
            setShowCheckout(false);
            setDirectPurchaseItems(null);
          }}
          onOrderComplete={() => {
            setShowCheckout(false);
            setDirectPurchaseItems(null);
            clearCart();
          }}
          isDirectPurchase={!!directPurchaseItems}
        />
      )}
    </div>
  );
}

export default App;