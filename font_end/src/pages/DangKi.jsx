
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

const DangKi = () => {
    const history = useNavigate();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pass, setPass] = useState('');
    const [mess, setMess] = useState('');
    const notify = () => toast.success('🦄 Đăng ký thành công !!!', {});
    const validate = () => toast.warning('🦄 Vui lòng nhập email và mật khẩu !!!', {});
    const messErr = () => toast.error(mess, {});
    const [loading, setLoading] = useState(false);

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    //  Khi ấn đăn nhập
    const handleLogin = async () => {
        if (!email || !password) {
            validate();
        }
        else {
            try {
                setLoading(true);

                const response = await api.post('/auth/', { name, email, password });
                // /console.log('API Response:', response.data.access_token.token);
                const { access_token } = response.data;
                console.log('Token nhận được:', access_token);

                if (access_token != null) {
                    console.log('Người dùng đã đăng ký.');
                    notify();
                    alert("Đăng ký thành công!!! Vui lòng đăng nhập !!!")
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
                else {
                    setMess(response.data.mess);
                    messErr();
                }

            } catch (error) {
                console.error("Login failed:", error);
            }
            finally {
                setLoading(false);
            }
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
                <div className="header">
                    <div onClick={() => { history(-1) }} className="icon">
                        <Link><AiOutlineArrowLeft /></Link>
                    </div>
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="form">
                    <div className="content">
                        <p className="text_sdt text-color">Đăng Kí Tài Khoản</p>
                        <div className="SDT">
                            <icon className="icon-sdt"><Link to="/" ><HiOutlineMail /></Link></icon>
                            <input type="tel" placeholder="Họ và tên..." value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="SDT">
                            <icon className="icon-sdt"><Link to="/" ><HiOutlineMail /></Link></icon>
                            <input type="tel" placeholder="Nhập email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="SDT">
                            <icon className="icon-sdt"><Link to="/" ><RiLockPasswordLine /></Link></icon>
                            <input type="password" placeholder="Mật Khẩu..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="SDT">
                            <icon className="icon-sdt"><Link to="/" ><RiLockPasswordLine /></Link></icon>
                            <input type="password" placeholder="Nhập lại mật khẩu..." value={pass} onChange={(e) => setPass(e.target.value)} />
                        </div>
                        <div className="forgot_password">
                        </div>
                        <button className="CONTINIU" onClick={handleLogin}>
                            <div className="text_tieptuc">Tiếp tục</div>
                        </button>
                        <p className="text1 text-color">
                            <Link to='/login'>
                                Bạn đã có tài khoản? Đăng nhập tại đây
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="cheo">

                </div>
            </div>
            <ToastContainer />
        </div>

    )
}
export default DangKi