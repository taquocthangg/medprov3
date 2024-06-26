import React from 'react'

import { Route, Routes } from "react-router-dom";
import MenuBar from "../Admin/componnents/MenuBar";
import QuanLyBV from "../Admin/QuanLyBV";
import QuanLyNews from "../Admin/QuanLyNews";
import QuanLyUsert from "../Admin/QuanLyUsert";
import Update_User_Detail from "../Admin/Update_User_Detail";
import Insert_User_Detail from "../Admin/Insert_User_Detail";
import Update_Patent_Detail from "../Admin/Update_Patent_Detail";
import Admin from "../Admin/Admin";
import Home from "../pages/Home";
import LoginPhongKham from "./FromDangNhap/LoginPhongKham";
import Login from "../pages/Login";
import HuongDan from './../pages/HuongDan';
import TinTuc from './../pages/TinTuc';
import { ThacMac } from './../pages/ThacMac';
import LienHe from './../pages/LienHe';
import PhongKham from './../pages/PhongKham';
import Choose from './ChonBenhVien/Choose';
import ChonChucNang from './ChonHinhThuc/ChonChucNang';
import DangKi from './../pages/DangKi';
import QuenMatKhau from './../pages/Quen_Mat_Khau';
import BenhVien from './../pages/Benh_vien';
import User from './../pages/User';
import Them_Moi_Chuyen_Khoa from './../pages/Them_Moi_Chuyen_Khoa';
import GioiThieu from './../pages/GioiThieu';
import Quytrinh from './../pages/QuyTrinh';
import DangKy from './FromDangKy/DangKy';
import Search_Chuyen_Khoa from '../User/Search_Chuyen_Khoa';
import Search_Doctor from '../User/Search_Doctor';
import Select_day from '../User/Select_day';
import VnPay_return from '../User/VnPay_return';
import Detail_tinTuc from '../pages/Detail_tinTuc';
export default function AppRouter({ setInforUser, setRole_id, inforUser, screenWidth }) {
    return (

        <Routes>
            {/* {role_id == 'R4' ? null : <Route path='MenuBar' element={<MenuBar />} />} */}
            <Route path='QuanLyBV' element={<QuanLyBV />} />
            <Route path='QuanLyNews' element={<QuanLyNews />} />
            <Route path='QuanLyUsert' element={<QuanLyUsert />} />
            {/* <Route path='/admin/:getId/Insert_Patent_Detail' element={<Insert_Patent_Detail />} /> */}
            <Route path='admin/Update_User_Detail/:getId' element={<Update_User_Detail />} />
            <Route path='Insert_User_Detail' element={<Insert_User_Detail />} />
            <Route path='admin/Update_Patent_Detail/:getId' element={<Update_Patent_Detail />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/' element={<Home />} />
            <Route path='dang-nhap' element={<LoginPhongKham />} />
            <Route path='login' element={<Login setInforUser={setInforUser} setRole_id={setRole_id} />} />
            <Route path='dang-ky' element={<DangKy />} />
            <Route path='gioi-thieu' element={<GioiThieu />} />
            <Route path='quy-trinh' element={<Quytrinh />} />
            <Route path='huong-dan' element={<HuongDan />} />
            <Route path='tin-tuc' element={<TinTuc />} />
            <Route path='thac-mac' element={<ThacMac />} />
            <Route path='lien-he' element={<LienHe />} />
            <Route path='phong-kham' element={<PhongKham />} />
            <Route path='chon-benh-vien' element={<Choose />} />
            <Route path='chon-benh-vien/chon-hinh-thuc' element={<ChonChucNang />} />
            <Route path='dang-ki' element={<DangKi />} />
            <Route path='quen-mat-khau' element={<QuenMatKhau />} />
            <Route path='benh-vien/:getId' element={<BenhVien />} />
            <Route path='user' element={<User screenWidth={screenWidth} inforUser={inforUser} setInforUser={setInforUser} />} />

            <Route path='benh-vien/:getId/them-moi-chuyen-khoa/:getId' element={<Them_Moi_Chuyen_Khoa />} />


            <Route path='/chon-benh-vien/chon-chuyen-khoa/:getId' element={<Search_Chuyen_Khoa />} />
            <Route path='/chon-benh-vien/chon-chuyen-khoa/:getId/chon-bac-si/:getId' element={<Search_Doctor />} />
            <Route path='/chon-benh-vien/chon-chuyen-khoa/:getId/chon-bac-si/:getId/chon-lich/:getId' element={<Select_day />} />
            <Route path='/vnpay_return' element={<VnPay_return />} />
            <Route path='/tin-tuc/:id_tinTuc' element={<Detail_tinTuc />} />

            {/* <Route path='benh-vien/:getId/thembacsi/:getId' element={<Insert_Doctor />} />
            <Route path='/update_Chuyen_Khoa/:getId' element={<Sua_Chuyen_Khoa />} />
            <Route path='/updateUser/:getId' element={<Update_doctor />} />
            <Route path='/*' element={<Err404 />} />


            <Route path='bac-si/:getId' element={<BacSi />} />
            <Route path='DatKham' element={<DatKham />} />
            <Route path='BenhAn' element={<BenhAn />} /> */}

            {/* Đặt lịch */}
            {/* <Route path='/chon-benh-vien' element={<Choose />} />
        */}
            <Route />
        </Routes>
    )
}
