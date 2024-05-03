import React, { useEffect } from 'react'
import { datlich, vnPay_Return } from '../api';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function VnPay_return() {
    const searchParams = new URLSearchParams(window.location.search.substring(1));
    const vnpParams = {
        vnp_Amount: searchParams.get('vnp_Amount'),
        vnp_BankCode: searchParams.get('vnp_BankCode'),
        vnp_CardType: searchParams.get('vnp_CardType'),
        vnp_OrderInfo: searchParams.get('vnp_OrderInfo'),
        vnp_PayDate: searchParams.get('vnp_PayDate'),
        vnp_ResponseCode: searchParams.get('vnp_ResponseCode'),
        vnp_TmnCode: searchParams.get('vnp_TmnCode'),
        vnp_TransactionNo: searchParams.get('vnp_TransactionNo'),
        vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus'),
        vnp_TxnRef: searchParams.get('vnp_TxnRef'),
        vnp_SecureHash: searchParams.get('vnp_SecureHash')
    };
    const scheduleId = localStorage.getItem('scheduleId')
    const idDoctor = localStorage.getItem('idDoctor')
    const id_user = localStorage.getItem('idUser')
    const socket = io('http://localhost:5000');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await vnPay_Return(vnpParams);
                console.log(response);
                message.success(response.mess)
                if (response.code == "00") {
                    const response = await datlich(scheduleId, id_user)
                    localStorage.removeItem('scheduleId');
                    console.log(response)
                    // navigate('/')
                } else {
                    console.log("first")
                    socket.emit('cancelScheduleSelection', { userId: id_user, doctorId: idDoctor });
                    // localStorage.removeItem('idDoctor');

                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [])
    return (
        <div>
            <div>VnPay_return</div>

            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>
            <div>VnPay_return</div>

        </div>
    )
}
