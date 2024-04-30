import React from 'react'
import null_data from '../img/null-data.webp'
import './css/phieu_kham.css'
import { FaBriefcaseMedical, FaHandHoldingMedical, FaHospitalAlt } from 'react-icons/fa'
import { MdOutlineAccessTimeFilled, MdOutlineDateRange } from 'react-icons/md'
export default function Da_Thanh_Toan({ inforUser, data }) {

    return (
        <div>
            {!data ?
                <>
                    <div style={{ padding: '20px' }} className="box_profile">
                        <div className="userName_User">
                            <h2> Tên Bệnh Nhân</h2>
                        </div>

                        <div className="line_phieu_kham"></div>
                        <div style={{ justifyContent: 'space-between', alignItems: 'flex-start' }} className="infor_user">
                            <div className="infor_user_text">
                                <p>
                                    <span >
                                        <FaHospitalAlt />
                                    </span>
                                    <span style={{
                                        color: "rgb(0, 181, 241)",
                                        fontWeight: '700',
                                        fontSize: '18px',
                                        textTransform: 'uppercase'
                                    }}>{
                                            inforUser?.name ? inforUser?.name : 'Chưa cập nhập'}
                                    </span>
                                </p>
                                <p>
                                    <span >
                                        <FaBriefcaseMedical />
                                    </span>
                                    Chuyên khoa :
                                    <span>
                                        {inforUser?.namSinh ? inforUser?.namSinh : 'Chưa cập nhập'}
                                    </span>
                                </p>
                                <p>
                                    <span >
                                        <FaHandHoldingMedical />
                                    </span>
                                    Bác sĩ :
                                    <span>
                                        {inforUser?.email ? inforUser?.email : 'Chưa cập nhập'}
                                    </span>
                                </p>
                                <p>
                                    <span >
                                        <MdOutlineDateRange />
                                    </span>
                                    Ngày Khám :
                                    <span>
                                        {inforUser?.sdt ? inforUser?.sdt : 'Chưa cập nhập'}
                                    </span>
                                </p>
                                <p>
                                    <span >
                                        <MdOutlineAccessTimeFilled />
                                    </span>
                                    Giờ khám :
                                    <span>
                                        {inforUser?.gioiTinh ? inforUser?.gioiTinh : 'Chưa cập nhập'}
                                    </span>
                                </p>

                            </div>
                            <div className="box_profile_avatar">
                                <div className="btn_phieu_kham">
                                    Đặt khám thành công
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="null_data">
                        <h2>
                            Bạn chưa có phiếu khám nào
                        </h2>
                        <img src={null_data} alt="" />
                    </div>
                </>
            }

        </div>
    )
}
