import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import background_Admin from "../img/Admin/backgroundUpdate.webp";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
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
    const [role_id, setRole_id] = useState("R2");
    const [password, setPassword] = useState("");
    const history = useNavigate();
    const clearInputs = () => {
        setName('');
        setGioiTinh('');
        setNamSinh('');
        setSdt('');
        setDiaChi('');
        setEmail('');
        setPassword('');
    };


    // Thêm hàm xử lý sự kiện khi người dùng thay đổi giá trị trong các ô nhập liệu
    const handleInputChange = (fieldName, value) => {
        switch (fieldName) {
            case "name":
                setName(value);
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
            case "password":
                setPassword(value);
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
        if (sdt) updatedData.sdt = sdt;
        if (diaChi) updatedData.diaChi = diaChi;
        if (email) updatedData.email = email;
        if (role_id) updatedData.role_id = role_id;
        if (password) updatedData.password = password;
        // Gửi dữ liệu lên server
        axios
            .post("http://localhost:5000/api/v1/auth", updatedData)
            .then((response) => {
                // Xử lý kết quả từ server (nếu cần)
                console.log("Server response:", response.data);
                clearInputs();
                // Hiển thị cảnh báo cập nhật thành công
                alert('Thêm thành công bệnh viện!');
                history(-1);
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

            <div className="content_detail_update" onClick={() => history(-1)}>
                <Link >
                    <div className="icon_back_admin">
                        <IoArrowBackSharp />
                        <h4 className="title_back_admin">Trở về</h4>
                    </div>
                </Link>
                <div className="content_detail1">
                    <div className="item_detail_update1">
                        <p className="title_update_User">Email</p>
                        <input
                            type="text"

                            className="input_user"
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </div>
                    <div className="item_detail_update1">
                        <p className="title_update_User">Mật khẩu</p>
                        <input
                            type="text"

                            className="input_user"
                            onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                    </div>
                    <div className="item_detail_update1">
                        <p className="title_update_User">Tên bệnh viện</p>
                        <input
                            type="text"

                            className="input_user"
                            onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                    </div>
                    <div className="item_detail_update1">
                        <p className="title_update_User">Số điện thoại</p>
                        <input
                            type="text"

                            className="input_user"
                            onChange={(e) => handleInputChange("sdt", e.target.value)}
                        />
                    </div>
                    <div className="item_detail_update1">
                        <p className="title_update_User">Địa chỉ</p>
                        <input
                            type="text"

                            className="input_user"
                            onChange={(e) => handleInputChange("diaChi", e.target.value)}
                        />
                    </div>

                    <button className="btn_user" onClick={handleUpdate}>
                        Thêm bệnh viện
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Insert_User_Detail;
