import "../css/Admin.css";
import { useState } from "react";
import { Link, useNavigate,useParams } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import "../css/Admin_header.css"
import logo_icon from "../img/logo/logo.png"
import { FaRegUser } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
import flash from "../img/Admin/Header_Admin/icon_flash.jpg"
import { AiOutlineBell } from "react-icons/ai";
import "../css/Admin_header.css"
import "../css/Admin_Simplebar.css"
import { isAuthenticated, decodeAccessToken, logout } from '../pages/auth';
import { useEffect } from "react";
import ThemBacSi from "./Them_Bac_Si";
import ThemChuyenKhoa from "./Them_chuyen_Khoa";
const BenhVien = () => {
  const navigate = useNavigate();
  const { getId } = useParams();
  const [data_user,setData_user]=useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/auth/getCurent/" + getId)
      .then((response) => {
        console.log(response);
        setData_user(response.data.user);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);
  const handleLogout = () => {
    // Thực hiện đăng xuất
    logout();

    // Chuyển hướng đến trang đăng nhập
    navigate('/login');
  };
  const [activeButton, setActiveButton] = useState(true);
  const [activeButton1, setAtiveButton1] = useState(true);
  const [activeBtn2, setActiveBtn2] = useState(true);
  const [search_Header, setSearch_Header] = useState("");

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
    <div className="container_Admin">
      <div className="Admin_Simplebar">
        <div className="container_Simplebar">
          <div className="image_Simplebar"  >
            <img src={logo_icon} alt="" className="img_Simplebar" />
            <div className="Simplebar_user">
              <div className="icon_userSimplebar">
                <FaRegUser />
                <p className="name_Simplebar">{data_user.name}</p>
              </div>
             
            </div>

          </div>
          <div className="content_Simplebar">
            <ul className="menu_Simplebar" >
              <li className={activeButton ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_1}    >
                <div className="icon_itemSimplebar" >
                  <FaRegUser />
                </div>
                <p>Quản lý chuyên khoa</p>
              </li>
              <li className={activeButton1 ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_3}      >
                <div className="icon_itemSimplebar" >
                  <FaHospital />
                </div>
                <p>Quản lý bác sĩ</p>
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
          <div className="header_Admin">
            <div className="header_admin_box">
              <div className="icon_searchAdmin">
                <IoIosSearch />
                <input type="text" className="input_searchAdmin" onChange={(e) => getSearch(e.target.value)} />
              </div>
              <div className="item_header_admin">
                <button className="btn_flash">
                  <img src={flash} className="header_flash"></img>
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
          </div>
        </div>
        <div className="content_Admin">
          <div className={activeButton1 ? 'check_static' : 'QuanLyNews'}>
          <ThemBacSi search_text={search_Header} />
            
          </div>
          <div className={activeButton ? 'check_static' : 'QuanLyUsert'}>
            <ThemChuyenKhoa />
          </div>
          <div className={activeBtn2 ? 'check_static' : "QuanLyBV"}>
            {/* <QuanLyNews /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenhVien;
