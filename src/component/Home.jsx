import React, { useState } from 'react';
import Product from './Product';
import gamesData from './database.json'; // Đã sửa lỗi đường dẫn gọi database cùng cấp thư mục

function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="bg-dark text-white py-5 mb-4 text-center">
        <h1 className="display-5 fw-bold">Thế Giới Video Game Đỉnh Cao</h1>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control text-center" 
              placeholder="Tìm kiếm tựa game yêu thích..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.value)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <h3 className="mb-4 fw-bold">🔥 Sản phẩm nổi bật</h3>
        <div className="row">
          {filteredGames.map(game => (
            <Product key={game.id} game={game} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;