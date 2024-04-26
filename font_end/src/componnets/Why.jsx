import React from 'react'
import { uudiem } from '../data'
import { VscCheckAll } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import laptop  from '../img/phongkham/laptop_banner.5b289611.png'


const Why = () => {
  const history = useNavigate()
  return (
    <div className="phongkham__noidung">
      <div className="containers">
        <div className="noidung__uudiem">
        ƯU ĐIỂM PHẦN MỀM MEDPRO CLINIC
        </div>
        <div className="uudiem__container">
          <div className="uudiem__logo">
            <img src={laptop} alt="" />
          </div>
          <div className="uudiem__name">
            {uudiem.map((uudiem) => {
              return (
                  <div className="name__title" key={uudiem.id}>
                    <p>
                      <VscCheckAll />  {uudiem.name}
                    </p>
                  </div>
              )
            })}
          </div>
        </div>

          {/* <div onClick={() => history("/dang-ky")} className="btn__test bob">
            Đăng kí dùng thử
          </div> */}

      </div>
    </div>
  )
}

export default Why