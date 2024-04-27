import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import DatKham from "./DatKham";
import BenhAn from "./BenhAn";
import DonKham from "./DonKham"
import { isAuthenticated, decodeAccessToken, logout } from '../../pages/auth';

// import logo_icon from "../img/logo/logo.png"
// import flash from "../img/Admin/Header_Admin/icon_flash.jpg"
import axios from "axios";
const BacSi = () => {
  const { getid } = useParams();
  const [query, setQuery] = useState("");
  const [getIdBS, setgetIdBS] = useState("");
  const [data, setData] = useState(null);

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
  const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/v1/auth/lichkhamdadat/1`)
  //     .then((response) => {
  //       // Xử lý dữ liệu từ response.data
  //       setData(response.data.Data);
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       // Xử lý lỗi
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  const handleLogout = () => {
    //Thực hiện đăng xuất
    logout();

    navigate('/login');
    // Chuyển hướng đến trang đăng nhập
  };
  return (
    <div className="container_Admin">
      <div className="Admin_Simplebar">
        <div className="container_Simplebar">
          <div className="image_Simplebar"  >
            {/* <img src={logo_icon} alt="" className="img_Simplebar" /> */}
            <div className="Simplebar_user">
              <div className="icon_userSimplebar">
                <FaRegUser />
                <p className="name_Simplebar">Bác sĩ</p>
              </div>

            </div>

          </div>
          <div className="content_Simplebar">
            <ul className="menu_Simplebar" >
              <li className={activeButton ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_1}    >
                <div className="icon_itemSimplebar" >
                  <FaRegUser />
                </div>
                <p>LỊCH KHÁM</p>
              </li>
              <li className={activeButton1 ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_3}      >
                <div className="icon_itemSimplebar" >
                  <FaHospital />
                </div>
                <p>BỆNH ÁN</p>
              </li>
              <li className={activeBtn2 ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_2}      >
                <div className="icon_itemSimplebar" >
                  <FaHospital />
                </div>
                <p>ĐƠN KHÁM</p>
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
                  {/* <img src={flash} className="header_flash"></img> */}
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
            <BenhAn search_text={search_Header} />

          </div>
          <div className={activeButton ? 'check_static' : 'QuanLyUsert'}>
            <DatKham />
          </div>
          <div className={activeBtn2 ? 'check_static' : "QuanLyBV"}>
            <DonKham />
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="bacsi_container">
    //     <div className="bacsi__header">
    //       <h2 className="bacsi_header-h2">BÁC SĨ</h2>
    //       <ul className="bacsi__header-list">
    //         <li className="bacsi_header-item">
    //           <Link to="/BacSi" className="bacsi_header-link">
    //             LỊCH KHÁM
    //           </Link>
    //         </li>
    //         <li className="bacsi_header-item">
    //           <Link to="/DatKham" className="bacsi_header-link">
    //             THÊM LỊCH KHÁM
    //           </Link>
    //         </li>
    //         <li className="bacsi_header-item">
    //           <Link to="/BenhAn" className="bacsi_header-link">
    //               BỆNH ÁN
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="bacsi_body">
    //       <div className="bacsi_body-out">
    //       < Link to="/" className="bacsi_body-logout">
    //           LOG OUT
    //         </Link>
    //       </div>
    //       <div className="bacsi_body_container">
    //         <div className="bacsi_body_container_fisrt">
    //           <h2> DANH SÁCH LỊCH KHÁM</h2>
    //           {/* <input
    //                     className=""
    //                     placeholder="Tìm nhanh bệnh viện..."
    //                     onChange={(e) => setQuery(e.target.value.toLowerCase())}
    //                 /> */}
    //           <table>
    //             <div className="bacsi_body_table">
    //               <thead className="bacsi_body_thear">
    //                 <tr>
    //                   <th className="bacsi_body_thear">Tên bệnh nhân</th>
    //                   <th className="bacsi_body_thear">Số điện thoại</th>
    //                   <th className="bacsi_body_thear">Địa chỉ</th>
    //                   <th className="bacsi_body_thear">Giới tính</th>
    //                   <th className="bacsi_body_thear">Năm sinh</th>
    //                   <th className="bacsi_body_thear">Ngày Khám</th>
    //                   <th className="bacsi_body_thear">Thời gian</th>
    //                   <th className="bacsi_body_thear">Chức năng</th>
    //                 </tr>
    //               </thead>
    //               <tbody className="bacsi_body_tbody">
    //               {/* {data.map((item) => (
    //                     <tr key={item.id}>
    //                       <td className="bacsi_body_td">{item.User.name}</td>
    //                       <td className="bacsi_body_td">{item.User.sdt}</td>
    //                       <td className="bacsi_body_td">{item.User.diaChi}</td>
    //                       <td className="bacsi_body_td">{item.User.gioiTinh}</td>
    //                       <td className="bacsi_body_td">{item.User.namSinh}</td>
    //                       <td className="bacsi_body_td">
    //                       </td>
    //                     </tr>
    //                     ))} */}
    //               </tbody>
    //             </div>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BacSi;
