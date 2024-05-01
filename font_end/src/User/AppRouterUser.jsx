import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile'
import Phieu_Kham from './Phieu_Kham'
import Chi_Tiet_Phieu_Kham from './Chi_Tiet_Phieu_Kham'

export default function AppRouterUser({ inforUser, setInforUser }) {

    return (
        <div>

            <Routes>
                <Route path='/' element={<Profile inforUser={inforUser} setInforUser={setInforUser} />} />
                <Route path='/phieu-kham-benh' element={<Phieu_Kham />} />
                <Route path='/chi-tiet-phieu-kham/:id_phieuKham' element={<Chi_Tiet_Phieu_Kham />} />
            </Routes>

        </div>
    )
}
