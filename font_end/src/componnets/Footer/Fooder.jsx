/*
========================= Trang Chủ =========================
=                           Author                          =
=                         Quốc Thắng                        =
=============================================================
*/

import { Link } from "react-router-dom"
import './Footer.css'
import { useLocation } from "react-router-dom";
import { footer, } from "../../data";
import logo from '../../img/logo/footer_logo.svg'
const Fooder = () => {
  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/QuanLyNews" || pathname === "admin/Update_User_Detail/:getId" || pathname === "/QuanLyUsert" || pathname === "/QuanLyBV" || pathname === "/phong-kham-phong-mach/dang-nhap" || pathname === "/phong-kham-phong-mach/dang-ky" || pathname === "/admin" || pathname === "/benh-vien" || pathname === "/quen-mat-khau" || pathname === '/dang-ki') return null;

  return (
    <main>
      <footer>
        <div className="footer__container">
          <div className="footer__container-wrapper">
            <div className="footer__logo">
              <img src={logo} alt="" />
            </div>
            <div className="footer__contents">
              <p className="footer__contents-content">
                MEDPRO - ĐẶT LỊCH KHÁM BỆNH
              </p>
              <div className="footer__contents-title bob">
                Địa Chỉ: 235 Hoàng Quốc Việt - Hà Nội
              </div>
              <div className="footer__contents-title bob">
                Email: medpro@gmail.com
              </div>
              <div className="footer__contents-title bob">
                Điện Thoại: 0963765795
              </div>
            </div>
            <div className="footer__contents">
              <p className="footer__contents-title bob">
                <Link to="lien-he" >
                  Liên Hệ
                </Link>
              </p>
              <p className="footer__contents-title bob">
                <Link to="" >
                  Điều khoản dịch vụ
                </Link>
              </p>
              <p className="footer__contents-title bob">
                <Link to="" >
                  Chính sách bảo mật
                </Link>
              </p>
              <p className="footer__contents-title bob">
                <Link to="" >
                  Quy định sử dụng
                </Link>
              </p>
            </div>
            <div className="listGroup">
              {footer.map((footer) => {
                return (
                  <div className="listGroup__icon bob" key={footer.id}>
                    <img src={footer.img} alt="" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="footer__bot">
          © 2023 design by <a href="https://www.facebook.com/tquocthang24">Quốc Thắng</a> & <a href="https://www.facebook.com/khoai.vutien.9">Tiến Khoái</a>
        </div>
      </footer>
    </main >
  )
}

export default Fooder