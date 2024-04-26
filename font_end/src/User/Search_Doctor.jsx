import React, { useState,useEffect } from 'react';
// import { choosehopital } from '../../data'
import '../../src/componnets/ChonBenhVien/Choose.css'
import { Link, useNavigate ,useParams} from 'react-router-dom';
import axios from "axios";
const Search_Doctor = () => {
  const [query, setQuery] = useState("");
  const history = useNavigate()
  const [data_BV,setData_BV]=useState([]);
  const { getId } = useParams();
  console.log(getId)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/auth/getBacSiByChuyenKhoa/"+getId)
      .then((response) => {
    
        setData_BV(response.data.users);
       
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);

  return (

    <main>
      <div className="format__header">
        <p onClick={() => { history(-1) }}>Trang Chủ </p> {'>'}  <p onClick={() => { history(-1) }}>Chọn Bệnh Viện</p> {'>'} <p onClick={() => { history(-1) }} >Chọn chuyên khoa</p> {'>'}<p>Chọn bác sĩ</p>
      </div>
      <div className="select__hopital">
        <div className="select__hopital-search">
          <input
            className=""
            placeholder="Tìm nhanh bác sĩ..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        <ul className="select__hopital-list">
          {data_BV.map(choosehopital  => (
            <li className="listItem box_shawdown bob" key={choosehopital.id} >
            <Link to={"chon-lich/"+choosehopital.id}>
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
            </Link>
          </li>
          ))}
        </ul>
      </div>
    </main>

  )
}

export default Search_Doctor