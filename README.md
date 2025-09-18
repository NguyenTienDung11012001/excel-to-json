# Excel to JSON Converter Website

## 📌 Mục tiêu
Xây dựng một website đơn giản cho phép người dùng:
- Upload file **Excel (.xls hoặc .xlsx)**.  
- Convert dữ liệu trong Excel sang **JSON**.  
- Preview dữ liệu JSON trên website.  
- Download file JSON về máy.  

Toàn bộ xử lý chạy **trên trình duyệt (client-side)**, không cần server backend.  
Website sẽ được deploy trên **GitHub Pages**.

---

## 🛠️ Công nghệ sử dụng
- **HTML, CSS, JavaScript** (frontend only).  
- **[SheetJS (xlsx)](https://github.com/SheetJS/sheetjs)** để parse Excel.  
- **GitHub Pages** để publish website.  

---

## 🎯 Yêu cầu chi tiết
1. **Upload Excel**
   - Input `type="file"` chấp nhận `.xls` và `.xlsx`.
   - Đọc file bằng FileReader API.

2. **Xử lý Excel → JSON**
   - Sử dụng `XLSX.read()` để parse file.
   - Lấy sheet đầu tiên (có thể mở rộng chọn sheet).
   - Convert sang JSON với `XLSX.utils.sheet_to_json()`.

3. **Hiển thị và tải JSON**
   - Hiển thị dữ liệu JSON trong `<textarea>` hoặc bảng preview.
   - Nút **Download JSON** để tải về file `data.json`.

4. **UI/UX**
   - Giao diện tối thiểu: **Upload**, **Convert**, **Download**.
   - Optional: hỗ trợ drag & drop.

---

## 📂 Cấu trúc dự án
excel-to-json/
│── index.html
│── style.css
│── script.js
│── libs/
│ └── xlsx.full.min.js

---

## 🚀 Hướng dẫn triển khai
1. Clone hoặc tạo repo mới trên GitHub.  
2. Copy source code vào repo theo cấu trúc trên.  
3. Commit và push code lên branch `main`.  
4. Vào **Settings → Pages → chọn branch `main` / root**.  
5. Lấy link `https://<username>.github.io/excel-to-json/`.  

---

## 🧪 Testing
- Upload file Excel mẫu (ví dụ: danh sách sản phẩm).  
- Kiểm tra dữ liệu JSON hiển thị trong website.  
- Tải JSON về, mở trong trình soạn thảo để confirm.  
- Test trên Chrome + Firefox.  

---

## 📦 Output mong muốn
1. **Source code đầy đủ**
   - `index.html`
   - `style.css`
   - `script.js`
2. **Hướng dẫn deploy GitHub Pages** (có sẵn ở trên).
3. **Demo test case**
   - Upload file `sample.xlsx`.
   - Website trả về JSON:
     ```json
     [
       { "Product": "Laptop", "Price": 1000 },
       { "Product": "Mouse", "Price": 20 }
     ]
     ```

---

## 🔮 Mở rộng (tùy chọn)
- Cho phép chọn nhiều sheet.  
- Convert nhiều file cùng lúc.  
- Cho phép export sang CSV.  
- Thêm giao diện drag & drop đẹp hơn.  
