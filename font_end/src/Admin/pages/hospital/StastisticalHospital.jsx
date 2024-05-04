import { ConfigProvider, Flex, Table, Tooltip, Input, Button, message, Dropdown, Space, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { PrinterFilled, UserOutlined, DownOutlined } from '@ant-design/icons';
import '../../../css/admin/Insert_admin.css'
import { getAllLichSuKhamStatus, getDoanhThu, getSearchDoctor } from '../../../api';
import  image_nullData  from '../../../img/null_dataSearch.jpg'
import { formatPrice } from '../../../Common/dataFortmat';
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
    title: 'Giờ khám',
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
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
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
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
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


];
export default function StastisticalHospital() {
  const idHopital = localStorage.getItem("idUser")
  const [dataHistory, setDataHistory] = useState()
  const [dataDoctor, setDataDoctor] = useState({
    name: "",
    sdt: ""
  })
  const [totalHospital,setTotalHospital]=useState(0)
  const [lableData, setLableData] = useState("Tất cả lịch sử khám")
  const handleChangeDataUser = (key, value) => {
    if (value) {
      setDataDoctor(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }
  const handleGetIdDoctor = async (status, lable) => {
    if (dataDoctor?.name && dataDoctor?.sdt) {
      setLableData(lable)
      const resDoctor = await getSearchDoctor(idHopital, dataDoctor)
      const doctorId = resDoctor?.User?.rows[0]?.id
      const response = await getAllLichSuKhamStatus(doctorId, status)
      setDataHistory(response?.Schedule?.rows)
    }
    else {
      message.warning("Vui lòng điền đầy đủ thông tin")
    }
  }
  const handleMenuClick = (e) => {
    switch (e?.key) {
      case '1':
        return (handleGetIdDoctor("", "Tất cả lịch sử khám"));
      case '2':
        return (handleGetIdDoctor("booked", "Đang chờ khám"));

      case '3':
        return (handleGetIdDoctor("completed", "Đã hoàn thành"));

      case '4':
        return (handleGetIdDoctor("canceled", "Đã hủy"));
      default:
        return (handleGetIdDoctor("", "Tất cả lịch sử khám"));
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

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  console.log(dataHistory)
  const handleGetDataHistory = () => {

  }
  const handleGetTotalHospital=async ()=>{
    const response =  await getDoanhThu(idHopital)
    setTotalHospital(response?.Total_Hospital)
  }
  useEffect(()=>{
    handleGetTotalHospital()
  },[])
  return (
    <div>

      <p>THỐNG KÊ BỆNH VIỆN</p>
      <p>Kết quả khám</p>
      <Flex vertical className='form_InsertHopital' >
        <p className='lable_InsertHopital'  >Nhập số điện thoại<sup>*</sup></p>
        <Input
          placeholder='Nhập số điện thoại'
          className='inout_InsertHopital'
          onChange={(e) => handleChangeDataUser("sdt", e.target.value)}
          value={dataDoctor?.sdt}
          maxLength={10}
          showCount
        />
      </Flex>
      <Flex vertical className='form_InsertHopital'>
        <p className='lable_InsertHopital' >Nhập họ và tên<sup>*</sup></p>
        <Input
          placeholder='Nhập họ và tên'
          className='inout_InsertHopital'
          onChange={(e) => handleChangeDataUser("name", e.target.value)}
          value={dataDoctor?.name}
          allowClear
        />
      </Flex>
      <p> Doanh thu bệnh viện: {formatPrice(totalHospital)} VNĐ</p>
      <Button onClick={() => handleGetIdDoctor("", "Tất cả lịch sử khám")} type='primary' style={{ marginBottom: '20px' }}>
        Tìm bác sĩ
      </Button>

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
      {dataHistory?.length>0 ? (
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
            dataSource={dataHistory}
            pagination={{ pageSize: 5 }}
            bordered={true}
            style={{ boxShadow: '2px 2px 10px 0 rgba(0, 0, 0, 0.3)' }}
          />
        </ConfigProvider>
      ):(
        <Avatar src={image_nullData} style={{width:'40%',height:'20%'}}/>
      )}



    </div>
  )
}
