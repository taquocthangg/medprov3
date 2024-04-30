
// import '../css/uslogin.css'
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
import { GoogleLogin } from '@react-oauth/google';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
import MarkDown from '../componnets/MarkDown/markDown';
import Select_day from '../User/Select_day';
import { getCurentUser, getUser, login } from '../api';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mess, setMess] = useState('');
    const notify = () => toast.success('🦄 Đăng nhập thành công !!!', {});
    const validate = () => toast.warning('🦄 Vui lòng nhập email và mật khẩu !!!', {});
    const messErr = () => toast.error(mess, {});
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);

    // Check người dùng đăng nhập chưa

    useEffect(() => {
        const userIsAuthenticated = isAuthenticated();

        // Nếu người dùng đã đăng nhập, chuyển hướng đến trang khác (ví dụ: trang dashboard)
        if (userIsAuthenticated) {
            const decodedToken = decodeAccessToken();
            if (userIsAuthenticated) {
                console.log('Người dùng đã đăng nhập.');
                notify();
                const userId = decodedToken.id;
                localStorage.setItem('userId', userId);
                setTimeout(() => {
                    switch (decodedToken.role_id) {
                        case 'R1':
                            navigate('/admin');
                            break;
                        case 'R2':
                            navigate('/benh-vien' + decodedToken.id);
                            break;
                        case 'R3':
                            navigate('/bac-si/' + decodedToken.id);
                            break;
                        case 'R4':
                            navigate('/');
                            break;
                        default:
                            console.log('Role không hợp lệ.');
                    }
                }, 1000);
            } else {
                console.log('Người dùng chưa đăng nhập. Chuyển hướng đến trang đăng nhập.');
                navigate('/login');
            }
        }
    }, [navigate]);

    //  Khi ấn đăn nhập 
    const handleLogin = async () => {
        // if (!email || !password) {
        //     validate();
        // }
        // else {
        //     try {
        //         setLoading(true); // Bắt đầu hiệu ứng quay quyay

        //         const response = await api.post('/auth/login', { email, password });
        //         console.log('API Response:', response.data);
        //         const { access_token } = response.data;
        //         if (access_token != null) {
        //             setAccessToken(access_token);
        //             const userIsAuthenticated = isAuthenticated();
        //             const decodedToken = jwtDecode(access_token);
        //             if (userIsAuthenticated) {
        //                 console.log('Người dùng đã đăng nhập.');
        //                 const userId = decodedToken.id;
        //                 localStorage.setItem('userId', userId);

        //                 notify();
        //                 setTimeout(() => {
        //                     switch (decodedToken.role_id) {
        //                         case 'R1':
        //                             navigate('/admin');
        //                             window.location.reload();
        //                             break;
        //                         case 'R2':
        //                             navigate('/benh-vien/' + decodedToken.id);
        //                             window.location.reload();
        //                             break;
        //                         case 'R3':
        //                             navigate('/bac-si/' + decodedToken.id);
        //                             window.location.reload();
        //                             break;
        //                         case 'R4':
        //                             navigate('/');
        //                             window.location.reload();
        //                             break;
        //                         default:
        //                             console.log('Role không hợp lệ.');
        //                     }
        //                 }, 1000);
        //             } else {
        //                 console.log('Người dùng chưa đăng nhập. Chuyển hướng đến trang đăng nhập.');
        //                 navigate('/login');
        //             }
        //         }
        //         else {
        //             setMess(response.data.mess);
        //             messErr();
        //         }
        //         console.log('Token nhận được:', access_token);

        //     } catch (error) {
        //         console.error("Login failed:", error);
        //     }
        //     finally {
        //         setLoading(false); // Bắt đầu hiệu ứng quay quyay

        //     }
        // }

        // Tự hiểu nhé :)))
        const response = await login(email, password)
        console.log(response)

        const in4User = await getUser({ limit: 5, sex: 'Nam', })
        console.log(in4User)

        const user = await getCurentUser(1)
        console.log(user)
    };
    //  Khi ấn đăn nhậpvới gôgle
    const handleLoginWithGoogle = async () => {
        try {
            if (name, email, password, avatar) {
                const response = await api.post('/auth/', { name, email, password, avatar });
                const { access_token } = response.data;
                console.log('Token nhận được:', access_token);
                if (access_token != null) {
                    setAccessToken(access_token);
                }
                else {
                    await handleLogin()
                }
            }
            // console.log('API Response:', response.data.access_token.token);

        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    useEffect(() => {
        // Chỉ gọi khi email thay đổi
        handleLoginWithGoogle();
    }, [email]);




    return (
        <div className="container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <div className="left">
                <div className="header">
                    <div className="icon">
                        <Link to='/'><AiOutlineArrowLeft /></Link>
                    </div>
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="form">
                    <div className="content">
                        <p className="text_sdt text-color">Vui lòng nhập email và mật khẩu để tiếp tục</p>
                        <div className="SDT">
                            <icon className="icon-sdt"><Link to="/" ><HiOutlineMail /></Link></icon>
                            <input type="tel" placeholder="medpro@vn.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="SDT">
                            <icon className="icon-sdt"><Link to="/" ><RiLockPasswordLine /></Link></icon>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="forgot_password">
                            <Link className='text_sdt text-color' to="/quen-mat-khau">
                                Quên mật khẩu
                            </Link>
                        </div>
                        <button className="CONTINIU" onClick={handleLogin}
                        >
                            <div className="text_tieptuc">Tiếp tục</div>
                        </button>
                        <p className="text1 text-color">
                            <Link to='/dang-ki'>
                                Đăng Kí
                            </Link>
                            ..hoặc đăng nhập bằng tài khoản</p>
                        <button className="menu menu1">
                            <img src={Iconzalo} alt="" />
                            <p>ĐĂNG NHẬP VỚI ZALO</p>
                        </button>
                        <button className="menu menu2">
                            <GoogleLogin
                                onSuccess={async credentialResponse => {
                                    const credentialResponseDecode = jwtDecode(credentialResponse.credential);
                                    setEmail(credentialResponseDecode.email)
                                    setName(credentialResponseDecode.name)
                                    setPassword(credentialResponseDecode.email)
                                    setAvatar(credentialResponseDecode.picture)
                                    console.log(credentialResponseDecode)
                                    await handleLoginWithGoogle()
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />;
                        </button>
                        <button className="menu menu3">
                            <LoginSocialFacebook
                                appId={process.env.REACT_APP_FB_APP_ID || '2600304363460559'}
                                fieldsProfile={
                                    'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                                }
                                onResolve={(response) => {
                                    console.log(response)
                                }}
                                onReject={err => {
                                    console.log(err);
                                }}
                            >
                                <FacebookLoginButton />
                            </LoginSocialFacebook>
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
        // <>
        //     <MarkDown />
        //     <Select_day />
        // </>
    )
}
export default Login