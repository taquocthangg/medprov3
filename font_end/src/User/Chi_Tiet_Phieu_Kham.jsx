import React from 'react'
import QRCode from "react-qr-code";
import './css/chi_tiet_phieu_kham.css'
import header_logo from '../img/header_logo.svg'
import icon_payment_failed from '../img/icon_payment_failed.svg'
export default function Chi_Tiet_Phieu_Kham({ inforPhieuKham, }) {
    const status = 'DTT'
    return (
        <div className="ctpk">
            <div className='main_profile'>
                <div className="top_phieu_kham">
                    <div className="line_ct_phieu_kham"></div>
                    <h2>
                        Phiếu Khám Bệnh
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#3e3e3e',
                    }}>
                        Phòng khám Chuyên Khoa Trị Trĩ
                    </p>
                    <p style={{
                        fontWeight: '300',
                        fontSize: '13px',
                        color: 'rgb(124 124 124)'
                    }}>
                        235 Hoàng Quốc Vịt - Hà Nội
                    </p>
                    {status == "DTT" ?
                        <>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#3e3e3e',
                            }}>
                                Mã phiếu
                            </p>
                            <QRCode
                                size={256}
                                style={{ height: "150px", maxWidth: "100%", width: "150px" }}
                                value='Con chó Khoái'
                                viewBox={`0 0 256 256`}
                            />
                            <div className="show_status">
                                Đặt khám thành công
                            </div></>
                        : null}
                    {status == "CTT" ? <>
                        <img src={icon_payment_failed} alt="" />
                        <p>Chưa thanh toán</p>
                    </> : null}
                    {status == "DH" ? <>
                        <div style={{ backgroundColor: '#ccc' }} className="show_status">
                            Đã Hủy
                        </div>
                        <p style={{
                            fontSize: '14px',
                            fontStyle: 'italic',
                            marginBottom: '10px',
                            color: '#df0000',
                            lineHeight: '1.3rem',
                            fontWeight: '400',
                            marginLeft: '10px',
                            textAlign: 'center'
                        }}>
                            Phiếu này không được tiếp nhận tại bệnh viện. Nếu bạn đã thanh toán và hủy trước ngày khám, phí khám sẽ được hoàn lại từ 30-45 ngày theo quy định của cổng thanh toán/ngân hàng. Vui lòng liên hệ 19002115 để được hỗ trợ.
                        </p>
                    </> : null}
                </div>
                <div style={{ alignItems: 'flex-start', }} className="top_phieu_kham">
                    {status == "DTT" ? <>
                        <div className="line_ct_phieu_kham"></div>
                        <p style={{
                            color: '#00b5f1',
                            fontSize: '13px',
                            textAlign: 'center',
                            margin: '0 auto'
                        }}>
                            Giờ khám dự kiến
                        </p>
                        <p style={{
                            color: '#00b5f1',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            margin: '0 auto'

                        }}>
                            08:00
                        </p>
                    </> : null}
                    <div className="infor_kham">
                        <div className="infor_kham_line">
                            <p>Dịch vụ :</p>
                            <p>Hú</p>
                        </div>
                        <div className="infor_kham_line">
                            <p>Hình thức khám :</p>
                            <p>Hú</p>
                        </div>
                        <div className="infor_kham_line">
                            <p>Chuyên khoa :</p>
                            <p>Hú</p>
                        </div>
                        <div className="infor_kham_line">
                            <p>Bác sĩ :</p>
                            <p>Hú</p>
                        </div>
                        <div className="infor_kham_line">
                            <p>Ngày khám :</p>
                            <p>Hú</p>
                        </div>
                        <div className="infor_kham_line">
                            <p>Phí khám :</p>
                            <p>Hú</p>
                        </div>
                    </div>
                </div>
                <div className="top_phieu_kham">
                    <div className="line_ct_phieu_kham"></div>

                    <div className="infor_kham">
                        <div className="infor_kham_line">
                            <p>Bệnh nhân :</p>
                            <p>Hú</p>
                        </div>
                        <div className="infor_kham_line">
                            <p>Ngày sinh :</p>
                            <p>Hú</p>
                        </div>
                    </div>
                </div>
                <div style={{ alignItems: 'flex-start' }} className="top_phieu_kham">
                    <div className="line_ct_phieu_kham"></div>
                    <p style={{
                        color: '#df0000',
                        fontSize: '14px',
                        fontStyle: 'italic',
                        fontWeight: '700',
                        marginLeft: '10px'
                    }} >Lưu ý:</p>
                    <p style={{
                        fontSize: '14px',
                        fontStyle: 'italic',
                        marginBottom: '10px',
                        color: '#3e3e3e',
                        lineHeight: '1.3rem',
                        fontWeight: '400',
                        marginLeft: '10px'
                    }}>
                        Quý khách nên đến sớm hơn thời gian đặt hẹn từ 10-15 phút để được đón tiếp và chuẩn bị chu đáo cho quá trình khám chữa bệnh.
                        Quý khách cần hỗ trợ, vui lòng liên hệ tổng đài CSKH 1900 2115.
                    </p>
                    <div className="inforMed">
                        <img src={header_logo} alt="" />
                    </div>
                    <p className='med_des'>Đặt lịch khám tại Bệnh viện - Phòng khám hàng đầu Việt Nam</p>
                </div>

            </div>
        </div>
    )
}
