import React, { useState } from 'react';
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
        />
      )}
    </div>
  );
}

export default App;