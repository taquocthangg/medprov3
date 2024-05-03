import React, { useState, useEffect } from 'react';
import { DatePicker, Modal, message } from "antd";
import '../../src/componnets/ChonBenhVien/Choose.css'
import { useNavigate, useParams } from 'react-router-dom';
import api from './../pages/api'
import io from 'socket.io-client';
import moment from 'moment';
import { getCurentUser, getInfChuyenKhoa } from '../api';
import Xac_Nhan_Thong_Tin from './Xac_Nhan_Thong_Tin';
import { formatDateNoHours } from '../Common/dataFortmat';
import { ExclamationCircleFilled } from '@ant-design/icons';
import noDate from '../img/noDate.png'
const Select_day = () => {
  const { confirm } = Modal;

  const socket = io('http://localhost:5000');
  const history = useNavigate()

  const params = new URLSearchParams(window.location.search);
  const { getId } = useParams();
  localStorage.setItem('idDoctor', getId)
  const hospital = params.get('hospital');
  const specialist = params.get('specialist');
  const idUser = localStorage.getItem('idUser')
  const [infoDatKham, setInfoDatKham] = useState(null);
  const [openModal, setOpenModal] = useState();

  useEffect(() => {
    const userId = localStorage.getItem('idUser');
    const doctorId = getId;
    socket.emit('joinGroupAndGetSchedule', { userId, doctorId });

  },)
  useEffect(() => {
    const userId = localStorage.getItem('idUser');
    socket.emit('setUserId', { userId });

  },)
  useEffect(() => {
    const fetchData = async () => {
      const inforDotor = await getCurentUser(getId);
      const inforHospital = await getCurentUser(hospital);
      const inforUser = await getCurentUser(idUser);
      const inforSpecialist = await getInfChuyenKhoa(specialist);
      console.log(inforSpecialist)
      const data_Kham = {
        name: inforDotor.user.name ? inforDotor.user.name : '',
        hospitalName: inforHospital.user.name ? inforHospital.user.name : '',
        address: inforHospital.user.diaChi ? inforHospital.user.diaChi : '',
        specialty: inforSpecialist.chuyenKhoa.name ? inforSpecialist.chuyenKhoa.name : '',
        price: inforSpecialist.chuyenKhoa.price ? inforSpecialist.chuyenKhoa.price : '',
        patientName: inforUser.user.name ? inforUser.user.name : '',
        date: inforUser.user.gioiTinh ? inforUser.user.namSinh : '',
      };

      setInfoDatKham(data_Kham)
    };

    fetchData();
  }, []);
  console.log(infoDatKham)

  // Đăng ký listener cho sự kiện 'scheduleSelected' từ server
  socket.on('scheduleSelected', (data) => {
    console.log(data)
    if (data.success == true) {
      message.success('Đã chọn lịch khám thành công. Vui lòng xác nhận lại thông tin khám')

      setOpenModal(true)
    }
    else {
      message.error('Lịch khám này đã được đặt')
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    err: 0,
    mess: '',
    count: '0',
    schedule: [],
  });

  // Lấy thông tin lịch khám và hiện thị
  const handleDateChange = async (date) => {

    setSelectedDate(formatDateNoHours(date));
    if (date) {
      try {
        const doctorId = getId;

        const activateDay = date.toISOString();
        const response = await api.post('/auth/lichkham/' + doctorId, { activateDay });
        setScheduleData(response.data)
        console.log('Response from API:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  // Tắt không cho người dùng chọn ngày trước ngày hiện tại
  const disabledDate = current => {
    // So sánh ngày hiện tại với ngày được chọn
    return current && current < moment().startOf('day');
  };



  const showDeleteConfirm = (item) => {
    confirm({
      title: 'Thông báo',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn muốn chon giờ khám này ?',
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        try {

          setInfoDatKham({ ...infoDatKham, timeSlot: item.timeSlot, selectedDate: selectedDate });
          const userId = localStorage.getItem('idUser');
          const doctorId = getId;
          socket.emit('selectSchedule', { userId, doctorId, scheduleId: item.id });
          localStorage.setItem('scheduleId', item.id);
        }
        catch (e) {
          message.error(e)
        }
      },
      onCancel() {
        const userId = localStorage.getItem('idUser');
        const doctorId = getId;
        socket.emit('scheduleSelectionCancelled', { userId, doctorId });
      },
    });
  }
  return (

    <main>
      <div className="format__header">
        <p onClick={() => { history(-1) }}>Trang Chủ </p> {'>'}  <p onClick={() => { history(-1) }}>Chọn Bệnh Viện</p> {'>'} <p onClick={() => { history(-1) }} >Chọn chuyên khoa</p> {'>'}<p onClick={() => { history(-1) }}>Chọn bác sĩ</p> {'>'} <p>Đặt lịch</p>
      </div>
      <div className="select__hopital">
        <div className="basi_body_add">
          <div className="date_time_kham">
            <label style={{
              fontWeight: '700'
            }} htmlFor="username">Chọn ngày khám: </label>
            <DatePicker
              selected={selectedDate}
              minDate={moment().startOf('day')}
              onChange={handleDateChange}
              disabledDate={disabledDate}
              placeholder='Chọn ngày khám' />
          </div>
          <p style={{
            marginTop: '30px', textAlign: 'center'
          }}>Thông tin lịch khám:</p>
          <div className="bacsi_body_div">

            {(Array.isArray(scheduleData.schedule) && scheduleData.schedule.length > 0) ? (

              scheduleData.schedule.map(item => (
                <div className='box_chon_lcih_kham' key={item.id} onClick={() => showDeleteConfirm(item)}  >
                  <button className="basi_body_time-btn">
                    {item.timeSlot}
                  </button>
                </div>
              ))
            ) : (
              <div className="no_date">
                <p>Hiện chưa có lịch khám nào</p>
                <img src={noDate} alt="" />
              </div>
            )}
          </div>

        </div>
      </div>
      <Xac_Nhan_Thong_Tin setOpenModal={setOpenModal} openModal={openModal} infoDatKham={infoDatKham} getId={getId} />
    </main>

  )
}

export default Select_day