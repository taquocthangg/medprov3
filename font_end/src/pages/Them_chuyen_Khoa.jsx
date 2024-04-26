import "../css/Admin.css"
import "../css/Admin_Simplebar.css"
import logo_icon from "../img/logo/logo.png"
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../css/QuanLyUsert.css'
const ThemChuyeKhoa = () => {
  const { getId } = useParams();
  const navigate = useNavigate();
  const [data_user, setData_user] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getIdUser, setGetIdUser] = useState("");
  const handleUpdateClick = (idUser) => {
    setGetIdUser(idUser);
  };
  const Delete_chuyen_khoa = async (idUser) => {
    try {
      // Gửi yêu cầu DELETE đến API
      const response = await axios.delete(`http://localhost:5000/api/v1/auth/xoaChuyenKhoa/` + idUser);
      console.log(response)
      if (response.data.mess == "Xóa chuyên khoa thành công") {
        alert("Xóa chuyên khoa thành công");
        fetchDataChuyenKhoa()
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }

  };
  const fetchDataChuyenKhoa = async () => {
     const response = await axios.get('http://localhost:5000/api/v1/auth/chuyenkhoa/' + getId)
      .then(response => {
        setData_user(response.data.chuyenkhoa);
        setLoading(false);
        // console.log(response)
        // console.log(response.data.chuyenkhoa)
      })
      .catch(error => {
        console.error('Lỗi:', error);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchDataChuyenKhoa()
  }, []);

  return (
    <div className="container_QuanLyUser">
      <div className="header_QuanLyUser">
        <h2>Chuyên Khoa</h2>
        <button className='button_user_insert'><Link to={`them-moi-chuyen-khoa/${getId}`}>+ Thêm Chuyên Khoa</Link></button>
      </div>
      <div className="">
        <table border={2} className=' table_patine'>
          <tr className='title_table_user'>
            <th>ID</th>
            <th>Tên Chuyên Khoa</th>
            <th>Mô tả</th>
            <th>Giá thành</th>
            <th>Chức năng</th>
          </tr>
          {data_user.map((item) => (
            <tr key={item.id} className='content_table_user'>
              <th>{item.id}</th>
              <th>{item.name}</th>
              <th>{item.description}</th>
              <th>{item.price}đ</th>
              <th className='button_table_user'>
                <button className='btn_table_user btn_update_table' onClick={() => handleUpdateClick(getId)}> <Link to={`/update_Chuyen_Khoa/${getId}`}>Sửa</Link></button>
                <button className='btn_table_user btn_delete_table' onClick={() => Delete_chuyen_khoa(item.id)}>Xóa</button>
              </th>
            </tr>
          ))}
        </table>

      </div>
    </div>
  )
}

export default ThemChuyeKhoa