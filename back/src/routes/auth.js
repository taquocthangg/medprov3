import * as controller from '../controllers'
import express from 'express'
import uploadCloud from '../mid/cloudinary-upload';
const router = express.Router();

router.post('/', uploadCloud.single('image'), controller.dangKi)
router.post('/upload-image', uploadCloud.single('image'), controller.uploadImg)
router.post('/login', controller.dangNhap)
// Định tuyến cho yêu cầu quên mật khẩu
router.post('/forgot-password', controller.forgotPassword);

// Định tuyến cho yêu cầu đặt lại mật khẩu
router.get('/reset-password/:token', controller.renderResetPasswordPage);
router.post('/reset-password/:token', controller.resetPassword);
router.get('/getCurent/:userId', controller.getCurent);
router.post('/getBacSiByChuyenKhoa/:id_chuyenKhoa', controller.getAllBacSiByChuyenKhoa);
router.post('/getBacSiByChuyenKhoa/', controller.getAllBacSiByChuyenKhoa);

router.post('/updateUser/:userId', uploadCloud.single('image'), controller.updateUserController);
router.post('/themchuyenkhoa/:id_benhVien', controller.themMoiChuyenKhoa);
router.post('/thembacsi/:id_chuyenKhoa', uploadCloud.single("image"), controller.themMoiBacSi);
router.get('/chuyenkhoa/:id_benhVien', controller.getChuyenKhoas);
router.post('/suaChuyenKhoa/:id_chuyenKhoa', controller.updateChuyenKhoaControll);
router.post('/themlichkham', controller.createSchedule);
router.get('/huylichkham/:id_lichkham', controller.cancelSchedule);
router.post('/xacnhanlichkham/:id_lichkham', controller.completeSchedule);
router.post('/datlich/:id_lichkham', controller.booking);
router.post('/lichkham/:id_doctor', controller.getSchedule);
router.get('/lichkhamdadat/:getSchedulebyID', controller.getSchedulebyID);
router.post('/lichDatKham/:id_doctor', controller.getScheduleByBooked);
router.delete('/xoalich/:scheduleId', controller.deleteLichKham);
router.delete('/xoaChuyenKhoa/:id_chuyenKhoa', controller.deleteChuyenKhoaS);
router.delete('/xoaUser/:userId', controller.deleteUsers);
//tao viết hàm này
router.get('/getInfomationChuyenKhoa/:id_chuyenKhoa', controller.getInfomationChuyenKhoa)
router.post('/getAllLichSuKham/:id_doctor', controller.getAllLichSuKham)

//Lấy lịch theo trạng thái
router.post('/getAllLichSuKhamStatus/:id_doctor', controller.getAllLichSuKhamStatus)
router.post('/getSearchDoctor/:id_benhvien', controller.getSearchDoctor)
//get Doanh Thu 
router.get('/getDoanhThuHospital/:id_benhvien', controller.getDoanhThuHospital)
router.get('/getInfomationChuyenKhoa/:id_chuyenKhoa', controller.getInfomationChuyenKhoa)
//getAll theo ngày
router.post('/getAllLichSuKham/:id_doctor', controller.getAllLichSuKham)
// get All từ đầu đến cuối
router.get('/getAllLichSuKham/:id_doctor',controller.getAllLichSuKhamFull)
router.post('/themsulichkham/:scheduleId', controller.createHistories); // thêm bệnh án
router.get('/getAllBacSiByHospital/:idHospital',controller.getAllBacSiByHospital)
router.get('/getAllLichSuKhamByHospital/:idHospital',controller.getAllLichSuKhamByHospital) // Lấy thông tin bệnh nhân theo bệnh viện
router.get('/getAllNewsByHospital/:idHospital',controller.getAllNewsByHospital) 
router.get('/getAllNews',controller.getAllNews)
router.get('/LaySoLuongLich/:id_doctor',controller.getSoLuongLich)
router.get('/LaySoLuongLichHospital/:id_Hospital',controller.LaySoLuongLichHospital)
router.post('/laysulichkham/:getLichSuKhamById', controller.getScheduleHistorybyID);
router.get('/laysulichkham/:getLichSuKhamById', controller.getScheduleHistory);

router.get('/lich-kham-da-dat-by-id-benhnhan/:id_benhnhan', controller.getLichKhamDaDat);
router.get('/lich-kham-hoan-thanh-by-id-benhnhan/:id_benhnhan', controller.getLichKhamHoanThanh);
router.get('/lich-kham-da-huy-by-id-benhnhan/:id_benhnhan', controller.getLichKhamHuy);
router.get('/lich-kham-hoan-thanh/:id_benhnhan', controller.LichKhamHoanThanhbyBenhNhan);
router.get('/lich-kham-hoan-thanh-bv/:id_benhnhan', controller.benhAn);
router.get('/lich-kham-hoan-thanh-by-lichkham/:id_benhnhan', controller.benhAnTheoLich); // bệnh án
router.get('/lich-kham-da-huy/:id_benhnhan', controller.lichKhamHuy);



router.post('/create_payment_url', controller.createPayment);
router.get('/vnpay_return', controller.returnPayment);

module.exports = router

