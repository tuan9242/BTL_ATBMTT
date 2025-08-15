# 🌍 Travel Combo - Website Gợi Ý Combo Du Lịch

Một website hiện đại giúp tìm kiếm và đặt combo du lịch phù hợp với ngân sách và sở thích của bạn.

## ✨ Tính Năng Chính

### 🎯 Dành cho Khách Hàng
- **Tìm kiếm thông minh**: Lọc combo theo điểm đến, thời gian và ngân sách
- **Thông tin chi tiết**: Xem lịch trình, điểm nổi bật và dịch vụ bao gồm
- **Giao diện responsive**: Tương thích với mọi thiết bị
- **Đặt chỗ dễ dàng**: Hệ thống booking đơn giản và nhanh chóng
- **Liên hệ trực tiếp**: Form liên hệ và thông tin hotline

### 🏢 Dành cho Quản Trị
- **API đầy đủ**: RESTful API cho tất cả chức năng
- **Quản lý booking**: Theo dõi đặt chỗ và trạng thái
- **Thống kê**: Báo cáo doanh thu và combo phổ biến
- **Quản lý combo**: CRUD operations cho các combo du lịch

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js (v14 hoặc cao hơn)
- npm hoặc yarn

### Cài Đặt
```bash
# Clone repository
git clone <repository-url>
cd travel-combo-website

# Cài đặt dependencies
npm install

# Chạy server development
npm run dev

# Hoặc chạy production
npm start
```

### Truy Cập Website
- **Website chính**: http://localhost:3001
- **API endpoint**: http://localhost:3001/api

## 📁 Cấu Trúc Project

```
travel-combo-website/
├── travel.html              # Trang chính của website
├── travel-styles.css        # Stylesheet chính
├── travel-script.js         # JavaScript frontend
├── travel-server.js         # Node.js server + API
├── package.json             # Dependencies và scripts
├── TRAVEL-README.md         # Tài liệu này
└── ...                      # Các file khác
```

## 🎨 Công Nghệ Sử Dụng

### Frontend
- **HTML5**: Cấu trúc semantic và accessibility
- **CSS3**: Modern styling với Flexbox/Grid, animations
- **JavaScript ES6+**: Vanilla JS với modern features
- **Font Awesome**: Icons và biểu tượng
- **Google Fonts**: Typography (Poppins)

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **RESTful API**: Thiết kế API chuẩn
- **JSON**: Lưu trữ dữ liệu (demo)

## 📊 Combo Du Lịch Có Sẵn

1. **Đà Lạt Lãng Mạn** - 3N2Đ - 4.5M VNĐ
2. **Hạ Long Kỳ Thú** - 2N1Đ - 3.2M VNĐ
3. **Hội An Cổ Kính** - 4N3Đ - 6.8M VNĐ
4. **Phú Quốc Thiên Đường** - 5N4Đ - 12.5M VNĐ
5. **Sa Pa Hùng Vĩ** - 3N2Đ - 4.2M VNĐ
6. **Nha Trang Biển Xanh** - 4N3Đ - 7.8M VNĐ

## 🔌 API Documentation

### Endpoints Chính

#### Combos
- `GET /api/combos` - Lấy tất cả combo
- `GET /api/combos/search?destination=&duration=&budget=` - Tìm kiếm combo
- `GET /api/combos/:id` - Lấy thông tin combo theo ID

#### Booking
- `POST /api/bookings` - Đặt combo mới
- `GET /api/bookings/:code` - Lấy thông tin booking theo mã

#### Contact
- `POST /api/contact` - Gửi form liên hệ

#### Statistics
- `GET /api/destinations/popular` - Điểm đến phổ biến
- `GET /api/admin/stats` - Thống kê admin

### Ví Dụ API Request

```javascript
// Tìm kiếm combo
fetch('/api/combos/search?destination=da-lat&budget=under-5')
  .then(response => response.json())
  .then(data => console.log(data));

// Đặt combo
fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    comboId: 1,
    customerName: "Nguyễn Văn A",
    customerEmail: "example@email.com",
    customerPhone: "0123456789",
    numberOfPeople: 2,
    departureDate: "2024-02-15"
  })
});
```

## 🎯 Tính Năng Nổi Bật

### UX/UI Design
- **Modern & Clean**: Thiết kế hiện đại, giao diện sạch sẽ
- **Responsive**: Tương thích hoàn hảo trên mobile, tablet, desktop
- **Animations**: Hiệu ứng mượt mà với CSS3 animations
- **Loading States**: Trạng thái loading cho UX tốt hơn
- **Modal Windows**: Popup chi tiết combo với thông tin đầy đủ

### Performance
- **Fast Loading**: Tối ưu hóa tốc độ tải trang
- **Efficient Filtering**: Tìm kiếm và lọc nhanh chóng
- **Lazy Loading**: Tải nội dung theo yêu cầu
- **Caching**: Cache dữ liệu để tăng hiệu suất

### Accessibility
- **Semantic HTML**: Cấu trúc HTML có ý nghĩa
- **ARIA Labels**: Hỗ trợ screen readers
- **Keyboard Navigation**: Điều hướng bằng bàn phím
- **Color Contrast**: Độ tương phản màu sắc phù hợp

## 🛠 Customization

### Thêm Combo Mới
Chỉnh sửa mảng `travelCombos` trong `travel-server.js`:

```javascript
const newCombo = {
  id: 7,
  title: "Combo Mới",
  destination: "destination-key",
  duration: "X ngày Y đêm",
  price: "X,XXX,XXX",
  originalPrice: "X,XXX,XXX",
  badge: "NEW",
  description: "Mô tả combo...",
  features: ["Dịch vụ 1", "Dịch vụ 2"],
  budget: "budget-category",
  durationCategory: "duration-category",
  highlights: ["Điểm nổi bật 1", "Điểm nổi bật 2"],
  itinerary: {
    day1: "Lịch trình ngày 1",
    day2: "Lịch trình ngày 2"
  },
  availableSlots: 20,
  rating: 4.5,
  reviews: 0
};
```

### Thay Đổi Theme Colors
Chỉnh sửa CSS variables trong `travel-styles.css`:

```css
:root {
  --primary-color: #2c5aa0;
  --secondary-color: #ff6b6b;
  --accent-color: #4a90e2;
  --background-color: #f8fafc;
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🔧 Development

### Scripts Có Sẵn
- `npm start`: Chạy production server
- `npm run dev`: Chạy development server với nodemon
- `npm run bank-game`: Chạy game bảo mật cũ (nếu cần)

### Environment Variables
Tạo file `.env` để cấu hình:

```env
PORT=3001
NODE_ENV=development
```

## 📈 Roadmap

### Phase 1 (Hoàn thành)
- ✅ Giao diện cơ bản
- ✅ Tìm kiếm và lọc combo
- ✅ Modal chi tiết combo
- ✅ API backend cơ bản
- ✅ Responsive design

### Phase 2 (Tương lai)
- 🔲 Database integration (MongoDB/PostgreSQL)
- 🔲 User authentication & profiles
- 🔲 Payment gateway integration
- 🔲 Email notifications
- 🔲 Admin dashboard
- 🔲 Review & rating system
- 🔲 Multi-language support
- 🔲 PWA (Progressive Web App)

## 🤝 Đóng Góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem `LICENSE` file để biết thêm chi tiết.

## 📞 Liên Hệ

- **Email**: info@travelcombo.vn
- **Phone**: +84 123 456 789
- **Website**: https://travelcombo.vn

## 🙏 Acknowledgments

- Font Awesome cho icons
- Google Fonts cho typography
- Unsplash cho inspiration về images
- Express.js community
- Tất cả contributors

---

**Tạo bởi Travel Combo Team với ❤️ cho cộng đồng du lịch Việt Nam**