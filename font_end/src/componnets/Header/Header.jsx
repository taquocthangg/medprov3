/*
========================= Trang Chủ =========================
=                           Author                          =
=                         Quốc Thắng                        =
=                            And                            =
=                         Tiến Khoái                        =
=============================================================
*/
import React, { useEffect, useState } from 'react';
import './Header.css'
import { Link } from 'react-scroll';
import { useLocation } from "react-router-dom";
import { FiSmartphone } from 'react-icons/fi';
import { BiLogIn } from 'react-icons/bi';
import { AiFillHome } from "react-icons/ai"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { FiSettings } from "react-icons/fi"
import { HiOutlineBookOpen } from "react-icons/hi"
import { HiOutlineNewspaper } from "react-icons/hi"
import { BsPatchQuestion } from "react-icons/bs"
import { MdContactMail } from "react-icons/md"
import { MdComputer } from "react-icons/md"
import { NavLink } from "react-router-dom";
import { isAuthenticated, decodeAccessToken } from '../../pages/auth';
import api from '../../pages/api';
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
const Header = () => {
  const userIsAuthenticated = isAuthenticated();
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [idUser, setIdUser] = useState(userId);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  useEffect(() => {
    setIdUser(userId)
    console.log('User ID:', userId);
  }, [userId]);
  useEffect(() => {
    api.get("/auth/getCurent/" + idUser)
      .then((response) => {
        const userData = response.data.user;
        if (userData) {
          setUser(userData);
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Error fetching data:", error);
      });
  }, []);
  const { pathname } = useLocation();
  const isUpdateUserDetailPage = pathname.includes('/admin/Update_User_Detail');
  const isUpdate_Patent_Detail = pathname.includes('/Update_Patent_Detail');
  const isInsert_Patent_Detail = pathname.includes('/Insert_Patent_Detail');
  const isIsert_Doctor = pathname.includes('/thembacsi');
  const isUpdate_Doctor = pathname.includes('/updateUser')
  const benhVien = pathname.includes('/benh-vien');
  const isUpdate_Chuyen_Khoa = pathname.includes('/update_Chuyen_Khoa')
  const idDoc_tor = pathname.includes('/bac-si');
  const quen = pathname.includes('/quen-mat-khau')

  if (pathname === "/login" || pathname === "/QuanLyBV" || pathname === "admin/Update_User_Detail/:getId" || pathname === "/QuanLyNews" || pathname === "/QuanLyUsert" || pathname === "/phong-kham-phong-mach/dang-nhap" || pathname === "/phong-kham-phong-mach/dang-ky" || pathname === "/admin" || pathname === "/benh-vien" || pathname === '/dang-ki') return null;
  if (isUpdateUserDetailPage || isUpdate_Patent_Detail || idDoc_tor || isInsert_Patent_Detail || benhVien || isIsert_Doctor || isUpdate_Doctor || isUpdate_Chuyen_Khoa || quen) {
    return (
      <div>
        {/* Nội dung trang Update_User_Detail */}
        {/* ... */}
      </div>
    );
  }



  return (

    <>
      <div className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <img src="https://resource.medpro.com.vn/static/images/medpro/web/header_logo.svg?t=10787.381354053212" alt="" />
          </NavLink>
          <div className={click ? "nav-menu active" : "nav-menu"}>
            <div className="nav__top">
              <Link to="download">
                <div className="download item_header hvr-bounce-to-top">
                  <i className="hone"><FiSmartphone /></i>
                  Tải ứng dụng
                </div>
              </Link>
              {userIsAuthenticated ? (
                <div className="login item_header">
                  <NavLink

                    to="/user"
                  >
                    Xin chào {user ? user.name : "Ok"}
                  </NavLink>
                </div>
              ) : (
                <div className="login item_header">
                  <NavLink

                    to="/login"
                  >
                    <i className="header_login"><BiLogIn /></i>
                    Đăng Nhập
                  </NavLink>
                </div>
              )}
            </div>
            <div className="nav__bot">
              <ul>
                <li className="nav-item">
                  <NavLink

                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className='icon__mobile'> <AiFillHome /> </i>  Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink

                    to="/gioi-thieu"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className="icon__mobile"> <AiOutlineInfoCircle /></i>  Giới Thiệu
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink

                    to="quy-trinh"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className="icon__mobile"> <FiSettings /> </i>  Quy trình
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink

                    to="huong-dan"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className="icon__mobile"><HiOutlineBookOpen /></i> Hướng Dẫn
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink

                    to="tin-tuc"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className="icon__mobile"><HiOutlineNewspaper /></i>  Tin Tức
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink

                    to="thac-mac"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className="icon__mobile"><BsPatchQuestion /></i>  Thắc Mắc
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink

                    to="lien-he"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className="icon__mobile"><MdContactMail /></i> Liên Hệ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink

                    to="phong-kham"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    <i className="icon__mobile"><MdComputer /></i>  Phòng Khám
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <GrClose /> : <FaBars />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header