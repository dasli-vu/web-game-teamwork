import React, { useState, useMemo } from 'react';

function Dashboard({ games, onAddGame, onUpdateGame, onDeleteGame }) {
  const [formState, setFormState] = useState({
    id: '',
    title: '',
    category: '',
    price: '',
    image: '',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortType, setSortType] = useState('newest');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const handleEditClick = (game) => {
    setIsEditing(true);
    setFormState(game);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.title || !formState.price) {
      alert("Vui lòng điền ít nhất là Tên game và Giá tiền!");
      return;
    }

    if (isEditing) {
      onUpdateGame(formState);
      setIsEditing(false);
    } else {
      const newGame = { ...formState, id: Date.now() };
      onAddGame(newGame);
    }

    setFormState({ id: '', title: '', category: '', price: '', image: '', description: '' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormState({ id: '', title: '', category: '', price: '', image: '', description: '' });
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(games.map(game => game.category))];
    return cats.filter(cat => cat);
  }, [games]);

  // Filter và sort games
  const filteredAndSortedGames = useMemo(() => {
    let result = games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || game.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

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

  // Tính toán thống kê
  const stats = useMemo(() => {
    const totalGames = games.length;
    const totalValue = games.reduce((sum, game) => sum + (game.price || 0), 0);
    const avgPrice = totalGames > 0 ? (totalValue / totalGames).toFixed(2) : 0;
    const categories = [...new Set(games.map(game => game.category))].length;
    const maxPrice = Math.max(...games.map(game => game.price || 0), 0);
    const minPrice = Math.min(...games.map(game => game.price || 0), Infinity);

    return { totalGames, totalValue: totalValue.toFixed(2), avgPrice, categories, maxPrice, minPrice };
  }, [games]);

  return (
    <div className="container-fluid my-5 px-4">
      <h2 className="fw-bold mb-4 text-dark">⚙️ Hệ Thống Quản Trị - Dashboard Admin</h2>
      
      {/* THỐNG KÊ */}
      <div className="row mb-4">
        <div className="col-md-2 mb-3">
          <div className="card bg-primary text-white shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title small">📦 Tổng Game</h5>
              <h3 className="fw-bold">{stats.totalGames}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card bg-success text-white shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title small">💰 Tổng Giá Trị</h5>
              <h3 className="fw-bold">${stats.totalValue}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card bg-info text-white shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title small">📊 Giá Trung Bình</h5>
              <h3 className="fw-bold">${stats.avgPrice}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card bg-warning text-white shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title small">🏷️ Thể Loại</h5>
              <h3 className="fw-bold">{stats.categories}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card bg-success text-white shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title small">💸 Cao Nhất</h5>
              <h3 className="fw-bold">${stats.maxPrice}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card bg-danger text-white shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title small">💵 Thấp Nhất</h5>
              <h3 className="fw-bold">${stats.minPrice === Infinity ? '0' : stats.minPrice}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* BÊN TRÁI: FORM THÊM / SỬA GAME */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-dark text-light sticky-top" style={{ top: '20px' }}>
            <h5 className="fw-bold text-warning mb-3">
              {isEditing ? "📝 Sửa Thông Tin Game" : "➕ Thêm Game Mới"}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-muted">Tên Video Game *</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" 
                  name="title" 
                  value={formState.title} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Thể loại</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" 
                  name="category" 
                  value={formState.category} 
                  onChange={handleInputChange} 
                  placeholder="Ví dụ: Action RPG, Sports..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Giá bán ($) *</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" 
                  name="price" 
                  value={formState.price} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Đường dẫn ảnh (URL Image)</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" 
                  name="image" 
                  value={formState.image} 
                  onChange={handleInputChange} 
                  placeholder="https://..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Mô tả tóm tắt</label>
                <textarea 
                  className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" 
                  rows="3" 
                  name="description" 
                  value={formState.description} 
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <button type="submit" className={`btn btn-sm w-100 fw-bold ${isEditing ? 'btn-info' : 'btn-warning'}`}>
                {isEditing ? "✅ Cập Nhật Ngay" : "➕ Thêm Vào Cửa Hàng"}
              </button>
              {isEditing && (
                <button type="button" className="btn btn-sm btn-link text-muted w-100 mt-2 text-decoration-none" onClick={handleCancel}>
                  ❌ Hủy sửa
                </button>
              )}
            </form>
          </div>
        </div>

        {/* BÊN PHẢI: BẢNG THỐNG KÊ DANH SÁCH GAME ĐANG CÓ */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold text-dark mb-4">📦 Danh Sách Kho Hàng Hiện Tại</h5>
            
            {/* FILTER & SEARCH */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="🔍 Tìm kiếm game..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <select 
                  className="form-select form-select-sm"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">📂 Tất cả thể loại</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select 
                  className="form-select form-select-sm"
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
            </div>

            {/* BẢNG GAME */}
            <div className="table-responsive">
              <table className="table table-hover align-middle table-sm">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '5%' }}>STT</th>
                    <th style={{ width: '10%' }}>Hình ảnh</th>
                    <th style={{ width: '20%' }}>Tên Game</th>
                    <th style={{ width: '15%' }}>Thể loại</th>
                    <th style={{ width: '10%' }}>Giá ($)</th>
                    <th style={{ width: '15%' }} className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedGames.length > 0 ? (
                    filteredAndSortedGames.map((game, index) => (
                      <tr key={game.id}>
                        <td className="text-muted">{index + 1}</td>
                        <td>
                          <img 
                            src={game.image || "https://via.placeholder.com/60x40"} 
                            alt={game.title} 
                            className="rounded" 
                            style={{ width: '60px', height: '35px', objectFit: 'cover', cursor: 'pointer' }} 
                            title={game.title}
                          />
                        </td>
                        <td className="fw-bold text-dark text-truncate" style={{ maxWidth: '180px' }} title={game.title}>
                          {game.title}
                        </td>
                        <td>
                          <span className="badge bg-secondary">{game.category || 'N/A'}</span>
                        </td>
                        <td className="text-info fw-bold">${game.price.toFixed(2)}</td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-primary me-2" 
                            onClick={() => handleEditClick(game)}
                            title="Sửa game"
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => {
                              if (window.confirm(`Bạn có chắc chắn muốn xóa "${game.title}"?`)) {
                                onDeleteGame(game.id);
                              }
                            }}
                            title="Xóa game"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        😕 Không tìm thấy game nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="alert alert-info mt-3 mb-0">
                <strong>📊 Hiển thị {filteredAndSortedGames.length}/{games.length} game</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;