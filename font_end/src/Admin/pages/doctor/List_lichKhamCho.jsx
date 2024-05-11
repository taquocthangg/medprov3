import React, { useEffect, useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Flex, ConfigProvider, Table, Button, Modal, DatePicker, Row, Col, Avatar, message } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { deleteLichKham, lichDatKham, lichkham } from '../../../api';
import { formatDateNoHours } from '../../../Common/dataFortmat';
import image_warring from '../../../img/image_doctor_waring.jpg'
import { CloseOutlined } from '@mui/icons-material';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import Modal_lichKhamCho from './Modal_lichKhamCho';
const screenWidth = window.innerWidth
const { confirm } = Modal;
export default function List_lichKhamCho() {
  const today = new Date()
  const idDoctor = localStorage.getItem("idUser")
  const [openModal, setOpenModal] = useState();
  const [dateTime, setDateTime] = useState(formatDateNoHours(today));
  const [dataSchedule, setDataSchedule] = useState()
  const [dataModal,setDataModal]=useState()

  const getDataDoctor = async () => {
    const response = await lichDatKham(idDoctor, dateTime)
    if (response?.schedule === "Không có lịch khám") {
      setDataSchedule()
    }
    else {
      setDataSchedule(response?.schedule)
    }
  }
  const handleDataModal=(item)=>{
    setOpenModal(true)
    setDataModal(item)
  

  }
  
  useEffect(() => {
    getDataDoctor()
  }, [dateTime])
  const onChangeDate = (date, dateString) => {
    setDateTime(dateString);
  };
  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien' >
      <p className='title_insertHopital'>QUẢN LÝ LỊCH KHÁM</p>
      <div className="content_addBenhVien">
        <Row style={{ marginBottom: '20px' }}>

          <Col span={12}   >

            <Flex vertical className='form_InsertHopital'>
              <p className='lable_InsertHopital' >Nhập ngày khám<sup>*</sup></p>
              <ConfigProvider locale={viVN} >
                <DatePicker
                  onChange={onChangeDate}
                  format="YYYY-MM-DD"
                  className='inout_InsertHopital'
                  placeholder={formatDateNoHours(today)}

                />
              </ConfigProvider>
            </Flex>

          </Col>


        </Row>
        {
          (!dataSchedule) ? (
            <Flex vertical justify='center' align='center'>
              <p className='title_insertHopital' style={{ textAlign: 'center' }}>Không có lịch khám nào trong ngày này</p>
              <Avatar src={image_warring} style={{ width: '50%', height: '50%' }} />
            </Flex>
          ) : (
            <Flex style={{ flexWrap: 'wrap' }} justify='space-between' gap={30} >
              {/* {dataSchedule?.map((item) => (
                <Flex justify='center' style={{ margin: '20px', width: '20%', position: 'relative' }}>
                  <Button
                   onContextMenu={(event)=>{
                    event.preventDefault();
                    handleRigthClickDelete(item)
                   }}
                    style={{ background: '#008CFF', minWidth: '120px'}}
                  >
                    <p style={{ color: '#fff', textAlign: 'center' }}>

                      {item?.timeSlot}

                    </p>
                    
               
                  </Button>
                </Flex>

              ))} */}
              {dataSchedule?.map((item) => (
                <Button 
                style={{minHeight: '80px',width: '40%',borderRadius:'15px'}}
                onClick={()=>handleDataModal(item)}
                type='primary'
                >
                  <Flex style={{  }} justify='center' align='center' vertical gap={10}>
                    <p ><strong>Bệnh nhân: </strong>{item?.Users?.name}</p>
                    <p ><strong>Thời gian khám: </strong>{item?.timeSlot}</p>
                  </Flex>
                </Button>


              ))}
            </Flex>
          )
        }
        <Modal_lichKhamCho openModal={openModal} setOpenModal={setOpenModal} dataModal={dataModal} dataSchedule={dataSchedule} setDataSchedule={setDataSchedule}  />
      </div>
    </div>
    // </div>
  )
}
