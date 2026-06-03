import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './component/Menu';
import Home from './component/Home';
import Cart from './component/Cart';
import Dashboard from './component/Dashboard';
import initialGamesData from './component/database.json';

function App() {
  const [view, setView] = useState('shop'); // Điều hướng giữa 'shop' và 'admin'
  const [games, setGames] = useState(initialGamesData); // Quản lý mảng danh sách game tập trung
  const [cart, setCart] = useState([]); // Trạng thái sản phẩm mua trong giỏ hàng
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

  // Tính năng giỏ hàng mua sản phẩm
  const addToCart = (game) => {
    setCart([...cart, game]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hết giỏ hàng không?")) {
      setCart([]);
    }
  };

  // Tính năng CRUD Admin hệ thống
  const handleAddGame = (newGame) => {
    setGames([newGame, ...games]);
    alert("Đã thêm game mới vào hệ thống cửa hàng thành công!");
  };

  const handleUpdateGame = (updatedGame) => {
    setGames(games.map(g => g.id === updatedGame.id ? updatedGame : g));
    alert("Đã cập nhật thông tin thành công!");
  };

  const onDeleteGame = (gameId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tựa game này khỏi cửa hàng không?")) {
      setGames(games.filter(g => g.id !== gameId));
    }
  // Hàm mua ngay - bỏ qua giỏ hàng
  const handleBuyNow = (game) => {
    setDirectPurchaseItems([game]);
    setShowCheckout(true);
  };

  return (
    <div className="bg-light min-vh-100">
      <Menu cartCount={cart.length} currentView={view} onViewChange={setView} />
      
      {view === 'shop' ? (
        <>
          <Home gamesData={games} addToCart={addToCart} />
          <hr className="my-5" />
          <Cart cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
        </>
      ) : (
        <Dashboard 
          games={games} 
          onAddGame={handleAddGame} 
          onUpdateGame={handleUpdateGame} 
          onDeleteGame={onDeleteGame} 
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