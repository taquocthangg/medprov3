import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, decodeAccessToken, logout } from '../pages/auth';
import './css.css'
import '../css/Admin_header.css'
import '../css/Admin_Simplebar.css'
import { useParams } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import Benh_An from "../User/Benh_An"
import Xem_LK from "../User/Xem_LK"
const User = () => {
    const [activeButton, setActiveButton] = useState(true);
  const [activeButton1, setAtiveButton1] = useState(true);
  const [activeBtn2, setActiveBtn2] = useState(true);
  const [search_Header, setSearch_Header] = useState("");
    const navigate = useNavigate();
    const handleLogout = () => {
        // Thực hiện đăng xuất
        logout();

        // Chuyển hướng đến trang đăng nhập
        navigate('/');
    };
    
    const staticBtn_1 = () => {
        setActiveButton(false);
        setActiveBtn2(true);
        setAtiveButton1(true);
      }
      const staticBtn_2 = () => {
        setActiveButton(true);
        setActiveBtn2(false);
        setAtiveButton1(true);
      }
      const staticBtn_3 = () => {
        setActiveButton(true);
        setActiveBtn2(true);
        setAtiveButton1(false);
      }
      const getSearch = (value) => {
        setSearch_Header(value);
      }
    return (
        <div>
            <div className="container_Admin">
                <div className="Admin_Simplebar">
                    <div className="container_Simplebar">
                        <div className="image_Simplebar"  >
                            {/* <img src={logo_icon} alt="" className="img_Simplebar" /> */}
                            <div className="Simplebar_user">
                                <div className="icon_userSimplebar">
                                    {/* <FaRegUser /> */}
                                    <p className="name_Simplebar">USER</p>
                                </div>

                            </div>

                        </div>
                        <div className="content_Simplebar">
                            <ul className="menu_Simplebar" >
                                <li className={activeButton ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_1}    >
                                    <div className="icon_itemSimplebar" >
                                        <FaRegUser />
                                    </div>
                                    <p>XEM LỊCH KHÁM</p>
                                </li>
                                <li className={activeButton1 ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_3}      >
                                    <div className="icon_itemSimplebar" >
                                        <FaHospital />
                                    </div>
                                    <p>BỆNH ÁN</p>
                                </li>
                                <li className={activeBtn2 ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')}      >
                                    <div className="icon_itemSimplebar" >
                                        <FaHospital />
                                    </div>
                                    <p onClick={handleLogout}>Đăng Xuất</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="admin_Header" >
                    <div className="container_headeAdmin">
                        {/* <div className="header_Admin">
                            <div className="header_admin_box">
                                <div className="icon_searchAdmin">
                                    <IoIosSearch />
                                    <input type="text" className="input_searchAdmin" onChange={(e) => getSearch(e.target.value)} />
                                </div>
                                <div className="item_header_admin">
                                    <button className="btn_flash">
                                       
                                    </button>
                                    <button className="btn_bell">
                                        <div className="icon_bell">
                                            <  AiOutlineBell />
                                        </div>
                                    </button>
                                    <button>
                                        <div className="icon_user">
                                            <FaRegUser />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="content_Admin">
                        <div className={activeButton1 ? 'check_static' : 'QuanLyNews'}>
                            <Benh_An search_text={search_Header} />

                        </div>
                        <div className={activeButton ? 'check_static' : 'QuanLyUsert'}>
                            <Xem_LK />
                        </div>
                    </div>
                </div>
            </div>
            {/* <button onClick={handleLogout}>Đăng Xuất</button> */}
        </div>
    );
}

export default User;
