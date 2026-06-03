import React, { useState } from 'react';
<<<<<<< Updated upstream
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './component/Menu';
import Home from './component/Home';
import Cart from './component/Cart'; // 1. Import file Cart vào đây
=======
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Menu from './component/Menu'; 
import Home from './component/Home'; 
>>>>>>> Stashed changes

function App() {
  const [cart, setCart] = useState([]);

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

  return (
    <div className="bg-light min-vh-100">
      {/* Truyền số lượng giỏ hàng vào Menu để hiển thị số lượng */}
      <Menu cartCount={cart.length} />
      
      {/* Hiển thị trang chủ danh sách sản phẩm */}
      <Home addToCart={addToCart} />
      
      <hr className="my-5" />

      {/* Hiển thị khu vực Giỏ hàng ở phía dưới */}
      <Cart 
        cartItems={cart} 
        removeFromCart={removeFromCart} 
        clearCart={clearCart} 
      />
    </div>
  );
}

export default App;