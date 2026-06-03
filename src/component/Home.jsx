import React, { useState } from 'react';
import Product from './Product';
import gamesData from './database.json';

function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortType, setSortType] = useState('default');

  // 1. Lấy danh sách tất cả thể loại game hiện có trong database để làm menu bấm (không bị trùng lặp)
  const categories = ['All', ...new Set(gamesData.map(game => game.category))];

  // 2. LOGIC LỌC VÀ SẮP XẾP GAME
  let processedGames = [...gamesData];

  // Bước 2.1: Lọc theo từ khóa tìm kiếm
  processedGames = processedGames.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bước 2.2: Lọc theo Thể loại game (Category)
  if (selectedCategory !== 'All') {
    processedGames = processedGames.filter(game => game.category === selectedCategory);
  }

  // Bước 2.3: Xử lý Sắp xếp (Sort) theo các tiêu chí
  if (sortType === 'name-az') {
    processedGames.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortType === 'price-low') {
    processedGames.sort((a, b) => a.price - b.price);
  } else if (sortType === 'price-high') {
    processedGames.sort((a, b) => b.price - a.price);
  } else if (sortType === 'budget') {
    // Tính năng tự chế: Đẩy những game dưới $50 lên trước
    processedGames.sort((a, b) => {
      if (a.price < 50 && b.price >= 50) return -1;
      if (a.price >= 50 && b.price < 50) return 1;
      return a.price - b.price;
    });
  }

  return (
    <div>
      {/* Banner & Ô Tìm kiếm */}
      <div className="bg-dark text-white py-5 mb-4 text-center">
        <h1 className="display-5 fw-bold">Thế Giới Video Game Đỉnh Cao</h1>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control text-center shadow-sm" 
              placeholder="Tìm kiếm tựa game yêu thích..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* KHU VỰC BỘ LỌC (FILTER & SORT) */}
      <div className="container mb-4">
        <div className="row g-3 bg-white p-3 rounded shadow-sm align-items-center">
          {/* Lọc theo Thể loại game */}
          <div className="col-md-6">
            <span className="fw-bold me-2 text-secondary">Thể loại:</span>
            <div className="btn-group flex-wrap" role="group">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn btn-sm m-1 rounded-pill ${selectedCategory === cat ? 'btn-warning fw-bold' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'All' ? '🎮 Tất cả' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sắp xếp (Sort) */}
          <div className="col-md-6 text-md-end">
            <span className="fw-bold me-2 text-secondary">Sắp xếp theo:</span>
            <select 
              className="form-select form-select-sm d-inline-block w-auto"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="name-az">Tên từ A đến Z 🔤</option>
              <option value="price-low">Giá: Thấp đến Cao 📈</option>
              <option value="price-high">Giá: Cao đến Thấp 📉</option>
              <option value="budget">Game cho sinh viên </option>
            </select>
          </div>
        </div>
      </div>

      {/* DANH SÁCH SẢN PHẨM SAU KHI LỌC */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold m-0">🔥 Sản phẩm nổi bật</h3>
          <span className="badge bg-dark fs-6">{processedGames.length} kết quả</span>
        </div>
        
        <div className="row">
          {processedGames.length > 0 ? (
            processedGames.map(game => (
              <Product key={game.id} game={game} addToCart={addToCart} />
            ))
          ) : (
            <div className="col-12 text-center my-5 text-muted">
              <h5>Không tìm thấy game nào phù hợp với bộ lọc hiện tại.</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;