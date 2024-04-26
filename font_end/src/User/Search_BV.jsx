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
const Search_ = () => {
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
  return (
<div className=""></div>
  )
}

export default BenhVien;
