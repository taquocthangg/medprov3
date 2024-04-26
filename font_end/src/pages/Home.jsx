/*
========================= Trang Chủ =========================
=                           Author                          =
=                         Quốc Thắng                        =
=============================================================
*/

import { Link, useNavigate } from "react-router-dom" // Thêm thẻ link
// Link css cho trang chủ
import '../css/main.css'
import '../css/Home.css'
// Thêm thư viện slick slider từ reace
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageIcon from "../img/choose/dkcs.png"
// Thêm dữ liệu từ file data
import { banner, CHOOSE, hethongbenhvien, support, procedure, news } from '../data'; //Thêm dữ liệu
import { DownLoad } from "./DownLoad";
import { useEffect, useState } from "react";
import api from './api';
import { isAuthenticated, logout, handleAuthentication } from './auth';

const userId = localStorage.getItem('userId');

const Home = () => {
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  const userIsAuthenticated = isAuthenticated();
  useEffect(() => {
    handleAuthentication(userIsAuthenticated, navigate)
  }, [userIsAuthenticated, navigate]);
  // Thiết lập silder home page
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };


  // Thiết lập sider hệ thống bệnh viện
  const hethongsldesk = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  const deploymentmobile = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="home"
    >
      {/* Silder Home */}
      <div className="silder">
        <div className="silder__banner">
          <Slider {...settings}>
            {banner.map((banner, i) => {
              return (
                <div className="banner-img" key={banner.id}>
                  <img src={banner.img} alt="" />
                </div>
              )
            })}
          </Slider>
        </div>
        <div className="main">
          <div className="box">
            <div className="box__service">
              <h4>Chọn Dịch Vụ</h4>
              <div className="box__service-style">
                <div className="choose bob" Ư>
                  <Link to='/chon-benh-vien'>
                    <img src={ImageIcon} alt="" />
                    <p>Đặt khám tại cơ sở</p>
                  </Link>
                </div>
                {CHOOSE.map((choose) => {
                  return (
                    <div className="choose bob" key={choose.id}>
                      <Link to={`${userId} /chon-benh-vien`}>
                        <img src={choose.img} alt="" />
                        <p>{choose.name}</p>
                      </Link>
                    </div>
                  )
                }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần giới thiệu */}
      <div className="home__introduce">
        <div className="home__introduce-back">
          <div className="main">
            <div className="home__introduce-text">
              <div className="introduce-text_content">
                <p className='introduce-text_content-name'>
                  Giới Thiệu
                </p>
                <h3>MEDPRO <br />
                  Đặt lịch khám bệnh</h3>
              </div>
              <div className="introduce-text_content-title">
                <p>Medpro là giải pháp đặt lịch khám bệnh, chăm sóc sức khỏe trực tuyến cho cả gia đình. Người dùng chủ động trong việc khám chữa bệnh, được lựa chọn dịch vụ, chuyên khoa, bác sĩ tại các bệnh viện và phòng khám hàng đầu Việt Nam.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wrapper */}
      <div className="main">

        {/* Giới thiệu về quy trình */}
        <div className="home__introduce">
          <div className="home__procedure">
            <div className="home__procedure-img">
              {procedure.map((procedure, i) => {
                return (
                  <div className="procedure-container" key={procedure.id}>
                    <div className="procedure-container_content">
                      <img src={procedure.img} alt="" />
                    </div>
                    <div className="procedure-container_contents-title bob">
                      <p className='content_text'>{procedure.tilte}</p>
                      <p>{procedure.des}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <p className='procedure-title'>Tìm hiểu thêm về quy trình <Link to='phong-kham-phong-mach/dang-ky' className="procedure_register">đăng ký khám bệnh</Link></p>
        </div>


        {/* Nội dung triển khai trên pc*/}
        <div className="home__deployments">
          <div className="home__deployment">
            <p className="home__deployment-content">HỆ THỐNG BỆNH VIỆN TRIỂN KHAI</p>
          </div>
          <div className="home__deployment-page">
            <div className="home__deployment-page_sl">
              <Slider {...hethongsldesk}>
                {hethongbenhvien.map((hethongbenhvien) => {
                  return (
                    <div className="home__deployment-sl" key={hethongbenhvien.id}>
                      <div className="home__deployment-sl_img"><img src={hethongbenhvien.img} alt="" /></div>
                      <p className="home__deployment-name">{hethongbenhvien.name}</p>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
        {/* Nội dung triển khai trên mobile*/}

        <div className="deployment-mobile">
          <div className="home__deployment">
            <h1>HỆ THỐNG BỆNH VIỆN TRIỂN KHAI</h1>
          </div>
          <div className="home__deployment-page">
            <Slider {...deploymentmobile}>
              {hethongbenhvien.map((hethongbenhvien) => {
                return (
                  <div className="home__deployment-sl" key={hethongbenhvien.id}>
                    <img src={hethongbenhvien.img} alt="" />
                    <p>{hethongbenhvien.name}</p>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>


      {/* Tải Ứng Dụng */}


      <DownLoad />



      {/* Tin Tức */}
      <div className="news">
        <div className="main">
          <p className="news__title name-title">Tin Tức && Sự Kiện</p>
          <div className="news__content">
            {news.map((news) => {
              return (
                <div className="news_content bob" key={news.id}>
                  <img src={news.img} alt="" />
                  <div className="new_content-title">
                    <h5>{news.content}</h5>
                    <p>{news.tilte}</p>
                    <p>{news.dec}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="more bounce">
            <Link to='tin-tuc'>Xem Thêm</Link>
          </div>
        </div>
      </div>

      {/* Nội dung Hỗ Trợ */}
      <div className="support">
        <div className="main">
          <div className="support__title">
            <div className="support__title-name des">
              Hỗ Trợ
            </div>
          </div>
          <div className="support__text name-title">
            CÁC HÌNH THỨC HỖ TRỢ
          </div>
          <div className="support__lienhe">
            {support.map((support) => {
              return (
                <div className="support_lienhe grow-shadow" key={support.id}>
                  <Link href="#"><img src={support.icon} alt="" /></Link>
                  <p>{support.content}</p>
                  <Link href="#"><p>{support.tilte}</p></Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home