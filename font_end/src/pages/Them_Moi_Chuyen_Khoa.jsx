import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import background_Admin from "../img/Admin/backgroundUpdate.webp";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Them_Moi_Chuyen_Khoa = () => {
    const { getId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const history = useNavigate();

    const clearInputs = () => {
        setName('');
        setDescription('');
    };

    const handleUpdate = () => {
        const update_data = {};
        if (name) update_data.name = name;
        if (description) update_data.description = description;
        if (price) update_data.price = price;
        axios
            .post(`http://localhost:5000/api/v1/auth/themchuyenkhoa/${+getId}`, update_data)
            .then((response) => {
                console.log("Server response:", response.data);
                clearInputs();
                alert('Thêm thành công chuyên khoa!' + name);
                history("/benh-vien/" + getId);

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

            <div className="content_detail_update">
                <Link to={'/benh-vien/' + getId}>
                    <div className="icon_back_admin">
                        <IoArrowBackSharp />
                        <h4 className="title_back_admin" >Trở về</h4>

                    </div>
                </Link>
                <div className="content_detail1">
                    <div className="item_detail_update1">
                        <p className="title_update_User">Tên Chuyên Khoa</p>
                        <input
                            type="text"

                            className="input_user"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                        {/* <p className={status_input_tck?"waring_input_satus":"waring_input"}> <IoIosWarning /> Vui lòng nhập vào tên chuyên khoa</p> */}
                    </div>
                    <div className="item_detail_update1">
                        <p className="title_update_User">Mô Tả Ngắn</p>
                        <input
                            type="text"

                            className="input_user"
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                        {/* <p className={statuc_input_mota?"waring_input_satus":"waring_input"}> <IoIosWarning /> Vui lòng nhập vào phần mô tả</p> */}
                    </div>
                    <div className="item_detail_update1">
                        <p className="title_update_User">Giá</p>
                        <input
                            type="text"

                            className="input_user"
                            value={price} onChange={(e) => setPrice(e.target.value)}
                        />
                        {/* <p className={statuc_input_mota?"waring_input_satus":"waring_input"}> <IoIosWarning /> Vui lòng nhập vào phần mô tả</p> */}
                    </div>
                    <button className="btn_user" onClick={handleUpdate}>
                        Thêm chuyên khoa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Them_Moi_Chuyen_Khoa;
