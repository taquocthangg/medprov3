import { Col, Flex } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../../css/admin/Dashboard.css'
import { FileOutlined, CalendarOutlined, FileExcelOutlined, FileAddOutlined } from '@ant-design/icons';
import { getAllLichSuKhamByStatus, getAllLichSuKhamFull, getAllLichSuKhamStatus, getCurent } from '../../../api';
import ChartAdmin from '../../../componnets/chart/chartAdmin';
import { Link } from 'react-router-dom';

export default function DashboardDoctor() {

  const idDoctor = localStorage.getItem("idUser")
  const [dataInfDoctor, setDataInfDoctor] = useState({
    schedulesQuantity: "0",
    schedulesNewQuantity: "0",
    medicalhistoriQuantity: "0",
    schedulesCancel: "0",
    nameDoctor: ""
  })
  const [dataChartLine, setDataChartLine] = useState();
  const handleGetDataDoctor = async () => {
    const SchedulesQuantity = await getAllLichSuKhamStatus(idDoctor, "booked");
    const SchedulesCancel = await getAllLichSuKhamStatus(idDoctor, "canceled");
    const SchedulesNewQuantity = await getAllLichSuKhamStatus(idDoctor, "")
    const History = await getAllLichSuKhamFull(idDoctor)
    const NameDoctor = await getCurent(idDoctor)
    setDataInfDoctor(prev => ({
      ...prev,
      schedulesQuantity: SchedulesQuantity?.Schedule?.count,
      schedulesCancel: SchedulesCancel?.Schedule?.count,
      medicalhistoriQuantity: History?.MedicalHistory?.count,
      schedulesNewQuantity: SchedulesNewQuantity?.Schedule?.count,
      nameDoctor: NameDoctor?.user?.name
    }))
    const DataChartLine = await getAllLichSuKhamByStatus(idDoctor)
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
      <p className='title_dashboard'>XIN CHÀO BÁC SĨ {dataInfDoctor?.nameDoctor}</p>
      <Flex justify='space-between'>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: '#0476D9' }} >
          <Link to={"/ds-lich-kham-dang-cho"}>
            <Flex className='box_headerDashboard_item' vertical  >
              <p className='title_headerDashBoard'>Số lịch đang chờ xử lí</p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'>{dataInfDoctor?.schedulesQuantity}</p>
                <CalendarOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>
            </Flex>
          </Link>
        </Col>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: '#049DD9' }}>
          <Link to={"/ds-benh-an"}>
            <Flex className='box_headerDashboard_item' vertical >
              <p className='title_headerDashBoard'>Số lượng bệnh án</p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'>{dataInfDoctor?.medicalhistoriQuantity}</p>
                <FileOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>

            </Flex>
          </Link>
        </Col>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: 'rgb(49 161 98)' }}>
          <Link to={'/them-lich-kham'}>
            <Flex className='box_headerDashboard_item' vertical >
              <p className='title_headerDashBoard'>Số lịch đã tạo </p>
              <Flex justify='space-between' align='center'>
                <p className='content_headerDashboard'>{dataInfDoctor?.schedulesNewQuantity}</p>
                <FileAddOutlined style={{ fontSize: '35px', color: '#fff' }} />
              </Flex>

            </Flex>
          </Link>
        </Col>
        <Col span={5} className='box_headerDashboard' style={{ backgroundColor: '#F29C50' }}>
          <Flex className='box_headerDashboard_item' vertical >
            <p className='title_headerDashBoard'>Số lịch bị hủy</p>
            <Flex justify='space-between' align='center'>
              <p className='content_headerDashboard'> {dataInfDoctor?.schedulesCancel}</p>

              <FileExcelOutlined style={{ fontSize: '35px', color: '#fff' }} />
            </Flex>
          </Flex>
        </Col>

      </Flex>
      <div className="chart_Dashboard">
        <p className='title_dashboard'>BIỂU ĐỒ HIỂN THỊ THÔNG TIN</p>
        <Flex  className='content_chart'>
          <Col span={8} style={{ height: '300px' }}>
            <div className="" style={{ marginLeft: '30px', width: '400px', height: '300px' }}>
              <ChartAdmin name='circle' data={data} />
            </div>
          </Col>
          <Col span={16}>
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
