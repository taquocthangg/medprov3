import { ConfigProvider, Flex, Table, Tooltip, Input, Button, message, Avatar, Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { PrinterFilled} from '@ant-design/icons';
import '../../../css/admin/Insert_admin.css'
import '../../../css/admin/StastisticalHospital.css'
import { getAllBacSi, getAllLichSuKhamStatus, getChuyenKhoas, getDoanhThu, getSearchDoctor } from '../../../api';
import image_nullData from '../../../img/null_dataSearch.jpg'
import { formatPrice } from '../../../Common/dataFortmat';
import exportToExcel, { exportToExcelDoctor } from './../doctor/ExportExcel';
import { columnsMedicalHistories, columnsDoctor } from './ColumnsTableStastistical';



export default function StastisticalHospital() {
  const idHopital = localStorage.getItem("idUser")
  const [dataHistory, setDataHistory] = useState()
  const [dataDoctorSearch, setDataDoctorSearch] = useState({
    name: "",
    sdt: ""
  })
  const [dataDoctor, setDataDoctor] = useState()
  const [statusTable, setStatusTable] = useState(false)
  const [totalDataHopital, setTotalDataHopital] = useState({
    quantityDoctor: "",
    quantitySpecialty: ""
  })
  const [totalHospital, setTotalHospital] = useState(0)

  const handleChangeDataUser = (key, value) => {
    if (value) {
      setDataDoctorSearch(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }
  const handleGetIdDoctor = async (status) => {
    if (dataDoctorSearch?.name && dataDoctorSearch?.sdt) {
      const resDoctor = await getSearchDoctor(idHopital, dataDoctorSearch)
      const doctorId = resDoctor?.User?.rows[0]?.id
      const response = await getAllLichSuKhamStatus(doctorId, status)
      setDataHistory(response?.Schedule?.rows)
      setStatusTable(true)
    }
    else {
      message.warning("Vui lòng điền đầy đủ thông tin")
    }
  }
  const handleGetTotalHospital = async () => {
    const response = await getDoanhThu(idHopital)
    const getTotalDoctor = await getAllBacSi(idHopital)
    const getQuantitySescriptions = await getChuyenKhoas(idHopital)
    setTotalHospital(response?.Total_Hospital)
    setDataDoctor(getTotalDoctor?.User?.rows)
    setTotalDataHopital(prev => ({
      ...prev,
      quantityDoctor: getTotalDoctor?.User?.count,
      quantitySpecialty: getQuantitySescriptions?.count
    }))

  }

  const handleDisplayTableDoctor = () => {
    setStatusTable(false)
  }
  // Xuất excel
  const handleExport = () => {
    if (statusTable) {
      exportToExcel(dataHistory, "Xuất dữ liệu")
    }
    else {
      exportToExcelDoctor(dataDoctor, "Xuất danh sách bác sĩ")
    }
  }
  useEffect(() => {
    handleGetTotalHospital()
  },[])
  return (
    <div>

      <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginTop: '35px' }}>THỐNG KÊ BỆNH VIỆN</p>
      {/* <p style={{ marginTop: '50px', fontWeight: 'bold', fontSize: '17px' }}>Kết quả khám</p> */}
      <Row style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <Col span={10} className='box_contentStastistical'>
          <Flex vertical className='form_InsertHopital' >
            <p className='lable_InsertHopital'>Nhập số điện thoại<sup>*</sup></p>
            <Input
              placeholder='Nhập số điện thoại'
              className='inout_InsertHopital'
              onChange={(e) => handleChangeDataUser("sdt", e.target.value)}
              defaultValue={dataDoctorSearch?.sdt}
              maxLength={10}
              showCount
            />
          </Flex>
          <Flex vertical className='form_InsertHopital'>
            <p className='lable_InsertHopital' >Nhập họ và tên bác sĩ<sup>*</sup></p>
            <Input
              placeholder='Nhập họ và tên'
              className='inout_InsertHopital'
              onChange={(e) => handleChangeDataUser("name", e.target.value)}
              defaultValue={dataDoctorSearch?.name}
              allowClear
            />
          </Flex>
        </Col>
        <Col span={10} className='box_contentStastistical' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Flex vertical justify='space-between' style={{ height: '70%' }}>
            <Flex >
              <p style={{ fontSize: '17.5px', color: '#4a4a4a' }}> <strong>Doanh thu bệnh viện:</strong> {formatPrice(totalHospital)} VNĐ</p>
            </Flex>
            <Flex >
              <p style={{ fontSize: '17.5px', color: '#4a4a4a' }}> <strong>Tổng số lượng bác sĩ:</strong> {totalDataHopital?.quantityDoctor} Người </p>
            </Flex>
            <Flex >
              <p style={{ fontSize: '17.5px', color: '#4a4a4a' }}> <strong>Tổng số chuyên khoa:</strong> {totalDataHopital?.quantitySpecialty} Chuyên Khoa </p>
            </Flex>
          </Flex>
        </Col>
      </Row>
      <Flex justify='space-between' align='center' style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Flex gap={20}>
          <Button onClick={() => handleGetIdDoctor("", "Tất cả lịch sử khám")} type='primary' style={{ minWidth: '100px' }}>
            Hiển thị bệnh án
          </Button>
          <Button onClick={() => handleDisplayTableDoctor()} type='primary' style={{ minWidth: '100px' }}>
            Danh sách bác sĩ
          </Button>
        </Flex>

        {/* <Space wrap>
          <Dropdown menu={menuProps}>
            <Button type='primary'>
              <Space>
                {lableData}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space> */}

        {dataHistory?.length > 0 || dataDoctor?.length > 0 ? (
          <Button
            type='primary'
            style={{ fontSize: '18px', minHeight: '35px', minWidth: '100px' }}

            onClick={() => handleExport()}  >
            {/* <p>Xuất excel</p> */}
            <Tooltip title='Xuất excel'>
              <PrinterFilled />
            </Tooltip>
          </Button>
        ) : <Button type='primary' style={{ fontSize: '18px', minHeight: '35px', minWidth: '100px' }} disabled >
          {/* <p>Xuất excel</p> */}
          <Tooltip title='Xuất excel'>
            <PrinterFilled />
          </Tooltip>
        </Button>}
      </Flex>
      {dataHistory?.length > 0 || dataDoctor?.length > 0 ? (
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
            columns={!statusTable ? columnsDoctor : columnsMedicalHistories}
            dataSource={!statusTable ? dataDoctor : dataHistory}
            pagination={{ pageSize: 5 }}
            bordered={true}
            style={{ boxShadow: '2px 2px 10px 0 rgba(0, 0, 0, 0.3)' }}
          />
        </ConfigProvider>
      ) : (
        <Flex justify='center' vertical align='center'>
          <Avatar src={image_nullData} style={{ width: '40%', height: '20%' }} />
          <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginTop: '35px' }}>KHÔNG CÓ BỆNH ÁN NÀO</p>
        </Flex>
      )}



    </div>
  )
}
