import React, { useEffect, useState } from 'react'
import '../../../css/admin/Insert_admin.css'
import { Flex, ConfigProvider, Table, Button, Modal, DatePicker, Row, Col, Avatar,message } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { deleteLichKham, lichkham } from '../../../api';
import { formatDateNoHours } from '../../../Common/dataFortmat';
import image_warring from '../../../img/image_doctor_waring.jpg'
import { CloseOutlined } from '@mui/icons-material';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
const screenWidth = window.innerWidth
const { confirm } = Modal;

export default function Ds_lichKham() {
  const today = new Date()
  const idDoctor = localStorage.getItem("idUser")
  const [dateTime, setDateTime] = useState(formatDateNoHours(today));
  const [dataSchedule, setDataSchedule] = useState()

  const getDataDoctor = async () => {
    const response = await lichkham(idDoctor, dateTime)
    console.log(dataSchedule)
    if (response?.schedule === "Không có lịch khám") {
      setDataSchedule()
    }
    else {
      setDataSchedule(response?.schedule)
    }
  }

  const handleDeleteHospital = async (idTimeSlot) => {
    const indexToDelete = dataSchedule.findIndex(hospital => hospital.id === idTimeSlot);
    if (indexToDelete !== -1) {
      const response = await deleteLichKham(idTimeSlot)
      if (response?.mess === "Xóa lịch khám thành công") {
        const newData = [...dataSchedule]; // Tạo một bản sao của mảng dataHospital
        newData.splice(indexToDelete, 1);
        setDataSchedule(newData);
        message.success("Xóa lịch khám thành công")
      }
      else{
        message.warning(response?.mess)
      }
    }
  }

  const showDeleteConfirm = (idTimeSlot) => {
    confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleFilled />,
      content: 'Dữ liệu sẽ mất và không thể khôi phục',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        try {

          handleDeleteHospital(idTimeSlot)

        }
        catch (e) {
          message.error(e)
        }
      },
      onCancel() {

      },
    });
  }

  const handleRigthClickDelete=(item)=>{
    showDeleteConfirm(item?.id)
  }
  useEffect(() => {
    getDataDoctor()
  }, [dateTime])
  const onChangeDate = (date, dateString) => {
    setDateTime(dateString);
  };
  console.log(dateTime)







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
            <Row>
              {dataSchedule?.map((item) => (
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

              ))}
            </Row>
          )
        }
      </div>
    </div>
    // </div>
  )
}
