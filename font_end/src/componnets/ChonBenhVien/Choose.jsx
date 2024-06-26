import React, { useState, useEffect } from 'react';
import './Choose.css'
import { Link, useNavigate } from 'react-router-dom';
import api from './../../pages/api'
import { isAuthenticated } from './../../pages/auth';
import { getAllBenhVien } from '../../api';

const Choose = () => {
  const [query, setQuery] = useState("");
  const history = useNavigate()
  const [data_BV, setData_BV] = useState([]);
  const [getId, setGet_Id] = useState("");
  const checkLogin = isAuthenticated();
  const handleGetId = (id) => {

  }
  // const login = () => {
  //   alert("Vui Lòng Đăng Nhập Để Tiếp Tục !!!")
  //   history('/login')
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBenhVien();
        console.log(response);
        setData_BV(response.benhvien.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (

    <main>
      <div className="format__header">
        <p onClick={() => { history(-1) }}>Trang Chủ </p> {'>'}  Chọn Bệnh Viện
      </div>
      <div className="select__hopital">
        <div className="select__hopital-search">
          <input
            className=""
            placeholder="Tìm nhanh bệnh viện..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        <ul className="select__hopital-list">
          {data_BV?.map(choosehopital => (
            <li className="listItem box_shawdown bob" key={choosehopital.id} onClick={handleGetId(choosehopital.id)} >
              {checkLogin ?
                (<Link to={'chon-chuyen-khoa/' + choosehopital.id + "?hospital=" + choosehopital.id}>
                  <div className="hopotal__box">
                    <div className="hopotal__box-img">
                      <img src={choosehopital.avatar} alt="" />
                    </div>
                    <div className="hopotal__box-content">
                      <div className="hopotal__box-content-name name_text">
                        {choosehopital.name}
                      </div>
                      <div className="hopotal__box-content-addres description">
                        {choosehopital.diaChi}
                      </div>
                    </div>
                  </div>
                </Link>)
                :
                // login()
                null
              }
            </li>
          ))}
        </ul>
      </div>
    </main>

  )
}

export default Choose