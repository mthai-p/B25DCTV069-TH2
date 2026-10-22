# Thư viện lớp – Bài tập tổng hợp Buổi 5–7

Gồm hai phần, cùng một bài toán (xem, tìm, lọc, yêu thích, thêm sách):

- `part-a/` – JavaScript thuần (ES modules, fetch + async/await, localStorage)
- `part-b/` – React cơ bản (Vite, component, props, children, useState)

## Cách chạy

**Phần A** (cần server tĩnh vì dùng `fetch` và ES module, không mở file trực tiếp):

```bash
cd part-a
npx serve .        # hoặc dùng extension Live Server của VS Code
```

**Phần B**:

```bash
cd part-b
npm install
npm run dev
```

## Phần A – cấu trúc

| File | Vai trò |
|------|---------|
| `js/api.js` | `fetchBooks` – tải `books.json` bằng fetch + async/await |
| `js/storage.js` | Đọc/ghi JSON vào localStorage (yêu thích, sách thêm, sách đã xóa, theme) |
| `js/validate.js` | Quy tắc validate form |
| `js/render.js` | Tạo thẻ sách bằng `createElement` + `textContent` |
| `js/main.js` | State, sự kiện, event delegation, kết nối các module |

Chức năng: hiển thị "Đang tải..."/thông báo lỗi, tìm theo tên ngay khi gõ, lọc thể loại (tạo bằng `Set`), kết hợp hai điều kiện và dòng "Đang hiển thị x / y cuốn", Yêu thích/Xóa bằng event delegation (xóa có `confirm`), số yêu thích ở header lưu localStorage, form có báo lỗi dưới từng ô khi gõ và khi gửi, sách mới hiện ở đầu danh sách. Vì dùng `books.json` (không có server ghi), sách thêm/xóa được lưu trong localStorage. Có thêm chế độ sáng/tối.

## Phần B – cấu trúc component

`App` (giữ state `favorites`, `selectedGenre`) → `Header`, `Section` (dùng `children`) → `GenreFilter`, `BookList` → `BookCard`, `BookForm`, `Footer`. Dữ liệu ở `src/data/books.js`; danh sách render bằng `map` có `key={book.id}`.

## So sánh Phần A và Phần B

| Tiêu chí | Phần A (DOM thuần) | Phần B (React) |
|----------|--------------------|----------------|
| Cập nhật giao diện | Tự gọi hàm `render()`, tự tạo/xóa phần tử DOM | Đổi state bằng `setState`, React tự vẽ lại phần thay đổi |
| Dữ liệu | Biến `state` + gọi render thủ công; dễ quên cập nhật header/trạng thái | State là nguồn dữ liệu duy nhất, giao diện luôn khớp state |
| Tái sử dụng | Hàm `createBookCard` trả về phần tử | Component `BookCard` nhận props, khai báo bằng JSX |
| Sự kiện | Event delegation trên container, đọc `data-action`/`data-id` | `onClick` gắn thẳng vào nút, truyền hàm xuống qua props |
| Chia nhỏ | Chia theo module (file JS) | Chia theo component (giao diện + logic đi cùng nhau) |
| Ưu điểm | Không cần build, hiểu rõ cách DOM hoạt động | Code ngắn, dễ mở rộng khi giao diện phức tạp |
| Nhược điểm | Nhiều code lặp, dễ lệch giữa dữ liệu và giao diện | Cần Vite/Node, phải hiểu state, props, luồng dữ liệu một chiều |

## Yêu cầu nâng cao

Đã làm: chế độ sáng/tối (Phần A). Phần B có thêm nút Xóa và form thêm sách (state `books` ở App, component `BookForm`). Chưa làm: viết Phần A bằng TypeScript, nút Xóa gọi DELETE lên mockapi (đề cho phép vì dữ liệu đang dùng `books.json`).
