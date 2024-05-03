import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Col, Row, Flex, Input, ConfigProvider, message } from 'antd';
import { getCurent, getCurentUser } from '../../../api';
export default function Modal_BenhAn({setOpenModal,setDataModal,openModal,dataModal}) {
    const id_benhVien = localStorage.getItem("idUser")
    const [infDoctor,setInfDoctor]=useState()
    const [infHospital,setInfHospital]=useState()
    const handleGetInfDoctor= async()=>{
        const response= await getCurent(id_benhVien);
        const resInfHospital = await getCurentUser(dataModal?.hospitalId)
        console.log(resInfHospital)
        setInfDoctor(response?.user)
        setInfHospital(resInfHospital?.user)
        
       
    }
    const handleOk = () => {
       
        setOpenModal(true);
      };
      const handleCancel = () => {
        setOpenModal(false);
      };
      useEffect(()=>{
        handleGetInfDoctor()
      },[dataModal])
      console.log(dataModal)
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            // contentBg: "#53B3FE",
            // headerBg: "#53B3FE"
          },
        },
      }}
    >
      <Modal
        open={openModal}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={(_, { OkBtn, CancelBtn }) => (
        //   <>

        //     <CancelBtn />
        //     <OkBtn />
        //   </>
        // )}
        footer={null}
        style={{ minWidth: '800px', borderRadius: '20px' }}

      >
        <p><strong>Bác sĩ chuẩn đoán:</strong> {infDoctor?.name}</p>
        <p><strong>Bệnh viện:</strong> {infHospital?.name}</p>
        <p><strong>Số điện thoại bác sĩ:</strong> {infDoctor?.sdt}</p>
        <p><strong>Tên bệnh nhân: </strong>{dataModal?.User?.name}</p>
        {/* <p>{dataModal?.User?.sdt}</p> */}
        <p><strong>Địa chỉ: </strong>{dataModal?.User?.diaChi}</p>
        <p><strong>Ngày khám:</strong>{dataModal?.appointmentDate}</p>
        <p><strong>Chuẩn đoán: </strong>{dataModal?.diagnosis}</p>
        <p><strong>Đơn thuốc: </strong>{dataModal?.medication}</p>
        {/* <p>{dataModal?.User?.namSinh}</p> */}
        {/* <Row>
          <Flex vertical gap={15}>
            <p><strong>Tên bệnh nhân: </strong>{dataModal?.Users?.name}</p>
            <p><strong>Ngày khám: </strong>{dataModal?.activateDay}</p>
            <p><strong>Thời gian khám: </strong>{dataModal?.timeSlot}</p>
          </Flex>
        </Row>
        <Flex vertical className='form_InsertHopital'  >
          <p className='lable_InsertHopital'  >Nhập đơn thuốc:<sup>*</sup></p>
          <TextArea
            value={dataSchedules?.medication}
            className='inout_InsertHopital'
            onChange={(e) => handleChangeDataUser("medication", e.target.value)}
          />
        </Flex>
        <Flex vertical className='form_InsertHopital'  >
          <p className='lable_InsertHopital'  >Nhập chuẩn đoán bệnh<sup>*</sup></p>
          <TextArea
            value={dataSchedules?.diagnosis}
            className='inout_InsertHopital'
            onChange={(e) => handleChangeDataUser("diagnosis", e.target.value)}
          />
        </Flex> */}



      </Modal>

    </ConfigProvider>
  )
}
