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
export default function AppRouter(role_id) {
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
            <Route path='login' element={<Login />} />
            {/* <Route path='dang-ky' element={<DangKy />} />
    <Route path='gioi-thieu' element={<GioiThieu />} />
    <Route path='quy-trinh' element={<QuyTrinh />} />
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
    <Route path='user' element={<User />} />

    <Route path='benh-vien/:getId/them-moi-chuyen-khoa/:getId' element={<Them_Moi_Chuyen_Khoa />} />
    <Route path='benh-vien/:getId/thembacsi/:getId' element={<Insert_Doctor />} />
    <Route path='/update_Chuyen_Khoa/:getId' element={<Sua_Chuyen_Khoa />} />
    <Route path='/updateUser/:getId' element={<Update_doctor />} />
    <Route path='/*' element={<Err404 />} />


    <Route path='bac-si/:getId' element={<BacSi />} />
    <Route path='DatKham' element={<DatKham />} />
    <Route path='BenhAn' element={<BenhAn />} /> */}

            {/* Đặt lịch */}
            {/* <Route path='/chon-benh-vien' element={<Choose />} />
            <Route path='/chon-benh-vien/chon-chuyen-khoa/:getId' element={<Search_Chuyen_Khoa />} />
            <Route path='/chon-benh-vien/chon-chuyen-khoa/:getId/chon-bac-si/:getId' element={<Search_Doctor />} />
            <Route path='/chon-benh-vien/chon-chuyen-khoa/:getId/chon-bac-si/:getId/chon-lich/:getId' element={<Select_day />} />
            <Route /> */}
        </Routes>
    )
}
