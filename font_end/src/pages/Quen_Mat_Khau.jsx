import '../css/uslogin.css'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import Iconzalo from '../img/iconzalo.png'
import Icongg from '../img/icongg.png'
import Iconfb from '../img/iconfb.png'
import logo from '../img/logo/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import api from './api';
import { setAccessToken } from './auth';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { isAuthenticated, decodeAccessToken } from './auth';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const QuenMatKhau = () => {
    const ok = () => toast.success('Thành Công!!! Vui lòng vào email để xác nhận mật khẩu mới', {});
    const [email, setEmail] = useState('');
    const [mess, setMess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelForgot = async () => {
        try {
            setLoading(true); // Bắt đầu hiệu ứng quay quyay
            const response = await api.post('/auth/forgot-password', { email });
            console.log('API Response:', response.data);

            if (response.data.err === -1) {
                alert("Tài Khoản chưa được đăng kí !!!")
            } else {
                alert("Thành công !!! Vui lòng truy cập email để cấp lại mật khẩu!!!")
                navigate('/login');
            }
        } catch (error) {
            console.error('Lỗi:', error);
        } finally {
            setLoading(false);
        }
    };






    return (
        <div className="container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}

            <div className="left">
                <div className="header" style={{
                        marginTop:150
                    }}>
                    <div className="icon" >
                        <Link style={{
                        marginTop:200
                    }} to='/login'><AiOutlineArrowLeft /></Link>
                    </div>
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="form">
                    <div className="content">
                        <p className="text_sdt text-color">Quên Mật Khẩu</p>
                        <div className="SDT">
                            <icon className="icon-sdt"><Link to="/" ><HiOutlineMail /></Link></icon>
                            <input type="email" placeholder="Nhập email đã đăng ký..." value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button className="CONTINIU" onClick={handelForgot}>
                            <div className="text_tieptuc">Tiếp tục</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="cheo">

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default QuenMatKhau;
