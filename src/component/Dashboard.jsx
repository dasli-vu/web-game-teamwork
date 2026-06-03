import React, { useState } from 'react';

function Dashboard({ games, onAddGame, onUpdateGame, onDeleteGame }) {
  // Trạng thái lưu trữ dữ liệu của Form nhập liệu
  const [formState, setFormState] = useState({
    id: '',
    title: '',
    category: '',
    price: '',
    image: '',
    description: ''
  });

  // Trạng thái kiểm tra xem đang là "Thêm mới" hay "Sửa game"
  const [isEditing, setIsEditing] = useState(false);

  // Hàm xử lý thay đổi dữ liệu trong các ô Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  // Hàm khi nhấn nút Sửa ở danh sách game: Đổ dữ liệu cũ lên Form
  const handleEditClick = (game) => {
    setIsEditing(true);
    setFormState(game);
  };

  // Hàm khi bấm Submit Form (Lưu lại)
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
      // Nếu thêm mới, tự động tạo id ngẫu nhiên ngẫu hứng
      const newGame = { ...formState, id: Date.now() };
      onAddGame(newGame);
    }

    // Reset form về trạng thái trống rỗng
    setFormState({ id: '', title: '', category: '', price: '', image: '', description: '' });
  };

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4 text-dark">⚙️ Hệ Thống Quản Trị - Dashboard Admin</h3>
      
      <div className="row">
        {/* BÊN TRÁI: FORM THÊM / SỬA GAME */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-dark text-light">
            <h5 className="fw-bold text-warning mb-3">
              {isEditing ? "📝 Sửa Thông Tin Game" : "➕ Thêm Game Mới"}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-muted">Tên Video Game</label>
                <input type="text" className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" name="title" value={formState.title} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Thể loại</label>
                <input type="text" className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" name="category" value={formState.category} onChange={handleInputChange} placeholder="Ví dụ: Action RPG, Sports..." />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Giá bán ($)</label>
                <input type="number" step="0.01" className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" name="price" value={formState.price} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Đường dẫn ảnh (URL Image)</label>
                <input type="text" className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" name="image" value={formState.image} onChange={handleInputChange} placeholder="https://..." />
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Mô tả tóm tắt</label>
                <textarea className="form-control form-control-sm bg-secondary bg-opacity-20 text-white border-secondary" rows="3" name="description" value={formState.description} onChange={handleInputChange}></textarea>
              </div>
              
              <button type="submit" className={`btn btn-sm w-100 fw-bold ${isEditing ? 'btn-info' : 'btn-warning'}`}>
                {isEditing ? "Cập Nhật Ngay" : "Thêm Vào Cửa Hàng"}
              </button>
              {isEditing && (
                <button type="button" className="btn btn-sm btn-link text-muted w-100 mt-2 text-decoration-none" onClick={() => {
                  setIsEditing(false);
                  setFormState({ id: '', title: '', category: '', price: '', image: '', description: '' });
                }}>Hủy sửa</button>
              )}
            </form>
          </div>
        </div>

        {/* BÊN PHẢI: BẢNG THỐNG KÊ DANH SÁCH GAME ĐANG CÓ */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold text-dark mb-3">📦 Danh Sách Kho Hàng Hiện Tại</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên Game</th>
                    <th>Thể loại</th>
                    <th>Giá</th>
                    <th className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map(game => (
                    <tr key={game.id}>
                      <td>
                        <img src={game.image || "https://via.placeholder.com/60x40"} alt={game.title} className="rounded" style={{ width: '60px', height: '35px', objectFit: 'cover' }} />
                      </td>
                      <td className="fw-bold text-dark text-truncate" style={{ maxWidth: '180px' }}>{game.title}</td>
                      <td><span className="badge bg-secondary">{game.category}</span></td>
                      <td className="text-info fw-bold">${game.price}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(game)}>✏️ Sửa</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => onDeleteGame(game.id)}>🗑️ Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;