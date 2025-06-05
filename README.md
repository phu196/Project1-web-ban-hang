**Hệ thống web bán hàng đơn giản**
Đây là một dự án web bán hàng mô phỏng, được xây dựng bằng Node.js, Express, MongoDB và Pug, hỗ trợ các tính năng quản lý sản phẩm, người dùng và giỏ hàng.

🚀 Tính năng chính
✅ Đăng nhập / Đăng xuất với phân quyền (Admin & User)
📦 Quản lý sản phẩm (thêm, sửa, xóa)
🧑‍💼 Quản lý người dùng
🛒 Giỏ hàng & đặt hàng
🛡️ Middleware xác thực và phân quyền
🛠 Cấu trúc MVC rõ ràng, dễ mở rộng

🧰 Công nghệ sử dụng

| Công nghệ     | Mô tả                            |
| ------------- | -------------------------------- |
| Node.js       | Nền tảng JavaScript backend      |
| Express.js    | Framework server nhẹ             |
| MongoDB       | Cơ sở dữ liệu NoSQL              |
| Mongoose      | ORM cho MongoDB                  |
| Pug           | Template engine render giao diện |
| dotenv        | Quản lý biến môi trường          |
| md5           | Mã hóa mật khẩu                  |
| cookie-parser | Đọc cookie từ client             |

📦 Cài đặt & Chạy thử
# Clone dự án
git clone https://github.com/phu196/Project1-web-ban-hang

# Cài đặt dependencies
npm install

# Tạo file .env
PORT=3000  
MONGO_URL=mongodb://127.0.0.1:27017/product-management

# Seed tài khoản admin
node scripts/seedAdmin.js
# Kết quả trên terminal: 
✅ Tạo tài khoản admin thành công!

# Chạy ứng dụng
npm start
