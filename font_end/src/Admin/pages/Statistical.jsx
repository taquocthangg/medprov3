import React, { useEffect } from 'react'
import ChartAdmin from '../../componnets/chart/chartAdmin'
import '../../css/admin/Insert_admin.css'
import { Flex, message } from 'antd';
import StatisticalDoctor from './doctor/StatisticalDoctor';
import StastisticalHospital from './hospital/StastisticalHospital';
import Statistical_admin from './admin/Statistical_admin';
const screenWidth = window.innerWidth
const dataBar = [
  {
    id: '1',
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    id: '2',
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    id: '3',
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    id: '4',
    name: 'Page FUCK',
    uv: 3,
    pv: 8000,
    amt: 1,
  },
  {
    id: '5',
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    id: '6',
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
]
const data = [
  {
    id: '1',
    name: 'Page A',
    value: 400
  },
  {
    id: '2',
    name: 'Page B',
    value: 300
  },
  {
    id: '3',
    name: 'Page C',
    value: 1200
  },

]

export default function Statistical({ role_id }) {
  console.log(role_id)
  const handleLoadComponetChart = (role_id) => {
    console.log(role_id)
    switch (role_id) {
      case 'R1':
        return <Statistical_admin/>
      case "R2":
        return <StastisticalHospital />
      case "R3":
        return <StatisticalDoctor />
      // Nhiều case khác nếu cần
      default:
        return (
          message.success("Không lấy được quyền sử dụng của tài khoản này")
        )
    }
  }

  useEffect(() => {
    handleLoadComponetChart(role_id)
  }, [])
  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien'>
      {/* <div className="content_addBenhVien"> */}
      <Flex vertical >
        {/* <div className="" style={{ width: '800px', height: '300px' }}>
            <ChartAdmin name='line' data={dataBar} />
          </div>
          <div className="" style={{ width: '400px', height: '300px' }}>
            <ChartAdmin name='circle' data={data} />
          </div> */}
        {handleLoadComponetChart(role_id)}
      </Flex>
      {/* </div> */}
    </div>
  )
}
