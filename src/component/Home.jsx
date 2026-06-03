import React, { useState, useMemo } from 'react';
import Product from './Product';
import GameModal from './GameModal';
import gamesData from './database.json';

function Home({ gamesData: customGamesData, addToCart, onBuyNow }) {
  const games = customGamesData || gamesData;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [sortType, setSortType] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(games.map(game => game.category))];
    return cats.filter(cat => cat);
  }, [games]);

  // Filter và sort games
  const filteredAndSortedGames = useMemo(() => {
    let result = games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || game.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort games
    switch(sortType) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
    }

    return result;
  }, [games, searchTerm, filterCategory, sortType]);

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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label text-dark fw-bold">🎮 Thể loại game</label>
            <select 
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Tất cả thể loại</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="col-md-4">
            <label className="form-label text-dark fw-bold">💰 Sắp xếp theo</label>
            <select 
              className="form-select"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="newest">🆕 Mới nhất</option>
              <option value="price-low">💵 Giá: Thấp → Cao</option>
              <option value="price-high">💰 Giá: Cao → Thấp</option>
              <option value="name-asc">A → Z</option>
              <option value="name-desc">Z → A</option>
            </select>
          </div>

          <div className="col-md-4">
            <div className="alert alert-info mb-0">
              <strong>📊 Tìm thấy {filteredAndSortedGames.length} game</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h3 className="mb-4 fw-bold">🔥 Sản phẩm nổi bật</h3>
        {filteredAndSortedGames.length > 0 ? (
          <div className="row">
            {filteredAndSortedGames.map(game => (
              <Product 
                key={game.id} 
                game={game} 
                addToCart={addToCart}
                onCardClick={setSelectedGame}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        ) : (
          <div className="alert alert-warning text-center">
            <h5>😕 Không tìm thấy game nào</h5>
            <p>Vui lòng thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>

      {selectedGame && (
        <GameModal 
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onBuyNow={onBuyNow}
        />
      )}
    </div>
  );
}

export default Home;