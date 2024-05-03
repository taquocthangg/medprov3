import React from 'react'
import QRCode from "react-qr-code";
import './css/chi_tiet_phieu_kham.css'
import header_logo from '../img/header_logo.svg'
import icon_payment_failed from '../img/icon_payment_failed.svg'
import { ConfigProvider, Modal, message } from 'antd';
import { formatPrice } from '../Common/dataFortmat';
import { create_payment_url } from '../api';
import { useNavigate } from 'react-router-dom';
export default function Xac_Nhan_Thong_Tin({ setOpenModal, openModal, infoDatKham, }) {

    const status = 'DTT'
    const navigate = useNavigate()
    const handleOk = async () => {
        message.success("Chuyển qua vnpay")
        const id_user = localStorage.getItem('idUser')
        const response = await create_payment_url(infoDatKham.price, id_user)
        window.location.href = response.vnpUrl;
    };
    const handleCancel = () => {
        setOpenModal(false);
    };
    return (
        <div className="ctpk">
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: "#e8f2f7",
                            headerBg: "#e8f2f7"
                        },
                    },
                }}
            >
                <Modal
                    open={openModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Đồng ý"
                    cancelText="Hủy"
                    footer={(_, { OkBtn, CancelBtn }) => (
                        <>

                            <CancelBtn />
                            <OkBtn />
                        </>
                    )}
                    style={{ borderRadius: '20px' }}

                >
                    <div className='main_profile'>
                        <div className="top_phieu_kham">
                            <div className="line_ct_phieu_kham"></div>
                            <h2>
                                Xác Nhận Thông Tin Đặt Khám
                            </h2>
                            <p style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#3e3e3e',
                            }}>
                                {infoDatKham?.hospitalName}
                            </p>
                            <p style={{
                                fontWeight: '300',
                                fontSize: '13px',
                                color: 'rgb(124 124 124)'
                            }}>
                                {infoDatKham?.address}
                            </p>
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
                                    {infoDatKham?.timeSlot}
                                </p>
                            </> : null}
                            <div className="infor_kham">
                                <div className="infor_kham_line">
                                    <p>Chuyên khoa :</p>
                                    <p>
                                        {infoDatKham?.specialty}
                                    </p>
                                </div>
                                <div className="infor_kham_line">
                                    <p>Bác sĩ :</p>
                                    <p>
                                        {infoDatKham?.name}
                                    </p>
                                </div>
                                <div className="infor_kham_line">
                                    <p>Ngày khám :</p>
                                    <p>
                                        {infoDatKham?.selectedDate}
                                    </p>
                                </div>
                                <div className="infor_kham_line">
                                    <p>Phí khám :</p>
                                    <p>
                                        {formatPrice(infoDatKham?.price)} VNĐ
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="top_phieu_kham">
                            <div className="line_ct_phieu_kham"></div>

                            <div className="infor_kham">
                                <div className="infor_kham_line">
                                    <p>Bệnh nhân :</p>
                                    <p>
                                        {infoDatKham?.patientName}
                                    </p>
                                </div>
                                <div className="infor_kham_line">
                                    <p>Ngày sinh :</p>
                                    <p>
                                        {infoDatKham?.date}
                                    </p>
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
                                Quý khách vui lòng kiểm tra thông tin đã chính xác chưa.
                                Nếu quý khách cần hỗ trợ, vui lòng liên hệ tổng đài CSKH 1900 2115.
                            </p>
                            <div className="inforMed">
                                <img src={header_logo} alt="" />
                            </div>
                            <p className='med_des'>Đặt lịch khám tại Bệnh viện - Phòng khám hàng đầu Việt Nam</p>
                        </div>

                    </div>

                </Modal>
            </ConfigProvider>

        </div>
    )
}
