import "../css/Admin.css"
import "../css/Admin_Simplebar.css"
import logo_icon from "../img/logo/logo.png"
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from 'react-router-dom'
import '../css/QuanLyUsert.css'
import useId from "@mui/material/utils/useId";
import { Alert } from "@mui/material";

const QuanLyBV = () => {
  const navigate = useNavigate();
  const [data_user, setData_user] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getIdUser, setGetIdUser] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [view_detailUpdate, setView_detail] = useState(false);
  const [data_admin,setData_admin]=useState("");
  const [yes,setYes]=useState(true)
  const getId = localStorage.getItem('userId');
  const handleUpdateClick = (idUser) => {
    setGetIdUser(idUser);

  };
  const Change_Static=()=>{
    setView_detail(true);
  }
  const Back_Change_Static=()=>{
    setView_detail(false);
    setYes(false)
  }
  const delete_Change_User = async (userId) => {
    try {
      // Gửi yêu cầu DELETE đến API
      const response = await axios.delete(`http://localhost:5000/api/v1/auth/xoaUser/` + userId);
      console.log(response)
      fetchData();
      if (response.data.mess == "Xóa user thành công") {
       
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  

 
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/auth/getAllBenhVien');
      setData_user(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container_QuanLyUser">
      <div className={view_detailUpdate ? "background_userQL" : "staitc_change_none"}>

      </div>
      {/* <div className={view_detailUpdate ? "static_change" : "staitc_change_none"}>
        <div className="button_static">
          <p className='title_static'>Dữ liệu sẽ không thể được khôi phục</p>
          <div className="btn_sattic">
            <button className='btn_user_static btn_uset_no' onClick={Back_Change_Static}>Không </button>
            <button className='btn_user_static btn_user_yes' onClick={delete_Change_User({getIdUser})}>Có </button>
          </div>
        </div>
      </div> */}
      <div className="header_QuanLyUser">
        <h2>Bệnh Viện</h2>
        <button className='button_user_insert'><Link to={`/admin/${getId}/Insert_Patent_Detail`}>+ Thêm Bệnh Viện</Link></button>
      </div>
      <div className="">
        <table border={2} className=' table_patine'>
          <tr className='title_table_user'>
            <th>ID</th>
            <th>Tên bệnh viện</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Chức năng</th>
          </tr>
          {data_user.map((item) => (
            <tr key={item.id} className='content_table_user'>
              <th>{item.id}</th>
              <th>{item.name}</th>
              <th>{item.diaChi}</th>
              <th>{item.sdt}</th>
              <th>{item.email}</th>
              <th className='button_table_user'>
                <button className='btn_table_user btn_update_table' onClick={() => handleUpdateClick(item.id)}> <Link to={`Update_Patent_Detail/${item.id}`}>Sửa</Link></button>
                <button className='btn_table_user btn_delete_table'onClick={()=>delete_Change_User(item.id)}>Xóa</button>
              </th>
            </tr>
          ))}
        </table>

      </div>
    </div>
  )
}

export default QuanLyBV