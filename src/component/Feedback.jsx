import React, { useState, useEffect } from 'react';
import '../styles/Feedback.css';

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rating: 5,
    comment: '',
    email: ''
  });

  useEffect(() => {
    const savedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(savedFeedbacks);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.comment.trim()) {
      alert('Vui lòng nhập bình luận');
      return;
    }

    const newFeedback = {
      id: Date.now(),
      rating: parseInt(formData.rating),
      comment: formData.comment,
      email: formData.email || 'Anonymous',
      date: new Date().toLocaleDateString('vi-VN')
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('feedbacks', JSON.stringify(updated));
    
    setFormData({ rating: 5, comment: '', email: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
        ))}
      </div>
    );
  };

  const handleEditClick = (feedback) => {
    setEditingId(feedback.id);
    setEditFormData({
      rating: feedback.rating,
      comment: feedback.comment,
      email: feedback.email
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (feedbackId) => {
    if (!editFormData.comment.trim()) {
      alert('Vui lòng nhập bình luận');
      return;
    }

    const updated = feedbacks.map(fb => 
      fb.id === feedbackId 
        ? {
            ...fb,
            rating: parseInt(editFormData.rating),
            comment: editFormData.comment,
            email: editFormData.email || 'Anonymous',
            updatedAt: new Date().toLocaleDateString('vi-VN')
          }
        : fb
    );

    setFeedbacks(updated);
    localStorage.setItem('feedbacks', JSON.stringify(updated));
    setEditingId(null);
  };

  const handleDeleteFeedback = (feedbackId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa phản hồi này?')) {
      const updated = feedbacks.filter(fb => fb.id !== feedbackId);
      setFeedbacks(updated);
      localStorage.setItem('feedbacks', JSON.stringify(updated));
    }
  };

  return (
    <div className="feedback-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">💬 Phản hồi từ khách hàng</h2>
        
        <button 
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✖️ Ẩn form' : '✏️ Để lại phản hồi'}
        </button>

        {showForm && (
          <div className="feedback-form mb-4 p-4 bg-light rounded">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Đánh giá (1-5 sao)</label>
                <select 
                  name="rating" 
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="5">⭐⭐⭐⭐⭐ Xuất sắc</option>
                  <option value="4">⭐⭐⭐⭐ Rất tốt</option>
                  <option value="3">⭐⭐⭐ Tốt</option>
                  <option value="2">⭐⭐ Bình thường</option>
                  <option value="1">⭐ Không tốt</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label>Bình luận của bạn</label>
                <textarea 
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="4"
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Email (không bắt buộc)</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="your@email.com"
                />
              </div>

              <button type="submit" className="btn btn-success">✓ Gửi phản hồi</button>
            </form>
            
            {submitted && (
              <div className="alert alert-success mt-3">
                ✨ Cảm ơn bạn đã gửi phản hồi!
              </div>
            )}
          </div>
        )}

        <div className="feedback-list">
          {feedbacks.length === 0 ? (
            <div className="alert alert-info">
              Chưa có phản hồi nào. Hãy là người đầu tiên!
            </div>
          ) : (
            feedbacks.slice(0, 10).map(fb => (
              <div key={fb.id} className="feedback-item p-3 mb-3 border rounded">
                {editingId === fb.id ? (
                  <div className="feedback-edit-form">
                    <h6 className="mb-3">Chỉnh sửa phản hồi</h6>
                    <div className="form-group mb-3">
                      <label>Đánh giá (1-5 sao)</label>
                      <select 
                        name="rating" 
                        value={editFormData.rating}
                        onChange={handleEditInputChange}
                        className="form-select"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Xuất sắc</option>
                        <option value="4">⭐⭐⭐⭐ Rất tốt</option>
                        <option value="3">⭐⭐⭐ Tốt</option>
                        <option value="2">⭐⭐ Bình thường</option>
                        <option value="1">⭐ Không tốt</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label>Bình luận của bạn</label>
                      <textarea 
                        name="comment"
                        value={editFormData.comment}
                        onChange={handleEditInputChange}
                        className="form-control"
                        rows="3"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input 
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => handleSaveEdit(fb.id)}
                      >
                        ✓ Lưu
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditingId(null)}
                      >
                        ✕ Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="feedback-header mb-2">
                        <strong>{fb.email}</strong>
                        <span className="text-muted ms-2 small">{fb.date}</span>
                        {fb.updatedAt && <span className="text-muted ms-2 small">(Cập nhật: {fb.updatedAt})</span>}
                      </div>
                      {renderStars(fb.rating)}
                      <p className="mb-0 mt-2">{fb.comment}</p>
                    </div>
                    <div className="d-flex gap-2 ms-3">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditClick(fb)}
                        title="Chỉnh sửa"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteFeedback(fb.id)}
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
