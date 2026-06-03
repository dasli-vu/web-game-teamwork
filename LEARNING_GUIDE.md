# 📚 Hướng Dẫn Học Tập: Payment System + Direct Checkout

## 📖 Tổng Quan Những Gì Đã Thêm

Dự án Game Store đã được nâng cấp với:
1. ✅ Hệ thống thanh toán đầy đủ (Payment System)
2. ✅ Chức năng mua ngay (Direct Checkout)
3. ✅ Lịch sử đơn hàng (Order History)
4. ✅ Quản lý state toàn ứng dụng (State Management)

---

## 🎓 REACT CONCEPTS CẦN HỌC

### 1. **State Management (Quản Lý Trạng Thái)**

#### ✅ Đã Sử Dụng: `useState`

```javascript
// Cơ bản
const [cart, setCart] = useState([]);
const [currentPage, setCurrentPage] = useState('home');
const [showCheckout, setShowCheckout] = useState(false);
const [selectedPayment, setSelectedPayment] = useState(null);

// Lợi ích:
// - Lưu trạng thái hiện tại của component
// - Cập nhật state → tự động re-render giao diện
// - Mỗi component có state riêng
```

**📌 Ứng Dụng Thực Tế:**
- Lưu giỏ hàng: `cart` state
- Chuyển trang: `currentPage` state
- Hiển thị/ẩn modal: `showCheckout` state
- Chọn phương thức thanh toán: `selectedPayment` state

#### Mẫu Cơ Bản:
```javascript
const [value, setValue] = useState(initialValue);

// setValue có 2 cách dùng:
// 1. Giá trị mới
setValue(newValue);

// 2. Hàm update (khi phụ thuộc vào giá trị cũ)
setValue(prevValue => prevValue + 1);

// 3. Với object/array (cần tạo copy mới)
setCart([...cart, newItem]);
const updated = cart.filter((_, idx) => idx !== indexToRemove);
setCart(updated);
```

---

### 2. **Props (Truyền Dữ Liệu)**

#### ✅ Đã Sử Dụng: Parent → Child Communication

```javascript
// ❌ SAI: Component không nhận props
function Menu() { }

// ✅ ĐÚNG: Component nhận props
function Menu({ cartCount, onNavigate }) {
  // Sử dụng cartCount và onNavigate
  return <div>{cartCount}</div>;
}

// Cha component truyền props:
<Menu cartCount={cart.length} onNavigate={setCurrentPage} />
```

**Ví Dụ Thực Tế:**
```javascript
// App.js (Cha)
const [cart, setCart] = useState([]);
const [currentPage, setCurrentPage] = useState('home');

<Menu 
  cartCount={cart.length}        // ✅ Truyền data
  onNavigate={setCurrentPage}    // ✅ Truyền callback
/>
<Home 
  addToCart={addToCart}          // ✅ Truyền hàm
  onBuyNow={handleBuyNow}        // ✅ Truyền hàm
/>
```

**📌 Quy Tắc:**
- Props là read-only, không được thay đổi trực tiếp
- Data flow: Parent → Child (một chiều)
- Để update cha, child gọi callback từ cha

---

### 3. **Conditional Rendering (Hiển Thị Có Điều Kiện)**

#### ✅ Sử Dụng: Ternary Operator & Logical AND

```javascript
// 1. Ternary Operator (có điều kiện có/không)
{cartItems.length === 0 ? (
  <div>Giỏ hàng trống</div>
) : (
  <div>Danh sách sản phẩm</div>
)}

// 2. Logical AND (chỉ khi true)
{showCheckout && <Checkout />}
{cartItems.length > 0 && <button>Thanh toán</button>}

// 3. If statement (ngoài JSX)
if (!game) return null;  // Không render gì
return <div>...</div>;   // Render modal
```

**Ứng Dụng Thực Tế:**
```javascript
// Hiển thị checkout modal
{showCheckout && (
  <Checkout
    cartItems={directPurchaseItems || cart}
    onClose={...}
  />
)}

// Hiển thị trang khác nhau
{currentPage === 'home' && <Home />}
{currentPage === 'orders' && <OrderHistory />}

// Hiển thị thông báo khi giỏ trống
{cartItems.length === 0 ? (
  <p>Giỏ hàng trống</p>
) : (
  <CartList items={cartItems} />
)}
```

---

### 4. **Event Handling (Xử Lý Sự Kiện)**

#### ✅ Sử Dụng: onClick, onChange, onSubmit, etc.

```javascript
// 1. Nút click đơn giản
<button onClick={() => setShowCheckout(true)}>
  Thanh toán
</button>

// 2. Click với tham số
<button onClick={() => removeFromCart(index)}>
  Xóa
</button>

// 3. Ngăn event propagation
<button onClick={(e) => {
  e.stopPropagation();  // Ngăn click lan lên parent
  addToCart(game);
}}>
  Mua
</button>

// 4. Form submit
<form onSubmit={handleSubmit}>
  <input onChange={(e) => setName(e.target.value)} />
  <button type="submit">Gửi</button>
</form>

// 5. Input change
<input 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**📌 Lưu Ý:**
- Không gọi function khi define, phải dùng arrow function
- ❌ `onClick={removeFromCart(index)}` → Sai!
- ✅ `onClick={() => removeFromCart(index)}` → Đúng!

---

### 5. **Array & Object Manipulation**

#### ✅ Sử Dụng: map, filter, reduce, spread operator

```javascript
// 1. MAP - Chuyển đổi array
const prices = [10, 20, 30];
const doubled = prices.map(p => p * 2);  // [20, 40, 60]

// Ứng dụng: Hiển thị danh sách
{cartItems.map((item, index) => (
  <div key={index}>{item.title}</div>
))}

// 2. FILTER - Lọc array
const games = [
  { id: 1, title: 'Game A', price: 20 },
  { id: 2, title: 'Game B', price: 30 }
];
const expensive = games.filter(g => g.price > 25);

// Ứng dụng: Xóa item khỏi giỏ
const removeFromCart = (index) => {
  const updated = cart.filter((_, idx) => idx !== index);
  setCart(updated);
};

// 3. REDUCE - Tính tổng
const total = cartItems.reduce((sum, item) => sum + item.price, 0);

// 4. SPREAD OPERATOR - Sao chép array/object
const newCart = [...cart, newItem];  // Thêm item
const updated = { ...obj, newProp: value };  // Thêm property

// 5. FIND - Tìm phần tử đầu tiên
const game = games.find(g => g.id === 1);

// 6. SOME/EVERY - Kiểm tra điều kiện
const hasExpensive = games.some(g => g.price > 50);
const allExpensive = games.every(g => g.price > 10);
```

---

## 🏗️ COMPONENT PATTERNS (Mẫu Component)

### 1. **Presentational vs Container Components**

```javascript
// ❌ SAI: Trộn logic và UI
function Product({ game, addToCart, onCardClick, onBuyNow }) {
  const [isHovered, setIsHovered] = useState(false);
  // Logic quá phức tạp trong component nhỏ
}

// ✅ ĐÚNG: Tách rõ
// Container (Logic)
function ProductContainer({ game, onAddToCart, onBuyNow }) {
  return <Product game={game} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />;
}

// Presentational (UI)
function Product({ game, onAddToCart, onBuyNow }) {
  return (
    <div>
      <img src={game.image} />
      <button onClick={() => onAddToCart(game)}>🛒</button>
      <button onClick={() => onBuyNow(game)}>💳</button>
    </div>
  );
}
```

---

### 2. **Lift State Up (Đưa State Lên)**

```javascript
// ❌ SAI: State ở component con
function Cart({ items }) {
  const [checkout, setCheckout] = useState(false);  // ❌ Khó quản lý
}

// ✅ ĐÚNG: State ở component cha
function App() {
  const [showCheckout, setShowCheckout] = useState(false);  // ✅ Tập trung
  
  return (
    <Cart 
      items={cart} 
      onCheckout={() => setShowCheckout(true)}
    />
  );
}
```

---

### 3. **Prop Drilling vs Callback**

```javascript
// Thay vì truyền dữ liệu qua 5 level:
// App → Home → Product → Button → Handler ❌

// Tốt hơn: Truyền callback lên
// Button onClick → Handler ở App ✅

function App() {
  const handleBuyNow = (game) => {
    // Xử lý ở đây
  };
  
  return <Home onBuyNow={handleBuyNow} />;
}
```

---

## 📚 JAVASCRIPT CONCEPTS CẦN BIẾT

### 1. **Arrow Functions (Hàm Mũi Tên)**

```javascript
// Cách cũ (Function Declaration)
function addToCart(game) {
  setCart([...cart, game]);
}

// Cách mới (Arrow Function)
const addToCart = (game) => {
  setCart([...cart, game]);
};

// Rút gọn (1 dòng)
const addToCart = (game) => setCart([...cart, game]);

// Không tham số
const handleClose = () => setShowModal(false);

// Một tham số (có thể bỏ ngoặc)
const double = x => x * 2;

// Nhiều tham số
const add = (a, b) => a + b;
```

---

### 2. **Template Literals (Chuỗi Template)**

```javascript
// Cách cũ
const message = "Xin chào " + name + ", bạn có " + count + " sản phẩm";

// Cách mới (Template Literals)
const message = `Xin chào ${name}, bạn có ${count} sản phẩm`;

// Với biểu thức
const total = `Tổng cộng: $${items.reduce((s, i) => s + i.price, 0)}`;

// Multiline
const html = `
  <div>
    <h1>${title}</h1>
    <p>${description}</p>
  </div>
`;
```

---

### 3. **Destructuring (Phân Rã)**

```javascript
// Array Destructuring
const [cart, setCart] = useState([]);
const [first, second, ...rest] = myArray;

// Object Destructuring
function GameModal({ game, onClose, onBuyNow }) {
  // Thay vì: props.game, props.onClose, props.onBuyNow
}

const { title, price, category } = game;
const { fullName, email, phone } = customerInfo;

// Destructuring trong Parameter
const handleSubmit = ({ fullName, email, phone }) => {
  console.log(fullName);
};
```

---

### 4. **Ternary Operator (Toán Tử Ba Ngôi)**

```javascript
// Cách cũ (if-else)
let status;
if (user.isLoggedIn) {
  status = "Đã đăng nhập";
} else {
  status = "Chưa đăng nhập";
}

// Cách mới (Ternary)
const status = user.isLoggedIn ? "Đã đăng nhập" : "Chưa đăng nhập";

// Nested ternary (cẩn thận, khó đọc)
const level = score > 80 ? "A" : score > 60 ? "B" : "C";

// Trong JSX
<div>
  {cartItems.length > 0 ? (
    <CartList items={cartItems} />
  ) : (
    <EmptyCart />
  )}
</div>
```

---

### 5. **Spread Operator (...)**

```javascript
// Array
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Thêm vào giỏ
const newCart = [...cart, newItem];

// Xóa item
const updated = cart.filter((_, idx) => idx !== removeIdx);

// Object
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 };

// Merge objects
const info = { ...personal, ...contact };
```

---

### 6. **Logical Operators (&&, ||)**

```javascript
// && (AND) - chỉ hiển thị nếu điều kiện true
{isAdmin && <AdminPanel />}
{cart.length > 0 && <CheckoutButton />}

// || (OR) - chọn giá trị đầu tiên không null
const result = directPurchaseItems || cart;
const name = userName || 'Guest';

// !! (Convert sang boolean)
const isCartEmpty = !!cart.length;
```

---

## 🎯 PATTERNS & BEST PRACTICES

### 1. **Controlled Components**

```javascript
// ❌ Không tốt: Uncontrolled
function SearchForm() {
  const inputRef = useRef();
  const handleSearch = () => {
    const value = inputRef.current.value;
  };
}

// ✅ Tốt: Controlled
function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

### 2. **Keys trong List Rendering**

```javascript
// ❌ Sai: Dùng index làm key
{items.map((item, index) => (
  <div key={index}>{item.title}</div>
))}

// ✅ Đúng: Dùng ID duy nhất
{items.map((item) => (
  <div key={item.id}>{item.title}</div>
))}
```

### 3. **Event Handler Naming**

```javascript
// ❌ Tên không rõ ràng
<button onClick={toggle}>Click</button>

// ✅ Tên rõ ràng
<button onClick={() => setShowCheckout(true)}>
  Thanh toán
</button>

// Hoặc đặt tên hàm rõ
const handleCheckout = () => setShowCheckout(true);
<button onClick={handleCheckout}>Thanh toán</button>
```

---

## 🗄️ STORAGE & DATA

### 1. **localStorage - Lưu Dữ Liệu**

```javascript
// Lưu
const orders = [{ orderId: 1, total: 100 }, ...];
localStorage.setItem('orders', JSON.stringify(orders));

// Đọc
const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

// Xóa
localStorage.removeItem('orders');
localStorage.clear();  // Xóa tất cả
```

**Ứng Dụng:** Lưu lịch sử đơn hàng
```javascript
// Lưu đơn hàng mới
const newOrder = { orderId, date, items, total, ... };
const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
existingOrders.push(newOrder);
localStorage.setItem('orders', JSON.stringify(existingOrders));

// Đọc lịch sử
useEffect(() => {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  setOrders(orders.reverse());  // Mới nhất trước
}, []);
```

---

## 🎨 BOOTSTRAP CLASSES CẦN BIẾT

```html
<!-- Layout -->
<div class="container">Chiều rộng tối đa</div>
<div class="row">Hàng, chia cột với col-*</div>
<div class="col-md-6">Nữa chiều rộng trên màn md</div>

<!-- Spacing -->
class="mb-3"  <!-- margin-bottom -->
class="mt-4"  <!-- margin-top -->
class="p-3"   <!-- padding -->
class="px-2"  <!-- padding left-right -->

<!-- Text -->
class="text-center"
class="text-warning"   <!-- Màu cảnh báo (vàng) -->
class="text-dark"
class="text-muted"
class="fw-bold"        <!-- Font weight bold -->
class="fs-5"           <!-- Font size 5 -->

<!-- Buttons -->
class="btn btn-primary"
class="btn btn-warning"
class="btn btn-secondary"
class="btn btn-outline-danger"
class="btn-sm"         <!-- Small button -->

<!-- Cards -->
class="card"
class="card-body"
class="card-title"
class="shadow-sm"      <!-- Shadow nhỏ -->
class="border-0"       <!-- Không border -->

<!-- Badges & Alerts -->
class="badge bg-success"
class="alert alert-info"
class="alert alert-warning"

<!-- Display -->
class="d-flex"              <!-- Flexbox -->
class="justify-content-between"
class="align-items-center"
class="gap-2"              <!-- Gap giữa items -->
class="flex-grow-1"        <!-- Grow hết không gian -->

<!-- Position -->
class="position-absolute"
class="position-relative"
class="sticky-top"         <!-- Sticky header -->

<!-- Responsive -->
class="d-none d-md-block"   <!-- Ẩn trên small, hiện md -->
class="col-12 col-md-6"     <!-- 12 cột trên small, 6 cột trên md -->
```

---

## 📱 VALIDATION & FORM HANDLING

### Ví Dụ Thực Tế từ Dự Án:

```javascript
// Validate thông tin cá nhân
const handleInfoSubmit = (e) => {
  e.preventDefault();
  
  // Kiểm tra trống
  if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }
  
  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
    alert('Email không hợp lệ!');
    return;
  }
  
  // Validate phone (10 digits)
  if (!/^[0-9]{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) {
    alert('Số điện thoại phải có 10 chữ số!');
    return;
  }
  
  // Hợp lệ, chuyển tiếp
  setStep('payment');
};

// Validate thẻ tín dụng
const validateCard = () => {
  if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
    alert('Số thẻ không hợp lệ!');
    return false;
  }
  // ... kiểm tra khác
  return true;
};
```

---

## 🔄 FLOW DIAGRAM

### Quy Trình Mua Hàng:

```
Trang Chủ (Home)
    ↓
    ├─→ Click 🛒 → Thêm vào Cart
    │              ↓
    │         Xem Giỏ Hàng
    │              ↓
    │         Click Thanh Toán
    │              ↓
    │         Checkout Modal ← Direct Purchase
    │              ↓
    │         Điền Thông Tin
    │              ↓
    │         Chọn Thanh Toán
    │              ↓
    │         Xác Nhận Đơn
    │              ↓
    └─────→ Lưu localStorage
              ↓
         Order History
```

---

## 💡 NHỮNG ĐIỀU CẦN NHỚ

### ✅ DO's (Nên Làm)
1. ✅ Sử dụng meaningful component names
2. ✅ Tách component thành các phần nhỏ, có thể tái sử dụng
3. ✅ Lift state up khi cần chia sẻ data
4. ✅ Sử dụng spread operator để cập nhật state
5. ✅ Validate form trước khi submit
6. ✅ Sử dụng key prop khi render list
7. ✅ Tách logic khỏi UI (Presentational vs Container)
8. ✅ Sử dụng localStorage để lưu dữ liệu local

### ❌ DON'Ts (Không Nên Làm)
1. ❌ Không thay đổi state trực tiếp: `cart[0] = item` ❌
2. ❌ Không gọi function trong render: `onClick={handleClick()}` ❌
3. ❌ Không tạo object/array mới trong render (vô hạn re-render)
4. ❌ Không dùng index làm key trong list
5. ❌ Không để logic phức tạp trực tiếp trong JSX
6. ❌ Không quên e.preventDefault() trong form submit
7. ❌ Không quên e.stopPropagation() khi cần ngăn event bubbling

---

## 🚀 NEXT STEPS (Bước Tiếp Theo)

### Để Cải Thiện Thêm:

1. **Hooks Nâng Cao**
   - `useEffect` - Xử lý side effects
   - `useCallback` - Optimize performance
   - `useMemo` - Memoization
   - `useRef` - Direct DOM access

2. **State Management Nâng Cao**
   - Context API - Tránh prop drilling
   - Redux - State toàn ứng dụng (nếu phức tạp)

3. **Async & API**
   - Fetch API để gọi backend
   - Error handling & loading states
   - Promise & Async/Await

4. **Testing**
   - Jest + React Testing Library
   - Unit tests & Integration tests

5. **Performance**
   - Code splitting
   - Lazy loading components
   - Image optimization

---

## 📞 TÓMLẠI

**Các Concept Chính Đã Học:**
- ✅ React Hooks (useState)
- ✅ Props & Callbacks
- ✅ Conditional Rendering
- ✅ Event Handling
- ✅ Array Methods (map, filter, reduce)
- ✅ State Management
- ✅ Component Composition
- ✅ localStorage
- ✅ Form Validation
- ✅ Bootstrap CSS

**Dự Án Hoàn Chỉnh:**
- ✅ 6 Components thanh toán
- ✅ 3 Phương thức thanh toán
- ✅ Lịch sử đơn hàng
- ✅ Multi-step form
- ✅ Input validation
- ✅ Responsive design

**Kỹ Năng Đã Rèn Luyện:**
- ✅ Phân tích yêu cầu
- ✅ Thiết kế component hierarchy
- ✅ Quản lý state logic
- ✅ Xử lý user interactions
- ✅ Validation & error handling
- ✅ Data persistence

---

Chúc bạn học tập hiệu quả! 🎉
