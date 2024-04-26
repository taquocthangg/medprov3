import { IoIosSearch } from "react-icons/io";
import "../css/Admin_header.css"
import { Button } from "react-scroll";
import flash from "../img/Admin/Header_Admin/icon_flash.jpg"
import { AiOutlineBell } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
const Admin_header = () => {
    return (
     <div className="container_headeAdmin">
       <div className="header_Admin">
        <div className="icon_searchAdmin">
        <IoIosSearch/>
        
        </div>
         <div className="item_header">
          <button className="btn_flash">
            <img src={flash} className="header_flash"></img>
          </button>
          <button  className="btn_bell">
         <div className="icon_bell">
         <  AiOutlineBell />
         </div>
          </button>
          <button>
            <div className="icon_user">
            <FaRegUser />
            </div>
          </button>
         </div>
      </div>
     </div>
    )
  }
  
  export default Admin_header