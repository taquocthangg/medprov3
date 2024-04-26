import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import '../css/QuanLyUsert.css'
import Table from './Table_User'
import Update_User_Detail from './Update_User_Detail';
const QuanLyUsert = ({ search_text }) => {
  const navigate = useNavigate();
  const [data_user, setData_user] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getIdUser, setGetIdUser] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [view_detailUpdate, setView_detail] = useState(false);
  const [yes, setYes] = useState(false)
  const handleUpdateClick = async (idUser) => {
    // setGetIdUser(idUser);
    // setView_detail(true)

      try {
        // Gửi yêu cầu DELETE đến API
        const response = await axios.delete(`http://localhost:5000/api/v1/auth/xoaUser/` + idUser);
        console.log(response)
        fetchData();
        if (response.data.mess == "Xóa user thành công") {
         
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    
    //handleDeleteClick(idUser);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/auth/getAllUser');
      setData_user(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi:', error);
      setLoading(false);
    }
  };
  const filteredUsers = data_user.filter(user => user.role_id === "R4");
  useEffect(() => {
    fetchData();
  }, []);
  const Back_Change_Static = () => {
    setView_detail(false);
    setYes(false)
  }
  const delete_Change_User = async (userId) => {
    console.log(userId)
    if (view_detailUpdate) {
      setView_detail(false)
      setYes(true)
      console.log(yes)
    }


  }
  const handleDeleteClick = async (userId) => {

    if (view_detailUpdate) {
      if (yes) {
        try {
          // Gửi yêu cầu DELETE đến API
          const response = await axios.delete(`http://localhost:5000/api/v1/auth/xoaUser/` + userId);
          console.log(response)
          if (response.data.mess == "Xóa user thành công") {
            fetchData();
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    }

  };
 

  return (
    <div className="container_QuanLyUser">
      <div className={view_detailUpdate ? "background_userQL" : "staitc_change_none"}>

      </div>
      <div className={view_detailUpdate ? "static_change" : "staitc_change_none"}>
        <div className="button_static">
          <p className='title_static'>Dữ liệu sẽ không thể được khôi phục</p>
          <div className="btn_sattic">
            <button className='btn_user_static btn_uset_no' onClick={Back_Change_Static}>Không </button>
            <button className='btn_user_static btn_user_yes' onClick={delete_Change_User}>Có </button>
          </div>
        </div>
      </div>
      <div className="header_QuanLyUser">
        <h2>Bệnh nhân</h2>

      </div>
      <div className="">
        <table border={2} className='table_user'>
          <tr className='title_table_user'>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Địa chỉ</th>
            <th>Giới Tính</th>
            <th>Số điện thoại</th>
            <th>Năm sinh</th>
            <th>Email</th>
            <th>Chức năng</th>
          </tr>
          {filteredUsers.map((item) => (
            <tr key={item.id} className='content_table_user'>
              <th>{item.id}</th>
              <th>{item.name}</th>
              <th>{item.diaChi}</th>
              <th>{item.gioiTinh}</th>
              <th>{item.sdt}</th>
              <th>{item.namSinh}</th>
              <th>{item.email}</th>
              <th className='button_table_user'>
                <button className='btn_table_user btn_update_table' onClick={() => handleUpdateClick(item.id)}> <Link to={`Update_User_Detail/${item.id}`}>Sửa</Link></button>
                <button className='btn_table_user btn_delete_table' onClick={() => handleUpdateClick(item.id)}>Xóa</button>
              </th>
            </tr>
          ))}
        </table>

      </div>
    </div>

  )
}

export default QuanLyUsert