/*
========================= Trang Chủ =========================
=                           Author                          =
=                         Quốc Thắng                        =
=============================================================
*/

import React from 'react'
import { Link } from 'react-router-dom'
import { taiungdung, taiungdung2 } from '../data'
import chplay from '../img/choose/google-play.4a2a1c43.png'
import ios from '../img/choose/ios.3cd24f82.png'
import "../css/Download.css"
export const DownLoad = () => {
  return (
    <div >
      <div className="download__app-back">
        <div className="main">
          <div id="download" className="download__app">
            <div className="download__des des">
              <p>DOWNLOAD</p>
            </div>
            <div className="download__app-name name">
              <div className="download__app-content">
                Tải Ứng Dụng <p>MEDPRO</p>
              </div>
              <div className="download__app-link">
                <Link className='bounce-in' to="https://play.google.com/store/apps/details?id=vn.com.medpro&pli=1">
                  <img src={chplay} alt="" />
                </Link>
                <Link className='bounce-in' to="https://apps.apple.com/us/app/id1481561748">
                  <img src={ios} alt="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="download__app-function">
            <div className="function_content">
              {taiungdung.map((taiungdung) => {
                return (
                  <div className="function_icon" key={taiungdung.id}>
                    <img src={taiungdung.icon} alt="" />
                    <p>{taiungdung.chucnang}</p>
                    <p>{taiungdung.chucnang1}</p>
                    <p>{taiungdung.chucnang2}</p>
                  </div>
                )
              })}
            </div>
            <div className="function_content-app">
              <img src="https://resource.medpro.com.vn/static/images/medpro/web/slide.png?t=42565.989343452224" alt="" />
            </div>
            <div className="function_content">
              {taiungdung2.map((taiungdung) => {
                return (
                  <div className="function_iconr" key={taiungdung.id}>
                    <img src={taiungdung.icon} alt="" />
                    <p>{taiungdung.chucnang}</p>
                    <p>{taiungdung.chucnang1}</p>
                    <p>{taiungdung.chucnang2}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
