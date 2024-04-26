import React, { useState, useEffect } from 'react';
import './Choose.css'
import { Link, useNavigate } from 'react-router-dom';
import api from './../../pages/api'
import { isAuthenticated } from './../../pages/auth';

const Choose = () => {
  const [query, setQuery] = useState("");
  const history = useNavigate()
  const [data_BV, setData_BV] = useState([]);
  const [getId, setGet_Id] = useState("");
  const checkLogin = isAuthenticated();
  const handleGetId = (id) => {

  }
  const login = () =>{
    alert("Vui Lòng Đăng Nhập Để Tiếp Tục !!!")
    history('/login')
  }
  useEffect(() => {
    api
      .get("/auth/getAllBenhVien")
      .then((response) => {
        console.log(response);
        setData_BV(response.data.users);

      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);
  console.log(data_BV)
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
          {data_BV.map(choosehopital => (
            <li className="listItem box_shawdown bob" key={choosehopital.id} onClick={handleGetId(choosehopital.id)} >
              {checkLogin ?
                (<Link to={`chon-chuyen-khoa/${choosehopital.id}`}>
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
                login()
              }
            </li>
          ))}
        </ul>
      </div>
    </main>

  )
}

export default Choose