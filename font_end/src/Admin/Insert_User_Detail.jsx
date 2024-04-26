import React from 'react'
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import '../css/Update_User_Detail.css'
import background_Admin from "../img/Admin/backgroundUpdate.webp";
import { IoArrowBackSharp } from "react-icons/io5";
const Insert_User_Detail = () => {

    const [data_user, setData_user] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Thêm state để lưu trữ giá trị của các ô nhập liệu
    const [name, setName] = useState("");
    const [gioiTinh, setGioiTinh] = useState("");
    const [namSinh, setNamSinh] = useState("");
    const [sdt, setSdt] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [email, setEmail] = useState("");
    const history = useNavigate();
    const clearInputs = () => {
      setName('');
      setGioiTinh('');
      setNamSinh('');
      setSdt('');
      setDiaChi('');
      setEmail('');
    };
  
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/v1/auth/getCurent/" )
        .then((response) => {
          console.log(response);
          setData_user(response.data.user);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
          setLoading(false);
        });
    }, []);
  
    // Thêm hàm xử lý sự kiện khi người dùng thay đổi giá trị trong các ô nhập liệu
    const handleInputChange = (fieldName, value) => {
      switch (fieldName) {
        case "name":
          setName(value);
          break;
        case "gioiTinh":
          setGioiTinh(value);
          break;
        case "namSinh":
          setNamSinh(value);
          break;
        case "sdt":
          setSdt(value);
          break;
        case "diaChi":
          setDiaChi(value);
          break;
        case "email":
          setEmail(value);
          break;
        default:
          break;
      }
    };
  
    const handleUpdate = () => {
      // Tạo object chứa dữ liệu muốn gửi lên server
      const updatedData = {};
  
      // Kiểm tra từng trường và chỉ thêm vào object nếu có giá trị
      if (name) updatedData.name = name;
      if (gioiTinh) updatedData.gioiTinh = gioiTinh;
      if (namSinh) updatedData.namSinh = namSinh;
      if (sdt) updatedData.sdt = sdt;
      if (diaChi) updatedData.diaChi = diaChi;
      if (email) updatedData.email = email;
  
      // Gửi dữ liệu lên server
      axios
      .post(`http://localhost:5000/api/v1/auth/updateUser/`, updatedData)
        .then((response) => {
          // Xử lý kết quả từ server (nếu cần)
          console.log("Server response:", response.data);
          clearInputs();
          // Hiển thị cảnh báo cập nhật thành công
          alert('Cập nhật thông tin thành công!');
          history('/admin');
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    };
  
    return (
      
      <div className="container_detail_update">
      <div className="background_detail_update">
        <img src={background_Admin} alt="" className="image_background" />
      </div>
      <div className="background_detail_update1">

      </div>
      {/* ... (phần code còn lại không thay đổi) */}

      <div className="content_detail_update">
        <Link to="/admin">
          <div className="icon_back_admin">
            <IoArrowBackSharp />
            <h4 className="title_back_admin">Trở về</h4>
          </div>
        </Link>
        <div className="content_detail1">


          <div className="item_detail_update1">
            <p className="title_update_User">Họ và tên</p>
            <input
              type="text"
              placeholder={'Họ và tên'}
              className="input_user"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="item_detail_update1">
            <p className="title_update_User">Giới tính</p>
            <input
              type="text"
              placeholder={'Giới tính'}
              className="input_user"
              onChange={(e) => handleInputChange("gioiTinh", e.target.value)}
            />
          </div>
          <div className="item_detail_update1">
            <p className="title_update_User">Năm sinh</p>
            <input
              type="text"
              placeholder={'Năm sinh'}
              className="input_user"
              onChange={(e) => handleInputChange("namSinh", e.target.value)}
            />
          </div>
          <div className="item_detail_update1">
            <p className="title_update_User">Số điện thoại</p>
            <input
              type="text"
              placeholder={'Số điện thoại'}
              className="input_user"
              onChange={(e) => handleInputChange("sdt", e.target.value)}
            />
          </div>
          <div className="item_detail_update1">
            <p className="title_update_User">Địa chỉ</p>
            <input
              type="text"
              placeholder={'Địa chỉ'}
              className="input_user"
              onChange={(e) => handleInputChange("diaChi", e.target.value)}
            />
          </div>
          <div className="item_detail_update1">
            <p className="title_update_User">Email</p>
            <input
              type="text"
              placeholder={'Email'}
              className="input_user"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <button className="btn_user" onClick={handleUpdate}>
            Thêm bệnh nhân
          </button>
        </div>
      </div>
    </div>
    );
  };

export default Insert_User_Detail