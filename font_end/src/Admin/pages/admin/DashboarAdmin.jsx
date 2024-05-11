import React, { useEffect, useState } from 'react'
import '../../../css/admin/Dashboard.css'
import { Col, Flex } from 'antd'
import { FileOutlined, CalendarOutlined, FileExcelOutlined, FileAddOutlined } from '@ant-design/icons';
import ChartAdmin from '../../../componnets/chart/chartAdmin';
import { Link } from 'react-router-dom';
import { getAllBenhVien, getAllLichSuKhamStatus, getAllNews, getAllUser, getCurent } from '../../../api';
export default function DashboarAdmin() {
  const idAdmin = localStorage.getItem("idUser")
  const [dataHospital, setDataHospital] = useState([])
  const [dataInfAdmin, setDataInfAdmin] = useState({
    countHospital: "0",
    quantityNews: "0",
    quantityUser: "0",
    nameDoctor: ""
  })
  const handleGetData = async () => {
    const NameDoctor = await getCurent(idAdmin)
    const CountHospital = await getAllBenhVien()
    const DataNews = await getAllNews();
    const DataUser = await getAllUser();
    setDataInfAdmin(prev => ({
      ...prev,
      nameDoctor: NameDoctor?.user?.name,
      countHospital: CountHospital?.benhvien?.count,
      quantityNews: DataNews?.Schedule?.count,
      quantityUser: DataUser?.user?.count
    }))
  }
  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <div>
      <p className='title_dashboard'>XIN CHÀO  {dataInfAdmin?.nameDoctor}</p>
      <Flex justify='space-between'>
        <Col span={6} className='box_headerDashboard' style={{ backgroundColor: '#0476D9' }} >
          <Link to={"/ds-benh-vien"}>
            <Flex className='box_headerDashboard_item' vertical  >
              <p className='title_headerDashBoard'>Số lượng bệnh viện</p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'>{dataInfAdmin?.countHospital}</p>
                <CalendarOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>
            </Flex>
          </Link>
        </Col>
        <Col span={6} className='box_headerDashboard' style={{ backgroundColor: '#049DD9' }}>
          <Link to={"/ds-tin-tuc"}>
            <Flex className='box_headerDashboard_item' vertical >
              <p className='title_headerDashBoard'>Số lượng tin tức </p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'>{dataInfAdmin?.quantityNews}</p>
                <FileOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>

            </Flex>
          </Link>
        </Col>
        <Col span={6} className='box_headerDashboard' style={{ backgroundColor: 'rgb(49 161 98)' }}>

          <Flex className='box_headerDashboard_item' vertical >
            <p className='title_headerDashBoard'>Số người đang sử dụng </p>
            <Flex justify='space-between' align='center'>
              <p className='content_headerDashboard'>{dataInfAdmin?.quantityUser}</p>
              <FileAddOutlined style={{ fontSize: '35px', color: '#fff' }} />
            </Flex>

          </Flex>

        </Col>

      </Flex>
    </div>
  )
}
