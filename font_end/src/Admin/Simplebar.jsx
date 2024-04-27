import { useState } from "react";
import logo_icon from "../img/logo/logo.png"
import { FaRegUser } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
const Simplebar = () => {
  const [activeButton, setActiveButton] = useState(true);
  const [activeButton1, setAtiveButton1] = useState(true);
  const [activeBtn2, setActiveBtn2] = useState(true);
  const staticBtn_1 = () => {
    setActiveButton(false);
    setActiveBtn2(true);
    setAtiveButton1(true);
  }
  const staticBtn_2 = () => {
    setActiveButton(true);
    setActiveBtn2(false);
    setAtiveButton1(true);
  }
  const staticBtn_3 = () => {
    setActiveButton(true);
    setActiveBtn2(true);
    setAtiveButton1(false);
  }
  return (
    <div className="container_Simplebar">
      <div className="image_Simplebar"  >
        <img src={logo_icon} alt="" className="img_Simplebar" />
        <div className="Simplebar_user">
          <div className="icon_userSimplebar">
            <FaRegUser />
          </div>
          <p className="name_Simplebar">Khoái đẹp trai</p>
        </div>

      </div>
      <div className="content_Simplebar">
        <ul className="menu_Simplebar" >
          <li className={activeButton ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_1}    >
            <div className="icon_itemSimplebar" >
              <FaRegUser />
            </div>
            <p>Quản lý bênh nhân</p>
          </li>
          <li className={activeButton1 ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_3}      >
            <div className="icon_itemSimplebar" >
              <FaHospital />
            </div>
            <p>Quản lý bệnh viên</p>
          </li>
          <li className={activeBtn2 ? ('item_Simplebar item_textSimplebar') : ('item_Simplebar item_SimplebarClick')} onClick={staticBtn_2}    >
            <div className="icon_itemSimplebar" >
              <BsNewspaper />
            </div>
            <p>Quản lý tin tức</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Simplebar