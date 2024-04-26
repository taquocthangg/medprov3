import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Update_User_Detail.css";
import background_Admin from "../img/Admin/backgroundUpdate.webp";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Sua_Chuyen_Khoa = () => {
  const { getId } = useParams();
  const [data_user, setData_user] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Thêm state để lưu trữ giá trị của các ô nhập liệu
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const history = useNavigate();
  const clearInputs = () => {
    setName("");
    setDescription("");
    setPrice("");
  };

  useEffect(() => {
    axios

      .get('http://localhost:5000/api/v1/auth/chuyenkhoa/' + getId)
      .then((response) => {
        setData_user(response.data.chuyenkhoa);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        setLoading(false);
      });
  }, []);
  console.log(data_user)
  // Thêm hàm xử lý sự kiện khi người dùng thay đổi giá trị trong các ô nhập liệu
  const handleInputChange = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
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
    if (description) updatedData.description = description;
    if (price) updatedData.price = price;
    // Gửi dữ liệu lên server
    axios
      .post(`http://localhost:5000/api/v1/auth/updateUser/${getId}`, updatedData)
      .then((response) => {
        // Xử lý kết quả từ server (nếu cần)
        console.log("Server response:", response.data);
        clearInputs();
        alert('Cập nhật thông tin thành công!');
        history(-1)
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
        <Link >
          <div className="icon_back_admin" onClick={() => { history(-1) }} >
            <IoArrowBackSharp />
            <h4 className="title_back_admin">Trở về</h4>
          </div>
        </Link>
        <div className="content_detail1">
          {data_user ? (
            <div className="h">
              {data_user.map((item) => (
                <div className="" key={item.id}>
                  <div className="item_detail_update1">
                    <p className="title_update_User">Tên chuyên khoa</p>
                    <input
                      type="text"
                      placeholder={item.name}
                      className="input_user"
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="item_detail_update1">
                    <p className="title_update_User">Mô tả</p>
                    <input
                      type="text"
                      placeholder={item.description}
                      className="input_user"
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>
                  <div className="item_detail_update1">
                    <p className="title_update_User">Giá</p>
                    <input
                      type="text"
                      placeholder={item.price}
                      className="input_user"
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <button className="btn_user" onClick={handleUpdate}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sua_Chuyen_Khoa;
