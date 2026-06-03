import React, { useState } from 'react';
import Product from './Product';
import GameModal from './GameModal';
import gamesData from './database.json';

function Home({ addToCart, onBuyNow }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <h3 className="mb-4 fw-bold">🔥 Sản phẩm nổi bật</h3>
        <div className="row">
          {filteredGames.map(game => (
            <Product 
              key={game.id} 
              game={game} 
              addToCart={addToCart}
              onCardClick={setSelectedGame}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
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