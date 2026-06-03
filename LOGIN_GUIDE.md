# 📖 Hướng Dẫn Sử Dụng Hệ Thống Login

## 🎮 Giới thiệu
Hệ thống Login được tích hợp vào ứng dụng GAME STORE. User phải đăng nhập trước khi có thể truy cập cửa hàng.

---

## 🚀 Các Tính Năng

### 1️⃣ **Đăng Nhập (Login)**
- Nhập Email và Mật khẩu
- Xác thực user từ localStorage
- Lưu user đang login vào localStorage

**Điều kiện:**
- Email phải hợp lệ (định dạng: user@email.com)
- Mật khẩu tối thiểu 6 ký tự
- Email phải được đăng ký trước đó

### 2️⃣ **Đăng Ký Tài Khoản (Sign Up)**
- Nhập Họ và Tên
- Nhập Email (phải hợp lệ)
- Tạo Mật khẩu (tối thiểu 6 ký tự)
- Xác nhận Mật khẩu (phải khớp)

**Điều kiện:**
- Tất cả trường không được để trống
- Email chưa được đăng ký trước đó
- Mật khẩu và xác nhận phải giống nhau

### 3️⃣ **Quên Mật Khẩu (Forgot Password)**
- Nhập Email để lấy lại mật khẩu
- Hệ thống sẽ hiển thị mật khẩu (demo)
- *Lưu ý: Thực tế nên gửi link reset qua email*

---

## 📂 Cấu Trúc File

```
src/
├── component/
│   ├── Login.jsx           # Component Login (3 trang)
│   ├── Menu.jsx            # Menu navbar (cập nhật)
│   ├── Home.jsx
│   ├── Cart.jsx
│   └── Product.jsx
├── styles/
│   └── Login.css           # Style cho Login
├── App.js                  # Main (cập nhật)
├── App.css
├── index.js
└── ...
```

---

## 💾 Lưu Trữ Dữ Liệu

### localStorage
```javascript
// Danh sách user (tất cả tài khoản)
users: [
  {
    fullName: "Nguyễn Văn A",
    email: "user@email.com",
    password: "123456"
  }
]

// User hiện tại đang login
currentUser: {
  email: "user@email.com",
  fullName: "Nguyễn Văn A"
}
```

---

## 🧪 Test Nhanh

### Tạo tài khoản test:
1. Click nút **Đăng Ký**
2. Nhập:
   - Tên: `Nguyễn Văn A`
   - Email: `test@gmail.com`
   - Mật khẩu: `123456`
   - Xác nhận: `123456`
3. Click **Đăng Ký**

### Đăng nhập:
1. Nhập Email: `test@gmail.com`
2. Nhập Mật khẩu: `123456`
3. Click **Đăng Nhập**

### Quên mật khẩu:
1. Click **Quên mật khẩu?**
2. Nhập Email: `test@gmail.com`
3. Click **Lấy Mật Khẩu**

---

## 🎨 Giao Diện

- **Login page:** Gradient background (tím-xanh)
- **Form:** Animation, hiệu ứng hover
- **Button:** Màu sắc khác nhau cho mỗi hành động
  - 🔵 Đăng Nhập (xanh dương)
  - 🟢 Đăng Ký (xanh lá)
  - 🟠 Lấy Mật Khẩu (cam)
  - 🔴 Đăng Xuất (đỏ)

---

## ⚙️ Cách Sửa Đổi

### Thay đổi giá trị mật khẩu tối thiểu:
File: `src/component/Login.jsx`
```javascript
// Tìm dòng này:
else if (formData.password.length < 6)
// Đổi số 6 thành số khác
else if (formData.password.length < 8)
```

### Thay đổi màu gradient:
File: `src/styles/Login.css`
```css
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Đổi hex color thành màu khác */
}
```

### Thêm trường (VD: Số điện thoại):
1. Thêm vào state `formData` trong `Login.jsx`
2. Thêm input field
3. Thêm validation
4. Lưu vào localStorage

---

## 🐛 Khắc Phục Sự Cố

### 1. Không thể đăng nhập?
- Kiểm tra email/password có được nhập đúng không
- Xóa localStorage (F12 → Application → localStorage) rồi tạo tài khoản mới

### 2. Tài khoản bị trùng?
- localStorage không thể có 2 email giống nhau
- Xóa tài khoản cũ trong localStorage hoặc dùng email khác

### 3. Mất dữ liệu khi reload?
- Dữ liệu lưu trong localStorage, nên không mất
- Nếu mất, hãy kiểm tra có bật private/incognito mode không

---

## 📱 Responsive Design
- Tối ưu cho desktop, tablet, mobile
- Form tự động resize trên màn hình nhỏ

---

## 🔐 Bảo Mật (Demo)
⚠️ **Lưu ý:** Hệ thống này chỉ là **demo**, chưa an toàn cho production:
- Mật khẩu lưu plaintext (không nên dùng thực tế)
- Không mã hóa dữ liệu
- Nên dùng backend API + JWT token

---

## 📞 Liên Hệ
Nếu có lỗi, hãy kiểm tra console browser (F12).
