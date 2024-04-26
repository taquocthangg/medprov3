import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddTinTuc from '../Admin/pages/AddTinTuc'
import Add_Benh_Vien from '../Admin/pages/Add_Benh_Vien'

export default function AppRouteAdmin() {
    return (
        <div>
            <Routes>
                <Route path='tin-tuc' element={<AddTinTuc />} />
                <Route path='benh-viens' element={<Add_Benh_Vien />} />
                {/* <Route path='huongdan' element={<HuongDan />} /> */}
            </Routes>
        </div>
    )
}
