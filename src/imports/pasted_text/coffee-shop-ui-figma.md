Thiết kế UI website “Hệ thống quản lý quán cà phê” bằng Figma, phong cách hiện đại, chuyên nghiệp, dễ dùng cho đồ án phần mềm.

Hệ thống phục vụ 3 vai trò:
- Admin
- Quản lý
- Nhân viên

CSDL gồm các bảng:
Users, Categories, Products, CafeTables, Customers, Orders, OrderDetails, Payments, RevenuePredictions.

Phong cách thiết kế:
- Modern admin dashboard
- Sidebar bên trái
- Header trên cùng
- Nội dung chính ở giữa
- Màu chủ đạo: nâu cà phê, kem, trắng, xanh lá nhẹ
- Font rõ ràng, dễ đọc
- Bo góc nhẹ, card mềm, icon đơn giản
- Responsive cho desktop và tablet
- Giao diện tiếng Việt

Tạo bộ giao diện gồm các màn hình sau:

1. Màn hình đăng nhập
- Logo quán cà phê
- Tiêu đề: “Coffee Shop Management”
- Ô nhập Username
- Ô nhập Password
- Dropdown chọn vai trò: Admin / Quản lý / Nhân viên
- Nút Đăng nhập
- Nền có hình minh họa ly cà phê nhẹ nhàng

2. Dashboard tổng quan
- Sidebar gồm: Dashboard, Menu, Danh mục, Bàn, Đơn hàng, Thanh toán, Khách hàng, Người dùng, Báo cáo, Dự báo doanh thu, Đăng xuất
- Header có tên người dùng, vai trò, avatar
- Card thống kê:
  + Doanh thu hôm nay
  + Số đơn hàng hôm nay
  + Số bàn đang sử dụng
  + Số khách hàng thân thiết
  + Món bán chạy
- Biểu đồ doanh thu theo ngày
- Biểu đồ món bán chạy
- Bảng đơn hàng gần đây
- Nút Xuất PDF / Excel

3. Quản lý menu / Products
- Tiêu đề: “Quản lý menu”
- Ô tìm kiếm món
- Bộ lọc danh mục
- Bộ lọc trạng thái
- Nút Thêm món
- Hiển thị món dạng bảng và card
- Các cột: Mã món, Hình ảnh, Tên món, Danh mục, Giá, Trạng thái, Hành động
- Nút Sửa, Xóa
- Modal thêm/sửa món gồm:
  + Tên món
  + Danh mục
  + Giá
  + Hình ảnh
  + Trạng thái
  + Mô tả
  + Nút Lưu / Hủy

4. Quản lý danh mục món / Categories
- Tiêu đề: “Quản lý danh mục món”
- Ô tìm kiếm danh mục
- Nút Thêm danh mục
- Bảng gồm:
  + Mã danh mục
  + Tên danh mục
  + Mô tả
  + Số lượng món
  + Hành động
- Form thêm/sửa danh mục gồm tên danh mục và mô tả

5. Quản lý bàn / CafeTables
- Tiêu đề: “Quản lý bàn”
- Hiển thị bàn dạng grid card
- Mỗi card gồm:
  + Tên bàn
  + Số ghế
  + Trạng thái: Trống / Đang sử dụng / Đã đặt
- Màu trạng thái:
  + Trống: xanh lá
  + Đang sử dụng: cam
  + Đã đặt: xanh dương
- Bộ lọc trạng thái
- Nút Thêm bàn
- Khi click vào bàn hiển thị đơn hàng hiện tại

6. Quản lý đơn hàng / Orders
- Tiêu đề: “Quản lý đơn hàng”
- Bố cục chia 2 phần:
  + Bên trái: danh sách bàn và menu món
  + Bên phải: chi tiết đơn hàng
- Có tìm kiếm món
- Có chọn bàn
- Chi tiết đơn hàng gồm:
  + Mã đơn
  + Bàn
  + Nhân viên tạo đơn
  + Khách hàng
  + Danh sách món
  + Số lượng
  + Đơn giá
  + Thành tiền
  + Tổng tiền
  + Trạng thái
- Nút:
  + Thêm món
  + Cập nhật số lượng
  + Xóa món
  + Thanh toán
  + Hủy đơn
- Bộ lọc theo ngày, trạng thái, bàn, nhân viên

7. Thanh toán hóa đơn / Payments
- Tiêu đề: “Thanh toán hóa đơn”
- Hiển thị thông tin đơn hàng:
  + Mã đơn
  + Bàn
  + Danh sách món
  + Số lượng
  + Giá
  + Tổng tiền
- Chọn phương thức thanh toán:
  + Tiền mặt
  + Chuyển khoản
  + Ví điện tử
- Ô nhập tiền khách đưa
- Hiển thị tiền thừa
- Hiển thị điểm khách hàng thân thiết nếu có
- Nút:
  + Xác nhận thanh toán
  + In hóa đơn
  + Xuất PDF

8. Quản lý khách hàng thân thiết / Customers
- Tiêu đề: “Quản lý khách hàng thân thiết”
- Ô tìm kiếm theo tên hoặc số điện thoại
- Bộ lọc theo điểm tích lũy
- Nút Thêm khách hàng
- Bảng gồm:
  + Mã khách hàng
  + Họ tên
  + Số điện thoại
  + Email
  + Điểm tích lũy
  + Ngày tạo
  + Hành động
- Trang chi tiết khách hàng gồm:
  + Thông tin cá nhân
  + Tổng điểm
  + Lịch sử mua hàng
  + Tổng chi tiêu

9. Quản lý người dùng & phân quyền / Users
- Tiêu đề: “Quản lý người dùng & phân quyền”
- Ô tìm kiếm người dùng
- Bộ lọc vai trò
- Bộ lọc trạng thái
- Nút Thêm người dùng
- Bảng gồm:
  + Mã người dùng
  + Họ tên
  + Username
  + Vai trò
  + Trạng thái
  + Ngày tạo
  + Hành động
- Vai trò: Admin, Quản lý, Nhân viên
- Nút Sửa, Khóa/Mở tài khoản, Đổi mật khẩu
- Form thêm/sửa người dùng gồm:
  + Họ tên
  + Username
  + Password
  + Vai trò
  + Trạng thái

10. Báo cáo doanh thu
- Tiêu đề: “Báo cáo doanh thu”
- Bộ lọc:
  + Từ ngày
  + Đến ngày
  + Nhân viên
  + Phương thức thanh toán
- Card thống kê:
  + Tổng doanh thu
  + Tổng đơn hàng
  + Món bán chạy
  + Khách hàng mua nhiều nhất
- Biểu đồ doanh thu theo thời gian
- Bảng chi tiết báo cáo:
  + Mã đơn
  + Ngày
  + Nhân viên
  + Khách hàng
  + Tổng tiền
  + Phương thức thanh toán
- Nút Xuất PDF
- Nút Xuất Excel

11. Dự báo doanh thu AI / ML
- Tiêu đề: “Dự báo doanh thu”
- Bộ lọc thời gian:
  + 7 ngày
  + 30 ngày
  + 3 tháng
  + 1 năm
- Card thống kê:
  + Doanh thu dự kiến
  + Tỷ lệ tăng trưởng
  + Ngày bán cao nhất
  + Món có khả năng bán chạy
- Biểu đồ so sánh doanh thu thực tế và doanh thu dự báo
- Bảng gồm:
  + Ngày dự báo
  + Doanh thu dự báo
  + Doanh thu thực tế
  + Ghi chú

Yêu cầu thiết kế:
- Tạo layout hoàn chỉnh như một sản phẩm thật
- Dùng component tái sử dụng cho sidebar, header, button, table, card, modal
- Tất cả nội dung bằng tiếng Việt
- Giao diện sạch, dễ trình bày trong đồ án
- Có đủ bảng dữ liệu, form nhập liệu, modal thêm/sửa, bộ lọc và nút thao tác
- Thiết kế theo phong cách quán cà phê hiện đại, thân thiện, chuyên nghiệp