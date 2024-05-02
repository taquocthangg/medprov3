import React, { useEffect } from 'react'
import { vnPay_Return } from '../api';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await vnPay_Return(vnpParams);
                console.log(response);
                message.success(response.mess)
                if (response.code == "24") {
                    navigate('/')
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
