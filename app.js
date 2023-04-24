const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const shopRouter = require("./routes/shop");

// cấu hình cho ứng dụng
app.set("view engine", "pug"); //cấu hình dạng mẫu sử dụng là pug
app.set("views", "views"); //chỉ mục thư viện chứa các mẫu là views

// thêm các route vào ứng dung
// app.use("admin"); //route dành cho admin
app.use(shopRouter); //route dành cho phía user

// cấu hình ứng dụng
app.use(bodyParser.urlencoded({ extended: false })); // đăng ký middleware dùng để tương tác dữ liệu với các phương thức http
app.use(express.static(path.join(__dirname, "public"))); // cung cấp các tài nguyên tĩnh trong thư mục public

// khởi động phương thức để lắng nghe các sự kiện yêu cầu tới port 5656
app.listen(5656);
