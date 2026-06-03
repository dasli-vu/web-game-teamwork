import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './component/Menu';
import Home from './component/Home';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import OrderHistory from './component/OrderHistory';

function App() {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [directPurchaseItems, setDirectPurchaseItems] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

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