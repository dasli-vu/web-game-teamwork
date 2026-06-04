import React, { useState, useEffect } from 'react';
import '../styles/PromotionBanner.css';

export default function PromotionBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const promotions = [
    {
      id: 1,
      title: "🎁 Mua 2 Game - Giảm 20%",
      description: "Áp dụng cho tất cả game thể loại Action RPG",
      discount: "20%",
      code: "GAME20",
      color: "#667eea"
    },
    {
      id: 2,
      title: "💰 Nạp 500K - Tặng 50K",
      description: "Tặng 50K credit khi nạp 500K trở lên",
      discount: "50K",
      code: "RELOAD50",
      color: "#764ba2"
    },
    {
      id: 3,
      title: "⚡ Flash Sale - Giảm 50%",
      description: "Mỗi ngày 18h-20h - Giảm tối đa 50%",
      discount: "50%",
      code: "FLASH50",
      color: "#f093fb"
    },
    {
      id: 4,
      title: "🌟 VIP Membership - Giảm 30%",
      description: "Thành viên VIP được giảm 30% tất cả game",
      discount: "30%",
      code: "VIP30",
      color: "#ff6b6b"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextPromo = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  const prevPromo = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const currentPromo = promotions[currentIndex];

  return (
    <div className="promotion-banner-section py-5 mb-4">
      <div className="container">
        <div className="promotion-carousel">
          <div 
            className="promotion-card"
            style={{ background: `linear-gradient(135deg, ${currentPromo.color} 0%, ${currentPromo.color}88 100%)` }}
          >
            <div className="promotion-content text-white">
              <h2 className="promotion-title">{currentPromo.title}</h2>
              <p className="promotion-desc">{currentPromo.description}</p>
              <div className="promotion-code">
                <span className="code-label">Mã ưu đãi:</span>
                <code className="code-value">{currentPromo.code}</code>
                <button 
                  className="btn btn-sm btn-light"
                  onClick={() => {
                    navigator.clipboard.writeText(currentPromo.code);
                    alert('Đã sao chép mã!');
                  }}
                >
                  📋 Copy
                </button>
              </div>
            </div>
          </div>

          <button className="carousel-btn prev" onClick={prevPromo}>‹</button>
          <button className="carousel-btn next" onClick={nextPromo}>›</button>

          <div className="carousel-indicators">
            {promotions.map((_, idx) => (
              <button
                key={idx}
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        <div className="row mt-4">
          {promotions.map((promo, idx) => (
            <div key={promo.id} className="col-md-6 col-lg-3 mb-3">
              <div 
                className={`promo-card p-3 rounded text-white cursor-pointer ${idx === currentIndex ? 'active' : ''}`}
                style={{ background: `linear-gradient(135deg, ${promo.color} 0%, ${promo.color}88 100%)` }}
                onClick={() => setCurrentIndex(idx)}
              >
                <h5 className="text-truncate">{promo.title}</h5>
                <p className="small mb-2 text-truncate">{promo.description}</p>
                <div className="promo-code-mini">
                  <code>{promo.code}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
