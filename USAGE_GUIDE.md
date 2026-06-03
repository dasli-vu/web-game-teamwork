# 🎮 HƯỚNG DẪN SỬ DỤNG - WEB GAME STORE

## 📌 Nội Dung
1. [Đăng Nhập & Đăng Ký](#đăng-nhập--đăng-ký)
2. [Admin Panel](#admin-panel)
3. [Phản Hồi Khách Hàng](#phản-hồi-khách-hàng)
4. [Ngôn Ngữ](#ngôn-ngữ)
5. [Khuyến Mãi](#khuyến-mãi)
6. [Giỏ Hàng & Thanh Toán](#giỏ-hàng--thanh-toán)

---

## 🔐 Đăng Nhập & Đăng Ký

### Đăng Ký Tài Khoản User
1. Click **"👤 Đăng Nhập"** ở góc trên phải menu
2. Chọn tab **"Đăng Ký"**
3. Điền thông tin:
   - 👤 Họ và Tên
   - 📧 Email (phải hợp lệ)
   - 🔒 Mật khẩu (tối thiểu 6 ký tự)
   - ✓ Xác nhận mật khẩu
4. Click **"Đăng Ký"**
5. ✅ Nếu thành công, quay lại tab "Đăng Nhập" để login

### Đăng Nhập User
1. Click **"👤 Đăng Nhập"** ở menu
2. Tab **"Đăng Nhập"** (mặc định)
3. Nhập:
   - 📧 Email
   - 🔒 Mật khẩu
4. Click **"Đăng Nhập"**

### Quên Mật Khẩu
1. Click **"👤 Đăng Nhập"**
2. Click link **"Quên mật khẩu?"**
3. Nhập email
4. Hệ thống sẽ hiển thị mật khẩu (demo only - thực tế dùng email reset)

### 🔐 Đăng Nhập Admin
1. Click **"👤 Đăng Nhập"**
2. Chọn tab **"🔐 Admin"**
3. Nhập credentials:
   - 👤 Username: **`admin`**
   - 🔒 Password: **`admin123`**
4. Click **"✅ Đăng Nhập Admin"**
5. ✅ Sẽ tự động chuyển đến Dashboard Admin

⚠️ **Lưu ý:** 
- Tối đa 3 lần sai → khóa 1 phút
- Credentials chỉ dùng demo
- Trong production, sử dụng backend authentication

---

## ⚙️ Admin Panel

### Truy Cập Admin
- Phải đăng nhập bằng admin account
- Hoặc click **"⚙️ Dashboard Admin"** ở menu (nếu đã login)

### Chức Năng Admin

#### 1. 📝 Thêm Game Mới
1. Click **"➕ Thêm Game Mới"**
2. Điền form:
   - Game ID (tự động)
   - Tên game
   - Thể loại
   - Giá
   - Link hình ảnh
   - Mô tả ngắn
   - Mô tả đầy đủ
   - Chi tiết khác (platform, developer, rating)
3. Click **"💾 Thêm"**

#### 2. ✏️ Chỉnh Sửa Game
1. Click **"✏️ Sửa"** trên game muốn chỉnh
2. Cập nhật thông tin
3. Click **"💾 Cập Nhật"**

#### 3. 🗑️ Xóa Game
1. Click **"🗑️ Xóa"** trên game
2. Xác nhận xóa
3. Game sẽ mất khỏi store

#### 4. 📊 Xem Thống Kê
- Tổng số games
- Tổng người dùng (nếu có)
- Doanh thu (nếu có)

### Đăng Xuất Admin
1. Click **"🚪 Exit Admin"** ở menu
2. Xác nhận: "Bạn có chắc chắn muốn đăng xuất?"
3. ✅ Quay lại trang chủ

---

## 💬 Phản Hồi Khách Hàng

### Cách Để Lại Phản Hồi
1. Scroll xuống trang chủ
2. Tìm phần **"💬 Phản hồi từ khách hàng"**
3. Click **"✏️ Để lại phản hồi"**
4. Điền form:
   - ⭐ Đánh giá (1-5 sao)
   - 💬 Bình luận (bắt buộc)
   - 📧 Email (tuỳ chọn)
5. Click **"✓ Gửi phản hồi"**
6. ✅ Phản hồi sẽ hiện ở danh sách

### Xem Phản Hồi
- Danh sách hiển thị **top 10 feedback mới nhất**
- Hiển thị:
  - ⭐ Số sao
  - 👤 Email/Tên người gửi
  - 📅 Ngày gửi
  - 💬 Nội dung bình luận

### Lưu Ý
- Phản hồi lưu ở localStorage (demo)
- Trong production, lưu vào database
- Admin có thể xem tất cả feedback

---

## 🌍 Ngôn Ngữ

### Chuyển Đổi Ngôn Ngữ
1. Tìm dropdown **ngôn ngữ** ở góc trên phải menu
2. Chọn một trong:
   - 🇻🇳 **Tiếng Việt** (mặc định)
   - 🇺🇸 **English**
   - 🇨🇳 **中文 (Trung Quốc)**
3. ✅ Trang sẽ tự động chuyển ngôn ngữ

### Nhớ Ngôn Ngữ
- Lựa chọn ngôn ngữ được lưu ở localStorage
- Lần tới vào sẽ còn ngôn ngữ cũ

### Hỗ Trợ Ngôn Ngữ
- Menu navigation
- Tên button
- Thông báo
- (Trong tương lai: tất cả content)

---

## 🎁 Khuyến Mãi

### Trang Khuyến Mãi Chính
- Hiển thị ở phía trên trang chủ
- **Carousel tự động cuộn** mỗi 5 giây
- Nhấp **< >** để chuyển thủ công

### Các Khuyến Mãi Hiện Tại

#### 1️⃣ Mua 2 Game - Giảm 20%
- **Mã:** `GAME20`
- **Điều kiện:** Mua 2 games thể loại Action RPG
- **Cách copy:** Click **"📋 Copy"** → Dán vào checkout

#### 2️⃣ Nạp 500K - Tặng 50K
- **Mã:** `RELOAD50`
- **Điều kiện:** Nạp 500K trở lên
- **Phần thưởng:** Thêm 50K credit

#### 3️⃣ Flash Sale - Giảm 50%
- **Mã:** `FLASH50`
- **Thời gian:** 18h-20h mỗi ngày
- **Giảm giá:** Tối đa 50%

#### 4️⃣ VIP Membership - Giảm 30%
- **Mã:** `VIP30`
- **Điều kiện:** Là thành viên VIP
- **Lợi ích:** Giảm 30% tất cả games

### Cách Sử Dụng Khuyến Mãi
1. Click vào khuyến mãi muốn xem
2. Copy mã giảm giá
3. Thêm games vào giỏ hàng
4. Click **"Thanh toán"**
5. Dán mã vào **"Mã giảm giá"** (nếu có)
6. ✅ Giảm giá sẽ tự động áp dụng

---

## 🛒 Giỏ Hàng & Thanh Toán

### Thêm Game Vào Giỏ Hàng
1. Nhấp **"🛒 Thêm vào giỏ hàng"** trên game
2. Game sẽ vào giỏ (hiện badge số lượng)
3. ✅ Tiếp tục shopping hoặc thanh toán

### Mua Ngay (Bỏ Qua Giỏ Hàng)
1. Click **"⚡ Mua ngay"** trên game
2. Trực tiếp tới trang checkout
3. ✅ Thanh toán

### Xem Giỏ Hàng
1. Click badge **"🛒 Giỏ hàng"** ở menu
2. Hiển thị danh sách games
3. Tính tổng tiền

### Chỉnh Sửa Giỏ Hàng

#### Xóa 1 Game
- Click **"🗑️"** trên game

#### Xóa Hết
- Click **"❌ Xóa hết giỏ hàng"**
- Xác nhận

### Thanh Toán
1. Click **"Thanh toán"** ở giỏ hàng
2. Chọn **phương thức thanh toán:**
   - 💳 E-Wallet (Momo, ZaloPay, ...)
   - 🚚 COD (Thanh toán khi nhận)
3. Điền thông tin cần thiết
4. Click **"✅ Thanh toán"**
5. ✅ Nhận confirmation

### Lịch Sử Đơn Hàng
1. Phải **đăng nhập user** trước
2. Click **"📜 Lịch sử đơn hàng"** ở menu
3. Xem danh sách đơn hàng đã mua

---

## 💡 Tips & Tricks

### 🔍 Tìm Kiếm Game
1. Nhập tên game ở ô tìm kiếm (trang chủ)
2. Kết quả tự động lọc

### 🏷️ Lọc Theo Thể Loại
1. Chọn thể loại ở dropdown
2. Hiển thị chỉ games thuộc thể loại

### 📊 Sắp Xếp Game
- **Giá thấp → cao**
- **Giá cao → thấp**
- **Tên A-Z**
- **Tên Z-A**
- **Mới nhất**

### ⭐ Xem Chi Tiết Game
1. Click game
2. Popup hiển thị:
   - Hình ảnh
   - Ngôn ngữ: Các tính năng
   - Platform
   - Developer
   - Đánh giá

### 💾 Dữ Liệu Được Lưu
- Tất cả data lưu ở **localStorage**
- Không cần server
- Dữ liệu còn lại khi tắt trình duyệt
- Xóa localStorage = xóa tất cả (trong browser)

---

## ⚠️ Lưu Ý Quan Trọng

1. **Đăng Xuất Khi Xong** - Bảo vệ tài khoản
2. **Không Chia Sẻ Credentials** - Admin account an toàn
3. **Kiểm Tra Email** - Phải email hợp lệ
4. **Mật Khẩu Mạnh** - Tối thiểu 6 ký tự, nên phức tạp hơn
5. **Xóa Cookie/Cache** - Nếu muốn reset dữ liệu

---

## 🆘 Troubleshooting

### Quên Mật Khẩu
- Click "Quên mật khẩu?" → Nhập email → Hiển thị mật khẩu
- (Demo only - thực tế sẽ gửi email reset link)

### Tài Khoản Bị Khóa
- Admin account bị khóa sau 3 lần sai
- Đợi 1 phút → Thử lại

### Giỏ Hàng Không Lưu
- Kiểm tra localStorage bị xóa chưa
- Thử dùng browser/device khác
- Refresh trang

### Game Không Hiện
- Kiểm tra database.json
- Refresh trang hoặc clear cache
- Contact admin nếu vấn đề còn

---

## 📞 Hỗ Trợ

- **Email:** support@gamestore.vn
- **Chat:** Facebook Messenger
- **Hotline:** 1800-XXXX
- **Website:** gamestore.vn

---

**Last Updated:** June 2024
**Version:** 1.1.0
