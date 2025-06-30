# Hệ thống mã hóa ngân hàng - Game Bảo mật

Trò chơi mô phỏng hệ thống bảo mật ngân hàng với các thuật toán mã hóa AES, RSA và SHA.

## Tính năng

- Hệ thống đăng nhập và đăng ký người dùng
- Lưu trữ tiến trình và điểm số của người chơi
- Nhiều cấp độ khó tăng dần
- Mô phỏng các thuật toán mã hóa thực tế

## Cài đặt

1. Cài đặt Node.js và npm (nếu chưa có)
2. Clone repository này về máy
3. Cài đặt các dependencies:

```
npm install
```

## Chạy ứng dụng

1. Khởi động server:

```
npm start
```

2. Mở trình duyệt và truy cập: `http://localhost:3000`

## Chơi với tư cách khách

Bạn có thể chơi trò chơi mà không cần đăng ký tài khoản bằng cách nhấn nút "Chơi với tư cách khách". Tuy nhiên, tiến trình và điểm số của bạn sẽ không được lưu lại.

## Đăng ký tài khoản

Để lưu trữ tiến trình và điểm số, bạn cần đăng ký tài khoản với:
- Tên đăng nhập
- Email
- Mật khẩu (tối thiểu 6 ký tự)

## Công nghệ sử dụng

- HTML, CSS, JavaScript
- Node.js và Express
- bcryptjs cho mã hóa mật khẩu
- CryptoJS và JSEncrypt cho các thuật toán mã hóa trong game 