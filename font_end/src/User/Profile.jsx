import React, { useState } from 'react'
import './css/profile.css'
import { FaBirthdayCake, FaPhoneAlt, FaUserCircle, FaUserGraduate } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidEdit } from 'react-icons/bi';
import Model_Update_User from './Model_Update_User.jsx';
import { MdEmail } from 'react-icons/md';
export default function Profile({ inforUser, setInforUser }) {
    const [openModal, setOpenModal] = useState();
    const showModal = () => {
        setOpenModal(true)
    }
    return (
        <div className='main_profile'>
            <h4>
                Hồ sơ bệnh nhân
            </h4>
            <div className="box_profile">
                <div className="infor_user">
                    <div className="infor_user_text">
                        <p>
                            <span >
                                <FaUserCircle />
                            </span>
                            Họ và tên :
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
                                <FaBirthdayCake />
                            </span>
                            Ngày sinh :
                            <span>
                                {inforUser?.namSinh ? inforUser?.namSinh : 'Chưa cập nhập'}
                            </span>
                        </p>
                        <p>
                            <span >
                                <MdEmail />
                            </span>
                            Email :
                            <span>
                                {inforUser?.email ? inforUser?.email : 'Chưa cập nhập'}
                            </span>
                        </p>
                        <p>
                            <span >
                                <FaPhoneAlt />
                            </span>
                            Số điện thoại :
                            <span>
                                {inforUser?.sdt ? inforUser?.sdt : 'Chưa cập nhập'}
                            </span>
                        </p>
                        <p>
                            <span >
                                <FaUserGraduate />
                            </span>
                            Giới tính :
                            <span>
                                {inforUser?.gioiTinh ? inforUser?.gioiTinh : 'Chưa cập nhập'}
                            </span>
                        </p>
                        <p>
                            <span >
                                <FaLocationDot />
                            </span>
                            Địa chỉ :
                            <span>
                                {inforUser?.diaChi ? inforUser?.diaChi : 'Chưa cập nhập'}
                            </span>
                        </p>
                    </div>
                    <div className="box_profile_avatar">
                        <img src={inforUser?.avatar} alt="" />
                    </div>
                </div>
                <div className="box_profile_btn">
                    <div className="btn_edit" onClick={() => showModal()}>
                        <BiSolidEdit /> Sửa hồ sơ
                    </div>
                </div>
            </div>
            <Model_Update_User setOpenModal={setOpenModal} openModal={openModal} inforUser={inforUser} setInforUser={setInforUser} />
        </div>
    )
}
