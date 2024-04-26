import React, { useEffect, useState } from 'react';
import api from '../pages/api'



const XemLK = () => {
    const [lichKham, setLichKham] = useState()
    const [bacsi, setBacSi] = useState()
    const [benhVien, setbenhVien] = useState()
    const id_benhNhan = localStorage.getItem('userId');
    const handleDateChange = async () => {
        try {
            const response = await api.get('/auth/lichDatKhamByBenhNhan/' + id_benhNhan);
            console.log('ss' + id_benhNhan)
            setLichKham(response.data.response)
            setBacSi(response.data.bacsi)
            setbenhVien(response.data.benhvien)
            console.log('Response from API:', response.data.response);
        } catch (error) {
            console.error('Error:', error);
        }
    };;
    useEffect(() => {
        try {
            const response = api.get('/auth/lichDatKhamByBenhNhan/' + id_benhNhan);
            setLichKham(response.data)
            console.log('Response from API:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [])
    console.log(bacsi)
    return (
        <div onClick={handleDateChange}>
            Xem lịch khám

            {lichKham ? (

                <div className="">
                    <h4>
                        Thông tin lịch khám
                    </h4>
                    {lichKham.map(appointment => (
                        <div key={appointment.id}>
                            <p>Thời gian đặt khám: {appointment.timeSlot}</p>
                            <p>Ngày đặt khám: {appointment.activateDay}</p>
                            <p>Trạng thái: {appointment.status}</p>
                        </div>

                    ))}
                    <h4>
                        Thông tin bác sĩ
                    </h4>
                    {bacsi ? (
                        <div className="">
                            {bacsi.map(appointment => (
                                <div key={appointment.name}>
                                    <p>Tên bác sĩ: {appointment.name}</p>
                                    <p>Địa chỉ: {appointment.diaChi}</p>
                                    <p>Số điện thoại: {appointment.sdt}</p>
                                </div>

                            ))}
                        </div>
                    ) : null}
                    <h4>
                        Thông tin bệnh viện
                    </h4>
                    {benhVien ? (
                        <div className="">
                            {benhVien.map(appointment => (
                                <div key={appointment.name}>
                                    <p>Tên bác sĩ: {appointment.name}</p>
                                    <p>Địa chỉ: {appointment.diaChi}</p>
                                    <p>Số điện thoại: {appointment.sdt}</p>
                                </div>

                            ))}
                        </div>
                    ) : null}
                </div>
            ) :
                null
            }

        </div>
    );
}

export default XemLK;
