import React , { useEffect }from 'react'
import ChartAdmin from '../../componnets/chart/chartAdmin'
import { Flex, message } from 'antd';
import '../../../src/css/admin/Insert_admin.css'
import DashboarAdmin from './admin/DashboarAdmin'
import DashboardDoctor from './doctor/DashboardDoctor';
import DashboarHospital from './hospital/DashboarHospital';
const screenWidth = window.innerWidth
export default function Dashboard({role_id}) {
  const handleLoadComponetChart = (role_id) => {
    switch (role_id) {
      case "R1":
        return <DashboarAdmin />
      case "R2":
        return <DashboarHospital />
      case "R3":
        return <DashboardDoctor />
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
    <div style={{ padding: '25px 25px', width: `${screenWidth}` }} className='container_addBenhVien'>
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
