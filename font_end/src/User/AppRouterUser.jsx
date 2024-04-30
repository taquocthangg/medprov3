import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile'
import Phieu_Kham from './Phieu_Kham'

export default function AppRouterUser({ inforUser }) {

    return (
        <div>

            <Routes>
                <Route path='/' element={<Profile inforUser={inforUser} />} />
                <Route path='/phieu-kham-benh' element={<Phieu_Kham />} />
            </Routes>

        </div>
    )
}
