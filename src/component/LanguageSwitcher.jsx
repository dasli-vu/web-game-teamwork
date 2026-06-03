import React, { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('language') || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', currentLang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLang } }));
  }, [currentLang]);

  return (
    <div className="language-switcher me-3">
      <select 
        className="form-select form-select-sm"
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
        style={{ width: 'auto' }}
      >
        <option value="vi">🇻🇳 Tiếng Việt</option>
        <option value="en">🇺🇸 English</option>
        <option value="zh">🇨🇳 中文</option>
      </select>
    </div>
  );
}
