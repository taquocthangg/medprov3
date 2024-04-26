import users from "./users"
import auth from "./auth"
import benhVien from "./benhVien"
import news from "./news"

const initRoutes = (app, io) => {

    app.use('/api/v1/', users)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/', benhVien)
    app.use('/api/v1/', news(io))

    return app.use('/', (req, res) => {
        return res.send('Ok')
    })
}

module.exports = initRoutes



// Đăng nhập 
// Đăng ký 
// Check token
// Thêm bệnh viện ( Tên , địa chỉ , hotline , mô tả , ảnh)
// Thêm chuyên khoa ( Tên, mô tả , giá ,ảnh )
// Thêm bác sĩ ( Tên ,địa chỉ ,sdt, giới tính , chức vụ )
// Thêm lịch khám 

// Lấy thông tin bệnh viện (limit 5)
// Lấy thông tin 1 bệnh viện 
// Lấy thông tin 1 bác sĩ 
// lấy thông tin bác sĩ (limit 5)

// Lấy thông tin chuyên khoa (limit 5)
// Lấy thông tin 1 chuyên khoa 
// Lấy thông tin khách hàng ...
//  ...
