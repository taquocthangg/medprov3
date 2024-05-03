import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddTinTuc from '../Admin/pages/admin/AddTinTuc'
import Add_Benh_Vien from '../Admin/pages/admin/Add_Benh_Vien'
import ListHospital from '../Admin/pages/admin/ListHospital';
import ListNews from './../Admin/pages/admin/ListNews';
import Statistical from './../Admin/pages/Statistical';
import Notification from '../Admin/pages/Notification';
import Add_chuyenKhoa from './../Admin/pages/hospital/Add_chuyenKhoa';
import List_chuyenKhoa from './../Admin/pages/hospital/List_chuyenKhoa';
import List_bacSi from '../Admin/pages/hospital/List_bacSi';
import Add_bacSi from './../Admin/pages/hospital/Add_bacSi';
import Add_lichKham from '../Admin/pages/doctor/Add_lichKham';
import Ds_lichKham from '../Admin/pages/doctor/Ds_lichKham';
import List_benhAn from './../Admin/pages/doctor/List_benhAn';
import Add_benhAn from './../Admin/pages/doctor/Add_benhAn';
import UpdateNewsAdmin from '../Admin/pages/admin/UpdateNewsAdmin';
import List_lichKhamCho from '../Admin/pages/doctor/List_lichKhamCho';

export default function AppRouteAdmin() {

    return (
        <div>

            <Routes>
                <Route path='tin-tuc' element={<AddTinTuc />} />
                <Route path='benh-viens' element={<Add_Benh_Vien />} />
                <Route path='ds-benh-vien' element={<ListHospital />} />
                <Route path='ds-tin-tuc' element={<ListNews />} />
                <Route path='ds-tin-tuc/update-tin-tuc/:idNews' element={<UpdateNewsAdmin />} />
                <Route path='thong-ke' element={<Statistical />} />
                <Route path='thong-bao' element={<Notification />} />
                <Route path='them-chuyen-khoa' element={<Add_chuyenKhoa />} />
                <Route path='ds-chuyen-khoa' element={<List_chuyenKhoa />} />
                <Route path='ds-bac-si' element={<List_bacSi />} />
                <Route path='them-bac-si' element={<Add_bacSi />} />
                <Route path='them-lich-kham' element={<Add_lichKham />} />
                <Route path='ds-lich-kham' element={<Ds_lichKham />} />
                <Route path='ds-benh-an' element={<List_benhAn />} />
                {/* <Route path='them-benh-an' element={<Add_benhAn />} /> */}
                <Route path='ds-lich-kham-dang-cho' element={<List_lichKhamCho />} />
            </Routes>

        </div>
    )
}
