import { Col, Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../../css/admin/Dashboard.css'
import { FileOutlined, CalendarOutlined, FileExcelOutlined, FileAddOutlined } from '@ant-design/icons';
import { getAllBacSiByBenhVien, getAllBenhAnByHospital, getAllLichSuKhamByHospital, getAllLichSuKhamByStatus, getAllLichSuKhamFull, getAllLichSuKhamStatus, getAllNewsbyHospital, getChuyenKhoas, getCurent } from '../../../api';
import ChartAdmin from '../../../componnets/chart/chartAdmin';
import { Link } from 'react-router-dom';
export default function DashboarHospital() {
  const idHospital = localStorage.getItem("idUser")
  const [dataInfDoctor, setDataInfDoctor] = useState({
    doctorQuantity: "0",
    sescriptionsQuantity: "0",
    patientQuantity: "0",
    newsQuantity: "0",
    nameDoctor: ""
  })
  const [dataChartLine, setDataChartLine] = useState();
  const handleGetDataDoctor = async () => {
    const DoctorQuantity = await getAllBacSiByBenhVien(idHospital)
    const SescriptionsQuantity = await getChuyenKhoas(idHospital);
    const PatientQuantity = await getAllBenhAnByHospital(idHospital);
    const NewsQuantity = await getAllNewsbyHospital(idHospital)
    const NameDoctor = await getCurent(idHospital)
    setDataInfDoctor(prev => ({
      ...prev,
      doctorQuantity: DoctorQuantity?.count,
      sescriptionsQuantity: SescriptionsQuantity?.count,
      patientQuantity: PatientQuantity?.Schedule?.count,
      newsQuantity: NewsQuantity?.Schedule?.count,
      nameDoctor: NameDoctor?.user?.name
    }))
    const DataChartLine = await getAllLichSuKhamByHospital(idHospital)
    const chartData = DataChartLine.monthlyCounts.map(monthData => ({
      month: monthData.month,
      available: monthData.counts.available,
      completed: monthData.counts.completed,
      canceled: monthData.counts.canceled
    }));
    setDataChartLine(chartData)

  }

  const data = [
    {
      id: '1',
      name: 'Lịch đã đặt',
      value: dataInfDoctor?.schedulesQuantity
    },
    {
      id: '2',
      name: 'Lịch đã hủy',
      value: dataInfDoctor?.schedulesCancel
    },
    {
      id: '3',
      name: 'Lịch đã thêm',
      value: dataInfDoctor?.schedulesNewQuantity
    },

  ]
  useEffect(() => {
    handleGetDataDoctor()
  }, [])
  return (
    <div>
      <p className='title_dashboard'>XIN CHÀO BỆNH VIỆN {dataInfDoctor?.nameDoctor}</p>
      <Flex justify='space-between'>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: '#0476D9' }} >
          <Link to={"/ds-bac-si"}>
            <Flex className='box_headerDashboard_item' vertical  >
              <p className='title_headerDashBoard'>Số bác sĩ</p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'>{dataInfDoctor?.doctorQuantity}</p>
                <CalendarOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>
            </Flex>
          </Link>
        </Col>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: '#049DD9' }}>
          <Link to={"/ds-chuyen-khoa"}>
            <Flex className='box_headerDashboard_item' vertical >
              <p className='title_headerDashBoard'>Số chuyên khoa</p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'>{dataInfDoctor?.sescriptionsQuantity}</p>
                <FileOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>

            </Flex>
          </Link>
        </Col>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: 'rgb(49 161 98)' }}>
          <Flex className='box_headerDashboard_item' vertical >
            <p className='title_headerDashBoard'>Số bệnh án</p>
            <Flex justify='space-between' align='center'>
              <p className='content_headerDashboard'>{dataInfDoctor?.patientQuantity}</p>
              <FileAddOutlined style={{ fontSize: '35px', color: '#fff' }} />
            </Flex>
          </Flex>

        </Col>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: '#F29C50' }}>
          <Link to={'/ds-tin-tuc'}>
            <Flex className='box_headerDashboard_item' vertical >
              <p className='title_headerDashBoard'>Số tin tức</p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'> {dataInfDoctor?.newsQuantity}</p>

                <FileExcelOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>
            </Flex>
          </Link>
        </Col>

      </Flex>
      <div className="chart_Dashboard">
        <p className='title_dashboard'>BIỂU ĐỒ HIỂN THỊ THÔNG TIN</p>
        <Flex className='content_chart'>
          {/* <Col span={8} style={{ height: '300px' }}>
            <div className="" style={{ marginLeft: '30px', width: '400px', height: '300px' }}>
              <ChartAdmin name='circle' data={data} />
            </div>
          </Col> */}
          <Col span={24}>
            <div className="" style={{ height: '300px' }}>
              <ChartAdmin name='line' data={dataChartLine} />
            </div>
          </Col>
        </Flex>


      </div>
      {/* chart */}

    </div>
  )
}
