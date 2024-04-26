import React from 'react'
import anh1 from "../img/phongkham/why/QLKH.8fea420f.png"
import anh2 from "../img/phongkham/why/TVKB.be40038e.png"
import anh3 from "../img/phongkham/why/BCTK.293a43c5.png"
import anh4 from "../img/phongkham/why/QLKD.a35b656e.png"

const Whys = () => {
    return (
        <div className="why__main">
            <div className="why__container Why__container-pc">
                <div className="why__content">
                    <div className="why__content-icon">
                        <img src={anh1} alt="" />
                    </div>
                    <div className="why__content-title">
                        <div className="content-title_name">
                            <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                            <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                        </div>
                        <div className="content__name">
                            <div className="content__name-title">
                                <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                                <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                            </div>
                        </div>
                    </div>
                    <div className="why__content-icon why__top">
                        <img src={anh2} alt="" />
                    </div>
                </div>
                <div className="why__content">
                    <div className="why__content-icon  ">
                        <img src={anh3} alt="" />
                    </div>
                    <div className="why__content-title">
                        <div className="content-title_name">
                            <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                            <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                        </div>
                        <div className="content__name">
                            <div className="content__name-title">
                                <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                                <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                            </div>
                        </div>
                    </div>
                    <div className="why__content-icon why__top">
                        <img src={anh4} alt="" />
                    </div>
                </div>
            </div>
            <div className="why__container-mobile">
                <div className="why__container">
                    <div className="why__content">
                        <div className="why__content-icon">
                            <img src={anh1} alt="" />
                        </div>
                        <div className="why__content-title">
                            <div className="content-title_name">
                                <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                                <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                            </div>
                            <div className="why__content-icon why__top">
                            <img src={anh2} alt="" />
                        </div>
                            <div className="content__name">
                                <div className="content__name-title">
                                    <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                                    <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="why__content">
                        <div className="why__content-icon  ">
                            <img src={anh3} alt="" />
                        </div>
                        <div className="why__content-title">
                            <div className="content-title_name">
                                <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                                <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                            </div>
                            {/* <div className="content__name">
                                <div className="content__name-title">
                                    <p>DỊCH VỤ QUẢN LÝ KHÁCH HÀNG</p>
                                    <p>Với ứng dụng MedPro Clinic, bạn sẽ dễ dàng quản lý lịch khám hoặc tái khám của từng người bệnh đến được chia theo từng nguồn.</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="why__content-icon why__top">
                            <img src={anh4} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Whys