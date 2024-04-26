import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./BacSi.css";
import axios from "axios";
const BenhAn = () => {
  const [query, setQuery] = useState("");
  // const [data, setData] = useState([]);
  const data = [
    {
      Data: {
        id: 1,
        doctorId: 3,
        specialtyId: 1,
        hospitalId: 0,
        patientId: 1,
        startTime: "7:00 ",
        endTime: " 8:00 AM",
        timeSlot: "7:00 - 8:00 AM",
        price: "0.00",
        activateDay: "2023-11-27",
        appointmentDate: "0000-00-00",
        status: "booked",
        createdAt: "2023-11-26T20:34:27.000Z",
        updatedAt: "2023-11-27T22:05:21.000Z",
        User: {
          id: 1,
          name: "Tạ Quốc Thắng",
          sdt: "096765795",
          diaChi: "Hà Nội",
          namSinh: "2023-10-08",
          gioiTinh: "Nam",
        },
        Sescription: {
          id: 1,
          id_benhvien: 2,
          name: "Tai Mũi Họng",
        },
      },
    },
  ];
  const history = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/auth/lichkhamdadat/1")
      .then((response) => {
        // Xử lý dữ liệu từ response.data
        // setData(response.data.Data);
        //console.log(response.data.Data)
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data);
  return (
    <div>
      <div className="bacsi_container">
        <div className="bacsi__header">
          <h2 className="bacsi_header-h2">BÁC SĨ</h2>
          <ul className="bacsi__header-list">
            <li className="bacsi_header-item">
              <Link to="/BacSi" className="bacsi_header-link">
                LỊCH KHÁM
              </Link>
            </li>
            <li className="bacsi_header-item">
              <Link to="/DatKham" className="bacsi_header-link">
                THÊM LỊCH KHÁM
              </Link>
            </li>
            <li className="bacsi_header-item">
              <Link to="/BenhAn" className="bacsi_header-link">
                  BỆNH ÁN
              </Link>
            </li>
          </ul>
        </div>
        <div className="bacsi_body">
          <div className="bacsi_body-out">
           < Link to="/" className="bacsi_body-logout">
              LOG OUT
            </Link>
          </div>
          <div className="bacsi_body_container">
            <div className="bacsi_body_container_fisrt">
              <h2> DANH SÁCH BỆNH ÁN</h2>
              {/* <input
                        className=""
                        placeholder="Tìm nhanh bệnh viện..."
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    /> */}
              <table>
                <div className="bacsi_body_table">
                  <thead className="bacsi_body_thear">
                    <tr>
                      <th className="bacsi_body_thear">Tên bệnh nhân</th>
                      <th className="bacsi_body_thear">Số điện thoại</th>
                      <th className="bacsi_body_thear">Địa chỉ</th>
                      <th className="bacsi_body_thear">Giới tính</th>
                      <th className="bacsi_body_thear">Năm sinh</th>
                      <th className="bacsi_body_thear">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody className="bacsi_body_tbody">
                  {data.map((item) => (
                        <tr key={item.Data.id}>
                          <td className="bacsi_body_td">{item.Data.User.name}</td>
                          <td className="bacsi_body_td">{item.Data.User.sdt}</td>
                          <td className="bacsi_body_td">{item.Data.User.diaChi}</td>
                          <td className="bacsi_body_td">{item.Data.User.gioiTinh}</td>
                          <td className="bacsi_body_td">{item.Data.User.namSinh}</td>
                          <td className="bacsi_body_td">{item.Data.timeSlot}</td>
                        </tr>
                        ))}
                  </tbody>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenhAn;
