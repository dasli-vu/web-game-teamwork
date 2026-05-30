import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap từ node_modules
import Menu from './component/Menu'; // Sửa lại đường dẫn chính xác
import Home from './component/Home'; // Sửa lại đường dẫn chính xác

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (game) => {
    setCart([...cart, game]);
    alert(`Đã thêm ${game.title} vào giỏ hàng!`);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Gọi Component Menu */}
      <Menu cartCount={cart.length} />
      
      {/* Gọi Component Home */}
      <Home addToCart={addToCart} />
    </div>
  );
}

export default App;