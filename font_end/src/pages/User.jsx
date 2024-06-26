import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logout } from '../pages/auth';
import AppRouterUser from "../User/AppRouterUser";
import SilerMenuUser from "../User/SilerMenuUser";
const User = ({ inforUser, setInforUser }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Thực hiện đăng xuất
        logout();

        // Chuyển hướng đến trang đăng nhập
        navigate('/');
    };
    const [screenWidth, setScreenWidth] = useState()
    useEffect(() => {
        const screenWidth = window.innerWidth - 250
        setScreenWidth(screenWidth)
    }, [screenWidth]);
    return (
        <div className="container_user" style={{ display: 'flex' }}>
            <div className="menus" style={{ width: '250px', position: 'fixed', top: '120px', overflowY: 'auto', backgroundColor: '#fff' }}>
                <SilerMenuUser />
            </div>
            <div style={{ marginLeft: '250px', width: screenWidth, minHeight: '60vh' }}>
                <AppRouterUser inforUser={inforUser} setInforUser={setInforUser} />
            </div>
        </div>
    );
}

export default User;
