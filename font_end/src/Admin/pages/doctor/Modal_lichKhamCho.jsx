import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Col, Row, Flex, Input, ConfigProvider, message } from 'antd';

import '../../../css/admin/Insert_admin.css'
import { getCurent } from '../../../api';
import TextArea from 'antd/es/input/TextArea';
export default function Modal_lichKhamCho({ openModal, setOpenModal, dataModal,dataSchedule,setDataSchedule }) {
  console.log(dataModal)

  const idDoctor = localStorage.getItem("idUser")
  const [dataSchedules, setDataSchedules] = useState({
    hospitalId: "",
    doctorId: idDoctor,
    patientId: dataModal?.Users?.id,
    timeSlot: dataModal?.timeSlot,
    appointmentDate: dataModal?.activateDay,
    specialtyId: "",
    diagnosis: "", // chuẩn đoán
    medication: "" // đơn thuốc
  })
  
  const handleUpdate = async () => {
    console.log(dataSchedules)

    // const updateDate = dataHopitals.map((item) => {
    //     if (item?.id === dataHopital?.id) {
    //         const newData = {
    //             name: dataUpdate.name || item.name,
    //             description: dataUpdate.description || item.description,
    //             price: dataUpdate.price || item.price,

    //         }
    //         return { ...item, ...newData }
    //     }
    //     return item;
    // })
    // const response = await suaChuyenKhoa(dataHopital?.id, dataUpdate)
    // console.log(response)
    // if (response?.message === "Cập nhật chuyên khoa thành công") {
    //     message.success(response?.message)
    //     setDataHospital(updateDate)
    //     setDateUpdate({
    //         name: "",
    //         description: "",
    //         price: "",
    //         id_benhVien:idHopital
    //     })
    //     setOpenModal(false);
    // }
    // else {
    //     message.warning(response?.message)
    //     setOpenModal(true)
    // }


  }
  const handleOk = () => {
    handleUpdate()
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleChangeDataUser = (key, value) => {
    if (value) {
      setDataSchedules(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }

  const handleGetInfDoctor = async () => {
    const response = await getCurent(idDoctor)
    handleChangeDataUser("hospitalId", response?.user?.id_benhVien)
    handleChangeDataUser("specialtyId", response?.user?.id_chuyenKhoa)
  }
  useEffect(() => {
    handleGetInfDoctor()
  }, [dataModal])
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#53B3FE",
            headerBg: "#53B3FE"
          },
        },
      }}
    >
      <Modal
        open={openModal}
        title="XÁC NHẬN LỊCH KHÁM"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>

            <CancelBtn />
            <OkBtn />
          </>
        )}
        // footer={null}
        style={{ minWidth: '800px', borderRadius: '20px' }}

      >
        <Row>
          <Flex vertical gap={15}>
            <p><strong>Tên bệnh nhân: </strong>{dataModal?.Users?.name}</p>
            <p><strong>Ngày khám: </strong>{dataModal?.activateDay}</p>
            <p><strong>Thời gian khám: </strong>{dataModal?.timeSlot}</p>
          </Flex>
        </Row>
        <Flex vertical className='form_InsertHopital'  >
          <p className='lable_InsertHopital'  >Nhập đơn thuốc:<sup>*</sup></p>
          <TextArea
            value={dataSchedules.medication}
            className='inout_InsertHopital'
            onChange={(e) => handleChangeDataUser("medication", e.target.value)}
          />
        </Flex>
        <Flex vertical className='form_InsertHopital'  >
          <p className='lable_InsertHopital'  >Nhập chuẩn đoán bệnh<sup>*</sup></p>
          <TextArea
            value={dataSchedules.diagnosis}
            className='inout_InsertHopital'
            onChange={(e) => handleChangeDataUser("diagnosis", e.target.value)}
          />
        </Flex>



      </Modal>

    </ConfigProvider>
  )
}
