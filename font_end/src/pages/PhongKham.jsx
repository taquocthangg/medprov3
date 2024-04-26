/*
========================= Trang Chủ =========================
=                           Author                          =
=                         Quốc Thắng                        =
=============================================================
*/

import { Link, useNavigate } from 'react-router-dom'
import Why from '../componnets/Why'
import '../css/phongkham.css'
import { FaArrowRight } from "react-icons/fa"
import { thongke } from '../data'
import Whys from '../componnets/Whys'
import laptop from '../img/phongkham/laptop_banner.5b289611.png'
const PhongKham = () => {
    let history = useNavigate()
    return (
        <main>
            <div className="header_phongkham"></div>
            <div className="banner">
                <div className="wrapper">
                    <div className="info">
                        <h1>Hệ thống quản lý Phòng khám/phòng mạch</h1>
                        <p>Hiện đại hóa Phòng khám của bạn thành Hệ thống tối ưu với Ứng dụng MedPro Clinic.</p>
                        {/* <div className="btn_phongkham">
                            <div onClick={() => { history("/dang-ky") }} className="btn_dangky bob">
                                <Link>
                                    Đăng Ký <p>
                                        <FaArrowRight />
                                    </p>
                                </Link>
                            </div>
                            <div onClick={() => { history("/dang-nhap") }} className="btn_dangnhap bob">
                                <Link>Đăng Nhập</Link>
                            </div>
                        </div> */}
                    </div>
                    <div className="title">
                        <img src={laptop} alt="" />
                    </div>
                </div>
            </div>
            <div className="thongke">
                <div className="contents">
                    <p>Thông Số Thống Kê</p>
                </div>
                <div className="main">
                    <div className="show">
                        {thongke.map((thongke) => {
                            return (
                                <div className="thongso" key={thongke.id}>
                                    <img src={thongke.icon} alt="" />
                                    <p className='content'>{thongke.content}</p>
                                    <p className='decs'>{thongke.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="containerStyle">
                    <p className='content'>
                        TẠI SAO BẠN NÊN CHỌN CHÚNG TÔI?
                    </p>
                    <p className="tilte">
                        Chúng tôi đã tích hợp Hệ thống Quản lý Phòng khám/Phòng mạch hoàn chỉnh của mình với nhiều tính năng ưu việt.
                    </p>
                    <p className="tilte">
                        Điều này giúp chúng tôi tạo ra một hệ sinh thái tiện dụng và an toàn cho Bệnh viện và Phòng khám/Phòng mạch.
                    </p>
                </div>
            </div>

            <Whys />

            <Why />
        </main>
    )
}

export default PhongKham