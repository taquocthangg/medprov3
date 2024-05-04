import React, { useEffect, useState } from 'react'
import { getAllLichSuKhamStatus } from './../../../api/index';
import { Button, ConfigProvider, Table, Tooltip, Flex, Dropdown, Space } from 'antd';
import { PrinterFilled, UserOutlined, DownOutlined } from '@ant-design/icons';
import { formatPrice } from '../../../Common/dataFortmat';
import exportToExcel from './ExportExcel';
const columns = [
    {
        title: 'Tên bệnh nhân',
        dataIndex: 'User',
        key: 'User',
        align: 'center',
        render: (item) => <p>{item?.name}</p>,

    },
    {
        title: 'Năm Sinh',
        dataIndex: 'User',
        key: 'User',
        align: 'center',
        render: (item) => <p>{item?.namSinh}</p>,

    },
    {
        title: 'Giới Tính',
        dataIndex: 'User',
        key: 'User',
        align: 'center',
        render: (item) => (
            <Tooltip placement="topLeft" title={item?.gioiTinh}>
                {item?.gioiTinh}
            </Tooltip>
        ),

    },
    {
        title: 'Số điện thoại',
        dataIndex: 'User',
        key: 'User',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (item) => (
            <Tooltip placement="topLeft" title={item?.sdt}>
                {item?.sdt}
            </Tooltip>
        ),
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'User',
        key: 'User',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (item) => (
            <Tooltip placement="topLeft" title={item?.diaChi}>
                {item?.diaChi}
            </Tooltip>
        ),
    },
    {
        title: 'Thời gian khám',
        dataIndex: 'timeSlot',
        key: 'timeSlot',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (item) => (
            <Tooltip placement="topLeft" title={item}>
                {item}
            </Tooltip>
        ),
    },

    {
        title: 'Ngày khám',
        dataIndex: 'activateDay',
        key: 'activateDay',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (item) => (
            <Tooltip placement="topLeft" title={item}>
                {item}
            </Tooltip>
        ),
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        ellipsis: {
            showTitle: false,
        },
        render: (item) => (
            <Tooltip placement="topLeft" title={item}>
               {formatPrice(item)} vnđ
            </Tooltip>
        ),
    },


];
export default function StatisticalDoctor() {
    const idDoctor = localStorage.getItem("idUser")
    const [lableData, setLableData] = useState("Tất cả lịch sử khám");
    //completed hoàn thành 
    // booked đang chờ khám
    // canceled đã hủy
    const [dataBooked, setDataBooked] = useState()

    const handleMenuClick = (e) => {
        switch (e?.key) {
            case '1':
                return (handleGetDataBooked("", "Tất cả lịch sử khám"));
            case '2':
                return (handleGetDataBooked("booked", "Đang chờ khám"));

            case '3':
                return (handleGetDataBooked("completed", "Đã hoàn thành"));

            case '4':
                return (handleGetDataBooked("canceled", "Đã hủy"));
            default:
                return (handleGetDataBooked("", "Tất cả lịch sử khám"));
        }

    };

    const items = [
        {
            label: 'Tất cả lịch sử khám',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: 'Đang chờ khám',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: 'Đã hoàn thành',
            key: '3',
            icon: <UserOutlined />,
        },
        {
            label: 'Đã hủy',
            key: '4',
            icon: <UserOutlined />,
        },
    ];

    const handleGetDataBooked = async (lable, name) => {
        const response = await getAllLichSuKhamStatus(idDoctor, `${lable}`);
        setDataBooked(response?.Schedule?.rows)
        setLableData(name)

    }
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handleExport =()=>{
        exportToExcel(dataBooked,"Xuất dữ liệu")
    }
    useEffect(() => {
        handleGetDataBooked("", "Tất cả lịch sử khám")
    }, [])
    return (
        <div>
            <p style={{fontSize:'20px',fontWeight:'bold',textAlign:'center',margin:'30px 0'}}>THỐNG KÊ LỊCH SỬ KHÁM</p>
            <Flex style={{ marginBottom: '20px' }} justify='space-between'>
                <Space wrap>
                    <Dropdown menu={menuProps}>
                        <Button type='primary'>
                            <Space>
                                {lableData}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Space>
                <Button type='primary'  style={{ fontSize: '18px',minHeight:'35px',minWidth:'100px' }} onClick={()=>handleExport()} >
                    {/* <p>Xuất excel</p> */}
                   <Tooltip title='Xuất excel'>
                   <PrinterFilled />
                   </Tooltip>
                </Button>
            </Flex>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: '#9FDFFB',
                            headerColor: '#000',
                            borderColor: '#9FDFFB',
                            borderRadius: 20,
                            footerBg: '#9FDFFB',
                            footerColor: '#000'
                        },
                    },
                    token: {
                        colorBgContainer: 'rgba(255, 255, 255, 0.5)',
                        boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
                    },
                }}
            >
                <Table
                    columns={columns}
                    dataSource={dataBooked}
                    pagination={{ pageSize: 5 }}
                    bordered={true}
                    style={{ boxShadow: '2px 2px 10px 0 rgba(0, 0, 0, 0.3)' }}
                />
            </ConfigProvider>


        </div>
    )
}
