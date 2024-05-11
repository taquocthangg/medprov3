import React, { useEffect, useState } from 'react'
import { Col, Row, Flex, Button, message, ConfigProvider, DatePicker } from 'antd';
import '../../../css/admin/Insert_admin.css'
import { getCurent, getInfChuyenKhoa, themlichkham } from '../../../api';
import { data_time } from '../../../data_fake/data_time';
import viVN from 'antd/es/locale/vi_VN';
import { formatDateNoHours } from '../../../Common/dataFortmat';
const screenWidth = window.innerWidth
export default function Add_lichKham() {
  const today = new Date()
  const idDoctor = localStorage.getItem("idUser")
  // Trạng thái để lưu trữ các nút đã được chọn
  const [activeButtons, setActiveButtons] = useState([]);
  const [dataHopital, setDataHopital] = useState({
    hospitalId: "",
    doctorId: idDoctor,
    timeSlot: [], // ["10:00 - 11:00 AM","7:00 - 8:00 AM","8:00 - 9:00 AM"]
    activateDay: "",// "2024-05-02"
    specialtyId: "", // id chuyen khoa
    price: ""
  });

  const handleChangeDataUser = (key, value) => {
    if (value) {
      setDataHopital(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }

  const onChangeDate = (date, dateString) => {
    handleChangeDataUser('activateDay', dateString);
  };

  const handleTimeSlotClick = (timeSlotValue) => {
    if (timeSlotValue) {
      // Kiểm tra xem giá trị time slot đã tồn tại trong mảng timeSlot hay chưa
      const isTimeSlotExist = dataHopital?.timeSlot?.includes(timeSlotValue);

      // Nếu giá trị time slot chưa tồn tại, thêm giá trị đó vào mảng timeSlot
      if (!isTimeSlotExist) {
        setDataHopital(prev => ({
          ...prev,
          timeSlot: [...prev.timeSlot, timeSlotValue]
        }));
        setActiveButtons(prev => [...prev, timeSlotValue])

      }
      else {
        // Nếu đã tồn tại, loại bỏ khỏi mảng timeSlot
        setDataHopital(prev => ({
          ...prev,
          timeSlot: prev.timeSlot.filter(slot => slot !== timeSlotValue)
        }));
        setActiveButtons(prev => prev.includes(timeSlotValue) ?
          prev.filter(slot => slot !== timeSlotValue)
          : prev.concat(timeSlotValue));


      }
    }
  };

  // Hàm kiểm tra xem nút có được active hay không
  const isButtonActive = (timeSlotValue) => {
    return activeButtons.includes(timeSlotValue);
  };


  const handlePostData = async () => {
    if (dataHopital?.price || dataHopital?.activateDay) {
      const response = await themlichkham(dataHopital)
      if (response?.mess === "Thêm lịch mới thành công") {
        setDataHopital({
          hospitalId: "",
          doctorId: idDoctor,
          timeSlot: [],
          price: "",
          activateDay: "",
          specialtyId: "",
        })
        setActiveButtons([])
        handleGetDataDotor()
        message.success("Thêm lịch thành công")
      }
      else {
        message.warning(response?.mess)
      }
    }
    else {
      message.warning("Vui lòng điền đầy đủ thông tin")
    }

  }
  const handleGetDataDotor = async () => {
    const response = await getCurent(idDoctor)
    handleChangeDataUser("hospitalId", response?.user?.id_benhVien)
    handleChangeDataUser("specialtyId", response?.user?.id_chuyenKhoa)
    const dataChuyenkhoa = await getInfChuyenKhoa(response?.user?.id_chuyenKhoa)
    handleChangeDataUser("price", dataChuyenkhoa?.chuyenKhoa?.price)
  }
  useEffect(() => {
    handleGetDataDotor()
  }, [])
  return (
    <div style={{ padding: '25px 100px', width: `${screenWidth}` }} className='container_addBenhVien'>
      <div className="content_addBenhVien">
        <p className='title_insertHopital'>THÊM THÔNG TIN LỊCH KHÁM </p>

        <Row style={{ marginBottom: '30px' }}>

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



        <Flex justify='center'>
          <p className='title_insertHopital' style={{ textAlign: 'center' }}>CHỌN GIỜ KHÁM</p>
        </Flex>

        <Row style={{ marginTop: '15px' }}>
          {data_time.map((item) => (
            <Flex className="" justify='center' style={{ margin: '20px', width: '20%' }}>
              <Button
                onClick={() => handleTimeSlotClick(item)}
                style={isButtonActive(item) ? { background: '#008CFF', minWidth: '120px' } : { minWidth: '120px' }}
              >
                <p style={isButtonActive(item) ? { color: '#fff' } : null}>
                  {item}
                </p>
              </Button>
            </Flex>
          ))}
        </Row>

        <Flex justify='center' >
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "#fff"
                },
              },
            }}
          >
            <Button
              type='primary'
              style={{ minWidth: '120px', background: '#3EA8FF', marginTop: '30px' }}
              onClick={() => handlePostData()}
            >
              Xác nhận
            </Button>
          </ConfigProvider>

        </Flex>


      </div>
    </div>
  )
}
