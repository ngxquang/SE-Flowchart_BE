-- use app;
delete from `group`;
INSERT INTO `group` (id, name) VALUES 
(1, 'Giảng viên'),
(2, 'Sinh viên');


delete from `lesson_type`;
-- lesson_type
INSERT INTO `lesson_type` (id, name) VALUES (1, 'Lí Thuyết');
INSERT INTO `lesson_type` (id, name) VALUES (2, 'Bài tập');


delete from `user`;
-- Người dùng
INSERT INTO `user` (username, password, status, name, sex, phone, address, birthDate, email, groupId) VALUES 
('nttmkvippro', '123456', 1, 'Nguyễn Tấn Trần Minh Khang', 'M', '0123456789', 'Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh', '1974-01-01', 'nttmk@uit.edu.vn', 1),
('nguyenvana', 'password123', '1', 'Nguyễn Văn A', 'M', '0909123456', '123 Đường ABC, Quận 1, TP.HCM', '1990-01-01', 'nguyenvana@example.com', 1),
('phamthib', 'password456', '1', 'Phạm Thị B', 'F', '0909234567', '456 Đường DEF, Quận 2, TP.HCM', '1992-02-02', 'phamthib@example.com', 1);


delete from `repo`;
INSERT INTO `repo` (name, userId) VALUES 
('167 Bài Nhập Môn Lập Trình Cơ Bản', 1),
('200 Bài Mảng Một Chiều', 2),
('100 Bài Đệ Quy', 2),
('150 Bài cây Nhị Phân', 2);


delete from `topic`;
INSERT INTO `topic` (name, repoId) VALUES 
('Lý thuyết Lưu dồ thuật toán', 1),
('Hướng dẫn Lưu đồ thuật toán', 1);

delete from `lesson_group`;
INSERT INTO `lesson_group` (id, name, topicId) VALUES 
(1, 'Lịch sử', 1),
(2, 'Các thành phần cơ bản của lưu đồ', 1),
(3, 'Cấu trúc điều khiển - Control Structure', 1),
(4, 'Vẽ Lưu đồ - Chạy từng bước lưu đồ', 1),
(5, 'Cấu trúc điều khiển tuần tự', 2),
(6, 'Tính toán tối ưu phép nhân', 2),
(7, 'Chữ số hàng đơn vị - hàng chục - hàng trăm', 2),
(8, 'Hoán vị', 2);



# 1 là lý thuyết 
# 2 là bài tập
delete from `lesson`;
INSERT INTO `lesson` (description, image, status, urlMd, flowChart, statusFlowChart, lessonGroupId, lessonTypeId) VALUES 
('Lịch sử', null, '1', '/lessons/lesson1.md', null, '0', 1, 1),
('Bắt đầu - Start', null, '1', '/lessons/lesson2.md', null, '0', 2, 1),
('Kết thúc - End', null, '1', '/lessons/lesson1.md', null, '0', 2, 1),
('Bài 001: Vẽ lưu đồ nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả', '/images/lesson1.jpg', '1', null, '/flowcharts/lesson1.json', '1', 5, 2),
('Bài 012: Vẽ lưu đồ tính x^6 với 3 phép nhân', '/images/lesson2.jpg', '1', null, '/flowcharts/lesson2.json', '1', 6, 2);

-- Dạng bài lý thuyết (Mã dạng bài 1) có trường thông tin HinhAnh, LuuDo, TrangThaiLuuDo là NULL
-- Dạng bài bài tập (Mã dạng bài 2) có trường thông tin UrlMD (link dẫn tới markdown của lý thuyết) là NULL

INSERT INTO `role` (url, description) VALUES 
('/admin/dashboard', 'Quản trị viên'),
('/user/profile', 'Người dùng');


INSERT INTO `parameter` (name, value, dataType) VALUES 
('Số lượng học viên', '100', 'integer'),
('Ngày khai giảng', '2024-09-01', 'date');
