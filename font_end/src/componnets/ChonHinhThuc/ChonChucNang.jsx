import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ChonChucNang.css'
import { format } from '../../data'
const ChonChucNang = () => {
    const history = useNavigate()
    return (
        <div className='format'>
            <div className="format__header">
            <p onClick={() =>{history(-2)}}>Trang Chủ {'>'}</p> <p onClick={() =>{history(-1)}}>Chọn Bệnh Viện {'>'} </p> Hình Thức Đặt Khám
            </div>
                <div className="format__choose">
                    <div className="format__choose-name">
                        CÁC HÌNH THỨC ĐẶT KHÁM
                    </div>
                        <div onClick={() => {history("/login")}} className="format__choose-from">
                            {format.map((format) => {
                                return (
                                    <div className="choose-from_box bob">
                                        <img src={format.icon} alt="" />
                                        <p>{format.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                </div>
            </div>
    )
}

export default ChonChucNang