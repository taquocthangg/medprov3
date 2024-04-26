import "../css/Admin.css"
import "../css/Admin_Simplebar.css"
import logo_icon from "../img/logo/logo.png"
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link ,useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import '../css/BV_BacSi.css'
import '../css/QuanLyUsert.css'
const ThemBacSi = () => {
  const { getId } = useParams();
  const navigate = useNavigate();
  const [data_user, setData_user] = useState([]);
  const [data_specialist,setData_specialist]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getIdUser, setGetIdUser] = useState("");
  const [status_doctor,setStatus_doctor]=useState(true);
  const [getId_Doctor,setGetId_Doctor]=useState("");
  const handleUpdateClick = (idUser) => {
    setGetIdUser(idUser);
  };
  const Delete_chuyen_khoa = async (idUser) => {
      try {
        // Gửi yêu cầu DELETE đến API
        const response = await axios.delete(`http://localhost:5000/api/v1/auth/xoaUser/` + idUser);
         console.log(idUser)
        if (response.data.mess == "Xóa chuyên khoa thành công") {
          alert("Xóa chuyên khoa thành công" );
          
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    
  };
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/auth/chuyenkhoa/'+ getId)
      .then(response => {
        setData_specialist(response.data.chuyenkhoa);
        setLoading(false);
        // console.log(response)
        // console.log(response.data.chuyenkhoa)    
      })
      .catch(error => {
        console.error('Lỗi:', error);
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    // useEffect sẽ được gọi lại khi getId_Doctor hoặc giá trị khác cần theo dõi thay đổi
    if (getId_Doctor) {
      setLoading(true);
      axios.get('http://localhost:5000/api/v1/auth/getBacSiByChuyenKhoa/' + getId_Doctor)
        .then(response => {
          setData_user(response.data.users);
          setLoading(false);
          setStatus_doctor(false);
          // setStatus_doctor(true);
        })
        .catch(error => {
         
          console.error('Lỗi:', error);
          setLoading(false);
         setStatus_doctor(true);
          console.log(status_doctor)
        });
    }
  }, [getId_Doctor]);
   const handleSelectChange = (e) => {
    setGetId_Doctor(e.target.value); 
  };
  console.log(getId_Doctor)
  return (
    <div className="container_QuanLyUser">
    <div className="header_QuanLyUser">
      <h2>Bác sĩ</h2>
      <select onChange={handleSelectChange} value={getId_Doctor} className="select_doctor">
        <option value="" disabled>Chọn chuyên khoa</option>
        {data_specialist.map((item)=>(
        <option  key={item.id} value={item.id}> {item.name}</option>
        ))  }
      </select>
      <button className='button_user_insert'><Link to={`thembacsi/${getId_Doctor}`}>Thêm bác sĩ </Link></button>
    </div>
    <div className="table_doctor">
      <table border={2} className=' table_patine'>
        <tr className='title_table_user'>
          <th>ID</th>
          <th>Họ và tên</th>
          <th>Giới tính</th>
          <th>Địa chỉ</th>
          <th>Năm sinh</th>
          <th>Số điện thoại</th>
          <th>Chức năng</th>
        </tr>
          {(data_user && data_user.length===0 && status_doctor)?(<p>Không có dữ liệu</p>):( data_user && data_user.map((item) => (
          <tr key={item.id} className='content_table_user'>
            <th>{item.id}</th>
            <th>{item.name}</th>
            <th>{item.gioiTinh}</th>
            <th>{item.diaChi}</th>
            <th>{item.namSinh}</th>
            <th>{item.sdt}</th>
            <th className='button_table_user'>
              <button className='btn_table_user btn_update_table' onClick={() => handleUpdateClick(getId)}> <Link to={`/updateUser/${item.id}`}>Sửa</Link></button>
              <button className='btn_table_user btn_delete_table' onClick={()=>Delete_chuyen_khoa(item.id)}>Xóa</button>
            </th>
          </tr>
        )))}
      </table>

    </div>
  </div>
  )
}

export default ThemBacSi