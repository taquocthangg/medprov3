import React, { useState, useEffect } from 'react';
// import { choosehopital } from '../../data'
import '../../src/componnets/ChonBenhVien/Choose.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from './../pages/api'
import { formatPrice } from '../Common/dataFortmat';
import logo from '../img/logo.webp'
const Search_Chuyen_Khoa = () => {
  const [query, setQuery] = useState("");
  const history = useNavigate()
  const [data_BV, setData_BV] = useState([]);
  const { getId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const hospital = params.get('hospital');
  useEffect(() => {
    api
      .get("/auth/chuyenkhoa/" + getId)
      .then((response) => {

        setData_BV(response.data.chuyenkhoa);

      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);

  return (

    <main>
      <div className="format__header">
        <p onClick={() => { history(-1) }}>Trang Chủ </p> {'>'}  <p onClick={() => { history(-1) }}>Chọn Bệnh Viện</p> {'>'} <p>Chọn chuyên khoa</p>
      </div>
      <div className="select__hopital">
        <div className="select__hopital-search">
          <input
            className=""
            placeholder="Tim nhanh chuyên khoa"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        <ul className="select__hopital-list">
          {data_BV.map(choosehopital => (
            <li className="listItem box_shawdown bob" key={choosehopital.id} >
              <Link to={"chon-bac-si/" + choosehopital.id + "?hospital=" + hospital + "&specialist=" + choosehopital.id} >
                <div className="hopotal__box">
                  <div className="hopotal__box-img">
                    <img src={choosehopital.avatar ? choosehopital.avatar : logo} alt="" />
                  </div>
                  <div className="hopotal__box-content">
                    <div className="hopotal__box-content-name name_text">
                      {choosehopital.name}
                    </div>
                    <div className="hopotal__box-content-addres description">
                      {choosehopital.diaChi}
                    </div>
                    <div className="hopotal__box-content-addres description">
                      {formatPrice(choosehopital.price)} VNĐ
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>

  )
}

export default Search_Chuyen_Khoa