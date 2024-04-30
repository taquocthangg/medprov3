import { ConfigProvider, Tabs } from 'antd'
import React from 'react'
import Da_Thanh_Toan from './Da_Thanh_Toan'
import Chua_Thanh_Toan from './Chua_Thanh_Toan'
import Da_Kham from './Da_Kham'
import Da_Huy from './Da_Huy'

export default function Phieu_Kham() {
    return (
        <div className='main_profile'>
            <h4 style={{ marginBottom: '20px' }}>
                Danh sách phiếu khám bệnh
            </h4>
            <ConfigProvider
                theme={{
                    token: {

                    },
                }}
            >
                <Tabs defaultActiveKey="a">
                    <Tabs.Items tab="Đã Thanh Toán" key="a">
                        <Da_Thanh_Toan />
                    </Tabs.Items>
                    <Tabs.Items tab="Chưa Thanh Toán" key="b">
                        <Chua_Thanh_Toan />
                    </Tabs.Items>
                    <Tabs.Items tab="Đã Khám" key="c">
                        <Da_Kham />
                    </Tabs.Items>
                    <Tabs.Items tab="Đã Hủy" key="d">
                        <Da_Huy />
                    </Tabs.Items>
                </Tabs>
            </ConfigProvider>


        </div>
    )
}
