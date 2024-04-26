import '../css/HuongDan.css'
import img1 from '../img/QR code/1 (4).webp'
import img2 from '../img/QR code/1 (1).webp'
import img3 from '../img/QR code/1 (2).webp'
import img4 from '../img/QR code/1 (3).webp'
const HuongDan = () => {
    return (
        <main>
            <div className="background_qt"></div>
                 <div className=".container_qt">
                 <div className="text_qt"><p>HƯỚNG DẪN</p></div>
                    <div className="content_hd">
                        <ul>
                            <li className="Buoc">
                                <div className="left1">
                                    <p>BƯỚC 1</p>
                                </div>
                                <div className="right1">
                                    <p className="one">CÀI ĐẶT ỨNG DỤNG HOẶC TRUY CẬP WEBSITE</p>
                                    <p>Người dùng truy cập website: medpro.vn   , hoặc tải ứng dụng di động Medpro để trải nghiệm sản phẩm tốt nhất và sử dụng các tính năng dịch vụ mới nhất.</p>
                                    <p className="setting">Vui lòng cài đặt ứng dụng theo hướng dẫn như sau.</p>
                                    <ul>
                                        <ol>Cách 1: Tải ứng dụng: https://medpro.vn/getapp</ol>
                                        <ol>Cách 2: Tìm kiếm từ khoá "Medpro" trên App Store (iOS) hoặc Google Play (Android)</ol>
                                        <ol>Cách 3: Quét mã QR:</ol>
                                        <div className="icon_qr">
                                        <img src={img1}alt=""  />
                                        </div>
                                    </ul>
                                </div>
                            </li>
                            <li className="Buoc">
                                <div className="left1">
                                <p>BƯỚC 2</p>
                                </div>
                                <div className="right1">
                                <p className="one">ĐĂNG KÝ TÀI KHOẢN</p>
                                <p className="login_dangkysdt">Cách 1:Nhập số điện thoại</p>
                                <ul className="Nhapthongtin">
                                    <li className="login_tt">Nhập số điện thoại</li>
                                    <li className="login_tt">Xác minh OTP để đăng ký tài khoản (Trong vòng 2 phút, sau 2 phút cần phải yêu cầu cấp mã mới).</li>
                                    <li className="login_tt">Bổ sung thông tin tài khoản: Họ và tên; Mật khẩu; Xác nhận lại mật khẩu; Ngày sinh; Giới tính; Email.</li>
                                    <li className="login_tt">Chọn đăng ký để hoàn tất tạo tài khoản.</li>
                                </ul>
                                <p className="login_dangkysdt">Cách 2: Đăng ký bằng Social</p>
                                <ul className="Nhapthongtin">
                                    <li className="login_tt">Chọn social Zalo, Facebook, Google, Apple.</li>
                                    <li className="login_tt">Nhập số điện thoại để xác minh OTP.</li>
                                    <li className="login_tt">Bổ sung thông tin tài khoản: Họ và tên; Mật khẩu; Xác nhận lại mật khẩu; Ngày sinh; Giới tính; Email.</li>
                                    <li className="login_tt">Chọn đăng ký để hoàn tất tạo tài khoản.</li>
                                </ul>
                                <div className="icon_qr">
                                        <img  className="icon_buoc2" src={img4} alt=""  />
                                        </div>
                                </div>
                            </li>
                            <li className="Buoc">
                                <div className="left1">
                                <p>BƯỚC 3</p>
                                </div>
                                <div className="right1">
                                <p className="one">ĐẶT LỊCH KHÁM BỆNH</p>
                                <p className="select">CHỌN THÔNG TIN ĐẶT KHÁM</p>
                                <ul className="Nhapthongtin">
                                    <li className="login_tt">Đăng nhập phần mềm trên web hoặc ứng dụng di động.</li>
                                    <li className="login_tt">Chọn Đặt khám tại cơ sở hoặc Đặt khám theo bác sĩ.</li>
                                    <li className="login_tt">Chọn thông tin khám: Chuyên khoa, bác sĩ, ngày khám, giờ khám và có BHYT hay không.</li>
                                    <li className="login_tt">Nhập thông tin bệnh nhân: Chọn hồ sơ sẵn có hoặc tạo mới hồ sơ</li>
                                </ul>
                                <p className="select">CHỌN/TẠO MỚI HỒ SƠ BỆNH NHÂN (Bạn được phép tạo tối đa 10 hồ sơ)</p>
                                <ul className="Nhapthongtin">
                                    <li className="login_tt">Đăng nhập phần mềm trên web hoặc ứng dụng di động.</li>
                                    <li className="login_tt">Chọn Đặt khám tại cơ sở hoặc Đặt khám theo bác sĩ.</li>
                                    <li className="login_tt">Chọn thông tin khám: Chuyên khoa, bác sĩ, ngày khám, giờ khám và có BHYT hay không.</li>
                                    <li className="login_tt">Nhập thông tin bệnh nhân: Chọn hồ sơ sẵn có hoặc tạo mới hồ sơ</li>
                                </ul>
                                <p className="select">THANH TOÁN PHÍ KHÁM</p>
                                <ul className="Nhapthongtin">
                                    <li className="login_tt">Chọn phương thức thanh toán: Quét mã QR, Chuyển khoản 24/7, Thẻ khám bệnh, Thẻ thanh toán quốc tế hoặc thẻ ATM nội địa hoặc Ví điện tử.</li>
                                    <li className="login_tt">Kiểm tra thông tin thanh toán (phí khám bệnh, phí tiện ích và tổng tiền) và Xác nhận thanh toán.</li>
                                    <li className="login_tt">Thực hiện thanh toán trên Ví điện tử hoặc Ứng dụng Ngân hàng hoặc Cổng thanh toán.</li>
                                </ul>
                                <p className="select">NHẬN PHIẾU KHÁM ĐIỆN TỬ</p>
                                <ul className="Nhapthongtin">
                                    <li className="login_tt">Sau khi thanh toán thành công, bạn sẽ nhận được ngay phiếu khám bệnh điện tử trên ứng dụng (và qua email). Trường hợp đặt khám qua Tổng đài 19002115, vui lòng xem phiếu khám được gửi qua tin nhắn SMS.</li>
                                </ul>
                                <div className="icon_qr">
                                        <img  className="icon_buoc2" src={img2} alt=""  />
                                        </div>
                                </div>
                            </li >
                            <li className="Buoc">
                                <div className="left1">
                                <p>BƯỚC 4</p>
                                </div>
                                <div className="right1">
                                <p className="one">KHÁM VÀ THỰC HIỆN CẬN LÂM SÀNG</p>
                                <ul>
                                    <li className="two">Đến ngày khám, người bệnh vui lòng đến trực tiếp phòng khám hoặc quầy tiếp nhận theo như hướng dẫn trên phiếu khám.</li>
                                    <li className="two">Người bệnh được khám lâm sàng theo quy trình của Bệnh viện.</li>
                                    <li className="two">Nếu có chỉ định cận lâm sàng của bác sĩ, người bệnh thanh toán phí trực tuyến hoặc tại quầy thu ngân của bệnh viện và vào phòng cận lâm sàng để được thực hiện.</li>
                                    <li className="two">Người bệnh quay lại phòng khám ban đầu, sau khi nhận đầy đủ kết quả cận lâm sàng, để được bác sĩ khám, tư vấn và trả kết quả khám (toa thuốc, giấy hẹn khám,...).</li>
                                </ul>
                                <div className="icon_qr">
                                        <img  className="icon_buoc2" src={img3} alt=""  />
                                        </div>
                                </div>
                            </li>
                            <li className="Buoc">
                                <div className="left1">
                                    <p>BƯỚC 5</p>
                                </div>
                                <div className="right1">
                                <p className="one">ĐẶT LỊCH TÁI KHÁM</p>
                                <p className="tow">Sử dụng ứng dụng để đặt khám cho lần hẹn tái khám như BƯỚC 1 và BƯỚC 2.</p>
                                <div className="icon_qr">
                                        <img src={img1} alt=""  />
                                        </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                 </div>

        </main>
    )
  }
  
  export default HuongDan
