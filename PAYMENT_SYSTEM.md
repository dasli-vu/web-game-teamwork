# 💳 Hệ Thống Thanh Toán - Game Store

## 📋 Tổng Quan
Hệ thống thanh toán toàn diện cho ứng dụng Game Store với 3 phương thức thanh toán khác nhau, quản lý đơn hàng và lịch sử mua hàng.

## ✨ Các Tính Năng Chính

### 1. **3 Phương Thức Thanh Toán**

#### 💳 Thẻ Tín Dụng (Credit Card)
- Hỗ trợ các loại thẻ: Visa, Mastercard, JCB
- Nhập thông tin thẻ với giao diện hiển thị thẻ theo thời gian thực
- Xác thực số thẻ (16 chữ số), ngày hết hạn (MM/YY), CVV (3-4 chữ số)
- Tên chủ thẻ được hiển thị trên thẻ ảo
- Giả lập xử lý thanh toán (2 giây)

#### 📱 Ví Điện Tử (E-Wallet)
- **Momo**: Ví điện tử phổ biến tại Việt Nam
- **ZaloPay**: Dịch vụ thanh toán của Zalo
- Nhập số điện thoại liên kết với tài khoản
- Giả lập xử lý thanh toán (2 giây)

#### 🚚 Thanh Toán Khi Nhận (COD)
- Không cần nhập thông tin thanh toán
- Thanh toán tiền mặt khi nhận hàng
- Có thể kiểm tra sản phẩm trước khi thanh toán
- Thời gian giao hàng: 1-3 ngày làm việc
- Yêu cầu đồng ý với điều khoản trước khi xác nhận

### 2. **Quy Trình Thanh Toán Multi-Step**

Khách hàng sẽ đi qua các bước:
1. **Nhập Thông Tin Cá Nhân**
   - Họ và tên
   - Email
   - Số điện thoại (10 chữ số)
   - Địa chỉ giao hàng

2. **Chọn Phương Thức Thanh Toán**
   - Giao diện trực quan với icon và mô tả
   - Hiển thị tổng tiền phải thanh toán

3. **Nhập Chi Tiết Thanh Toán**
   - Tùy vào phương thức đã chọn
   - Xác thực dữ liệu nhập vào

4. **Xác Nhận Đơn Hàng**
   - Hiển thị thông tin đơn hàng chi tiết
   - Mã đơn hàng duy nhất (ORD-[Timestamp])
   - Trạng thái thanh toán

### 3. **Lịch Sử Đơn Hàng**

#### Lưu Trữ Dữ Liệu
- Tất cả đơn hàng được lưu vào **localStorage** của trình duyệt
- Khách hàng có thể xem lịch sử bất cứ lúc nào

#### Thông Tin Lưu Trữ
Mỗi đơn hàng lưu trữ:
- Mã đơn hàng
- Ngày tạo đơn hàng
- Thông tin khách hàng (tên, email, điện thoại, địa chỉ)
- Danh sách sản phẩm với giá
- Tổng cộng
- Phương thức thanh toán
- Trạng thái (đã thanh toán / chờ thanh toán)
- Chi tiết thanh toán

#### Xem Lịch Sử
- Truy cập qua menu "📜 Lịch sử đơn hàng"
- Danh sách các đơn hàng được sắp xếp mới nhất trước
- Xem chi tiết từng đơn hàng

### 4. **Xác Thực & Kiểm Tra Lỗi**

#### Thông Tin Cá Nhân
- Kiểm tra tất cả các trường bắt buộc
- Xác thực định dạng email
- Xác thực số điện thoại (10 chữ số)

#### Thẻ Tín Dụng
- Số thẻ: 13-16 chữ số
- Tên chủ thẻ: không được để trống
- Ngày hết hạn: định dạng MM/YY hợp lệ
- CVV: 3-4 chữ số

#### Ví Điện Tử
- Phải chọn ví (Momo hoặc ZaloPay)
- Số điện thoại: 10 chữ số

#### COD
- Phải đồng ý với điều khoản trước khi xác nhận

## 🗂️ Cấu Trúc File Component

```
src/component/
├── Checkout.jsx              # Component chính, quản lý quy trình thanh toán
├── PaymentMethod.jsx         # Chọn phương thức thanh toán
├── CreditCardPayment.jsx     # Form thanh toán bằng thẻ tín dụng
├── EWalletPayment.jsx        # Form thanh toán ví điện tử
├── CODPayment.jsx            # Form thanh toán khi nhận hàng
├── OrderConfirmation.jsx     # Trang xác nhận đơn hàng thành công
├── OrderHistory.jsx          # Xem lịch sử đơn hàng
├── Cart.jsx                  # (Cập nhật) Tích hợp Checkout
└── Menu.jsx                  # (Cập nhật) Thêm liên kết lịch sử đơn hàng
```

## 🔄 Quy Trình Dữ Liệu

```
App.js
├── Menu (onNavigate để chuyển trang)
├── Home (addToCart)
└── Cart (removeFromCart, clearCart)
    └── Checkout (khi nhấn thanh toán)
        ├── PaymentMethod
        │   ├── CreditCardPayment
        │   ├── EWalletPayment
        │   └── CODPayment
        └── OrderConfirmation
            └── Lưu vào localStorage
                └── OrderHistory (xem lại)
```

## 💾 Cấu Trúc Dữ Liệu localStorage

```json
{
  "orders": [
    {
      "orderId": "ORD-1234567890",
      "date": "30/5/2026, 14:11:40",
      "customerInfo": {
        "fullName": "Nguyễn Văn A",
        "email": "user@example.com",
        "phone": "0912345678",
        "address": "123 Nguyễn Huệ, TP.HCM"
      },
      "items": [
        {
          "id": 1,
          "title": "Game Title",
          "category": "Action",
          "price": 29.99,
          "image": "image-url"
        }
      ],
      "totalPrice": 29.99,
      "paymentMethod": "credit-card",
      "paymentDetails": {
        "cardNumber": "**** **** **** 1234",
        "cardHolder": "NGUYEN VAN A",
        "amount": 29.99
      },
      "status": "completed"
    }
  ]
}
```

## 🎨 Giao Diện & Tương Tác

### Màu Sắc Chính
- **Xanh dương**: Nút hành động chính
- **Vàng**: Nút cảnh báo, tóm tắt đơn hàng
- **Xanh lá**: Nút thành công
- **Đỏ**: Nút xóa, cảnh báo
- **Đen**: Nền tối, bảng tóm tắt

### Modal Checkout
- Chiều rộng tối đa: 80% màn hình
- Cuộn nội dung nếu quá dài
- Nóc modal có màu nền tối với icon
- Có nút đóng ở góc trên phải

### Thẻ Tín Dụng Ảo
- Gradient màu tím-xanh tương tự thẻ thực
- Hiển thị số thẻ (ẩn các chữ số đầu tiên)
- Tên chủ thẻ in hoa
- Ngày hết hạn dạng MM/YY

## 🔐 Bảo Mật

⚠️ **Lưu ý**: Đây là ứng dụng demo. Trong thực tế:
- **KHÔNG** lưu thông tin thẻ tín dụng đầy đủ
- **KHÔNG** gửi thông tin nhạy cảm qua HTTPS chưa mã hóa
- Cần tích hợp với cổng thanh toán thực tế (Stripe, PayPal, etc.)
- Cần xác thực SSL/TLS để bảo vệ dữ liệu

## 🚀 Cách Sử Dụng

### Khách Hàng
1. Chọn các game muốn mua
2. Nhấn "💳 TIẾN HÀNH THANH TOÁN" từ giỏ hàng
3. Điền đầy đủ thông tin cá nhân
4. Chọn phương thức thanh toán
5. Nhập chi tiết thanh toán
6. Xem xác nhận đơn hàng
7. Xem lịch sử đơn hàng trong menu

## 📱 Tương Thích
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet
- ✅ Mobile (responsive design)

## 🔄 Tương Lai
- [ ] Tích hợp Stripe API thực tế
- [ ] Tích hợp Momo/ZaloPay API
- [ ] Backend xác thực đơn hàng
- [ ] Gửi email xác nhận tự động
- [ ] Quản lý trạng thái vận chuyển
- [ ] Hỗ trợ nhiều loại tiền tệ
- [ ] Mã giảm giá / Coupon

## 📞 Hỗ Trợ
- Nếu có lỗi, bạn có thể xóa localStorage để reset tất cả đơn hàng
- Console F12 sẽ hiển thị chi tiết nếu có lỗi
